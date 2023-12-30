document.getElementById("findroot").addEventListener("click", function submitForm() {
    var fetchData = {
        fx: document.getElementById('FPIFunc').value,
        x0: document.getElementById('FPIInitial').value,
        tol: document.getElementById('FPITolerance').value,
        max_iter: document.getElementById('FPIIter').value
    };

    var data = JSON.stringify(fetchData);

    fetch('/FixedPointIteration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    })
        .then(response => response.json())
        .then(data => {
          document.getElementById("inputDiv").style.display = "none";
          document.getElementById("resultDiv").style.display = "block";

        })
        .catch(error => {
            console.error('Error:', error);
        });
});
