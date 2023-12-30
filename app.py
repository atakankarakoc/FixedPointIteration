from flask import Flask
from flask import render_template
from flask import request, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html",
                           title="Fixed Point Iteration")

@app.route('/FixedPointIteration', methods = ['POST'])
def FPI():
    if request.is_json:
        data = request.get_json()
        fx = data.get("fx")
        x0 = data.get("x0")
        tol = data.get("tol")
        max_iter = data.get("max_iter")
        response_data = {
            "fx": fx,
            "x0": x0,
            "tol": tol,
            "max_iter": max_iter
        }
        return jsonify(response_data)
        # return render_template("FixedPointIteration.html", result=response_data)

    else:
        return jsonify({'error': 'Wrong data format'})


if __name__ == '__main__':
    app.run(debug=True)
