function fetchData(){
    var json_data = JSON.stringify({
        fx: document.getElementById("FPIFunc").value,
        x0: document.getElementById('FPIInitial').value,
        tol: document.getElementById('FPITolerance').value,
        max_iter: document.getElementById('FPIIter').value
    });
     fetch('/FixedPointIteration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json_data
    })
        .then(response => response.json())
        .then(data => {
            if (data.hasOwnProperty('Error')) {
              console.error('Server Error:', data.Error);
            }
            else {
                document.getElementById("inputDiv").style.display = "none";
                document.getElementById("resultDiv").style.display = "block";
                console.log(data);
                document.getElementById("fx").innerText = data.fx;
                document.getElementById("pyfunc").innerText = data.pyfunc;
                document.getElementById("x0").innerText = data.x0;
                document.getElementById("tol").innerText = data.tol;
                document.getElementById("max_iter").innerText = data.max_iter;
                document.getElementById("root").innerText = data.root;
                document.getElementById("count").innerText = data.count;
                document.getElementById("error").innerText = data.error;
                document.getElementById("x_prev").innerText = data.x_prev;
                document.getElementById("x_next").innerText = data.x_next;
                document.getElementById("f_x_prev").innerText = data.f_x_prev;
                document.getElementById("f_x_next").innerText = data.f_x_next;
                const backendData = {
                      fx: data.pyfunc,
                      roots: data.roots,
                      f_result: data.f_result
                };
                function chechExp(expression) {
                    return expression.replace(/e\*\*x/g, 'Math.exp(x)');
                }
                const fx = chechExp(backendData.fx);

                // Executing the function f(x)
                const f_x = new Function('x', `return ${fx};`);

                // Graph drawing
                const xValues = Array.from({ length: 1000 }, (_, i) => -1.5 + i * 0.003);
                const yValues = xValues.map(x => f_x(x));

                let layout = {
                    title: `Fixed Point Iteration Method for ${backendData.fx}`,
                    xaxis: {
                        title: 'x'
                    },
                    yaxis: {
                        title: 'f(x)'
                    }
                };
                const trace = {
                    x: xValues,
                    y: yValues,
                    mode: 'lines',
                    name: `f(x)`,
                    line: {
                        width: 2
                    }
                };
                Plotly.newPlot('Plot', [trace], layout);

                function sleep(ms){
                    return new Promise(resolve => setTimeout(resolve,ms));
                }

                async function animateRoots(){
                    while(true){
                        for (let i = 0; i < data.count; i++){
                            const arrow = {
                                x: [backendData.roots[i+1]],
                                y: [0],
                                mode: "markers",
                                name: "Root",
                                marker: {
                                    color: '#dc2f2f',
                                    symbol: 'arrow-down',
                                    size: 10
                                }
                            };
                            const iterationsTrace = {
                                x: [backendData.roots[i], backendData.roots[i]],
                                y: [backendData.f_result[i], 0],
                                mode: 'lines',
                                type: 'scatter',
                                name: `x_${i + 1}`,
                                line: {
                                    width: 1,
                                    color: '#000000',
                                    dash: 'dash'
                                }
                            };
                            const iterationsTrace2 = {
                                x: [backendData.roots[i], backendData.roots[i+1]],
                                y: [backendData.f_result[i], 0],
                                mode: "lines",
                                type: "scatter",
                                name: `Iteration_${i + 1}`,
                                line: {
                                    width: 2,
                                    color: "#000000"
                                }
                            };
                            Plotly.addTraces('Plot', iterationsTrace, 1);
                            Plotly.addTraces('Plot', iterationsTrace2, 2);
                            Plotly.addTraces('Plot', arrow, 3);
                            await sleep(1000);
                            Plotly.deleteTraces('Plot', 3);
                            Plotly.deleteTraces('Plot', 2);
                            Plotly.deleteTraces('Plot', 1);

                        }
                    }
                }
                animateRoots();
                IterationResults(data);
                function IterationResults(data) {
                    const iterationsContainer = document.getElementById('Iter_result');
                    iterationsContainer.innerHTML += '';
                    if ('Error' in data) {
                        iterationsContainer.innerHTML = `<p>Error: ${data.Error}</p>`;
                      }
                    else {
                        const root = data.roots;
                        for (let i = 1; i < root.length; i++) {
                            iterationsContainer.innerHTML += `
                              <p style="text-align: center">
                                <mark>
                                Iteration ${i}<br>                                 
                                ↓<br>
                                x<sub>${i-1}</sub> = ${data.roots[i-1]}<br>
                                g(x<sub>${i-1}</sub>)<br>
                                g(x<sub>${i-1}</sub>) = ${data.roots[i]}<br>
                                x<sub>${i}</sub> = ${data.roots[i]}<br>
                                ↓<br>
                                |f(x<sub>${i}</sub>)| = |${data.f_result[i-1]}|<br>
                                |${data.f_result[i-1]}| <= ${data.tol}<br>
                                ${Math.abs(data.f_result[i-1])} <= ${data.tol}<br>
                                or<br>
                                |x<sub>${i}</sub> - x<sub>${i-1}</sub>| <= ${data.tol}<br>
                                ${Math.abs(data.roots[i] - data.roots[i-1])} <= ${data.tol}<br>
                                </mark>
                            </p>
                            <hr>
                          `;
                            if (i+1 >= root.length){
                                iterationsContainer.innerHTML += `
                                <p style="text-align: center;">
                                    <mark>
                                        Root = ${data.root}<br>
                                        Error = &plusmn; ${data.error}<br>
                                    </mark>
                                </p>
                                `;
                            }
                        }
                    }
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



const mathField = document.getElementById('MathField');
const FPIFunc = document.getElementById('FPIFunc');



//The content written in the math-field is also written to FPIFunc.
FPIFunc.addEventListener("input", () => {
    const mathField = document.getElementById('MathField');
    const FPIFunc = document.getElementById('FPIFunc');
    const inputExpression = document.getElementById('FPIFunc').value;
    mathField.textContent = transformExpression(inputExpression);
    FPIFunc.value = transformExpression(inputExpression);

});

//The content written in the math-field is also written to FPIFunc.
mathField.addEventListener("input", () => {
    const mathFieldValue = mathField.value;
    const FPIFunc = document.getElementById("FPIFunc");
    FPIFunc.value = transformExpression(mathFieldValue);
});

//The keyboard will open when the math-field is clicked.
mathField.addEventListener("focusin", () => {
    mathVirtualKeyboard.show();
});


function transformExpression(expression) {
    // Replace occurrences of "2x" with "2*x", "3x" with "3*x", etc.
    expression = expression.replace(/(\d+)x/g, "$1*x");

    // Replace occurrences of "0.5x" with "0.5*x", etc.
    expression = expression.replace(/(\d*\.\d+)x/g, "$1*x");

    // Replace occurrences of "xe^x" with "x*e^x"
    expression = expression.replace(/xe\^x/g, "x*e^x");
    expression = expression.replace(/xe\^{x}/g, "x*e^x");

    return expression;
}






// mathField.addEventListener("input", () => {
//     const FPIFunc = document.getElementById("FPIFunc");
//     FPIFunc.value = document.getElementById('MathField');
// });
// FPIFunc.addEventListener("input", () => {
//     const mathField = document.getElementById('MathField');
//     mathField.value = document.getElementById('FPIFunc').value;
// });

// // Fixed point iterationa tıklayınca okun yönünün aşağıya doğru şekilde değişmesi
// document.querySelectorAll('.card-header').forEach((cardHeader) => {
//     cardHeader.addEventListener('click', () => {
//         const arrow = cardHeader.querySelector('.arrow');
//         // const cardBody = cardHeader.parentNode.querySelector('.card-body');
//         if (arrow.textContent === '\u25C0') {
//             arrow.textContent = '\u25BC';
//         } else {
//             arrow.textContent = '\u25C0';
//         }
//     });
// });
