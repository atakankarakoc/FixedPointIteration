import math
from flask import Flask
from flask import render_template
from flask import request, jsonify
from sympy import sympify, nsimplify
from functions import function_dictionary

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html",
                           title="Fixed Point Iteration")

@app.route('/FixedPointIteration', methods=['POST',"GET"])
def FPI():
    if request.is_json:
        data = request.get_json()

        fx = data.get("fx")
        x0 = float(data.get("x0"))
        tol = data.get("tol")
        max_iter = int(data.get("max_iter"))

        x_prev = x0
        x_next = 0
        iter = 0
        error = []
        root = []
        root.append(x_prev)
        tolerance = parse_tolerance(tol)
        python_func = str(sympify(fx)).replace(" ", "")

        for i in range(max_iter):
            iter = i
            try:
                x_next = function_dictionary[python_func](x_prev)  # The value of g(xn) is stored in x_next.
                root.append(x_next)
                if "e**x" in python_func:
                    modified_expr = python_func.replace('e**x', 'math.exp(x)')  # Replace 'x' with 'math.exp(x)'
                    f_x_next = eval(modified_expr, {"x": x_next, "math": math})  # f(x_next) is calculated.
                else:
                    f_x_next = eval(python_func, {"x": x_next})  # f(x_next) is calculated.

                error.append(f_x_next)
                if abs(f_x_next) <= tolerance or abs(x_next - x_prev) <= tolerance:
                    break
            except Exception as e:
                print(f"Error: {e}")
                return jsonify({"Error": str(e)})

            x_prev = x_next

        response_data = {
            "fx": fx,
            "pyfunc": python_func,
            "x0": x0,
            "tol": tol,
            "max_iter": max_iter,
            "root": x_next,
            "count": (iter + 1),
            "error": error[-1],
            "x_prev": x_prev,
            "x_next": x_next,
            "f_x_prev": error[-2],
            "f_x_next": error[-1],
            "roots": root,
            "f_result": error
        }
        return jsonify(response_data)
    else:
        return jsonify({"Error": "Invalid JSON format in the request"}), 400

def parse_tolerance(tol):
    try:
        tol_sympy = nsimplify(tol)
        return float(tol_sympy)
    except ValueError as v:
        return v


if __name__ == '__main__':
    app.run(debug=True)