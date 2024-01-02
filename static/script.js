// document.getElementById("findroot").addEventListener("click", function(){
//     var fetchData = {
//         fx: document.getElementById('FPIFunc').value,
//         x0: document.getElementById('FPIInitial').value,
//         tol: document.getElementById('FPITolerance').value,
//         max_iter: document.getElementById('FPIIter').value
//     };
//
//     var data = JSON.stringify(fetchData);
//
//     fetch('/FixedPointIteration', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: data
//     })
//         .then(response => response.json())
//         .then(data => {
//           document.getElementById("inputDiv").style.display = "none";
//           document.getElementById("resultDiv").style.display = "block";
//           console.log(data);
//           document.getElementById("deneme").innerText = data.fx;
//         })
//         // .then(data =>{
//         //     console.log(data)
//         //     window.location.href = "/FixedPointIteration";
//         // })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// });

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
          document.getElementById("inputDiv").style.display = "none";
          document.getElementById("resultDiv").style.display = "block";
          console.log(data);
          document.getElementById("fx").innerText = data.fx;
          document.getElementById("pyfunc").innerText = data.pyfunc;
          document.getElementById("tol").innerText = data.tol;
          document.getElementById("max_iter").innerText = data.max_iter;
          document.getElementById("x0").innerText = data.x0;
          document.getElementById("root").innerText = data.root;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Fixed point iterationa tıklayınca okun yönünün aşağıya doğru şekilde değişmesi
document.querySelectorAll('.card-header').forEach((cardHeader) => {
    cardHeader.addEventListener('click', () => {
        const arrow = cardHeader.querySelector('.arrow');
        // const cardBody = cardHeader.parentNode.querySelector('.card-body');
        if (arrow.textContent === '\u25C0') {
            arrow.textContent = '\u25BC';
        } else {
            arrow.textContent = '\u25C0';
        }
    });
});


['change', 'keypress', 'input', 'click'].forEach((evt) => {
    const mathField = document.getElementById('MathField');
    document.getElementById('FPIFunc').addEventListener(evt, () => {
        mathField.textContent = document.getElementById('FPIFunc').value;
    });
});

//FPIFunc'a yazılanları math-field da yazmak için
document.getElementById('FPIFunc').addEventListener("input", () => {
    const mathField = document.getElementById('MathField');
    mathField.textContent = document.getElementById('FPIFunc').value;
});

const mathField = document.getElementById('MathField');
const FPIFunc = document.getElementById('FPIFunc');

//math-field'a yazılanları FPIFunc da yazmak için
mathField.addEventListener("input", () => {
    const mathFieldValue = mathField.value;
    FPIFunc.value = mathFieldValue;
});

//math-field öğesine tıklandığında klavyesini açar
mathField.addEventListener("focusin", () => {
    mathVirtualKeyboard.show();
});

// document.getElementById('MathField').addEventListener("input", () => {
//     const FPIFunc = document.getElementById('FPIFunc');
//     const mathFieldValue = document.getElementById('MathField').value;
//     FPIFunc.value = mathFieldValue;
// });

