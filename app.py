from flask import Flask
from flask import render_template
from flask import request, jsonify
from sympy import symbols, sympify, nsimplify, S, diff

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html",
                           title="Fixed Point Iteration")

@app.route('/FixedPointIteration', methods = ['POST', "GET"])
def FPI():
    if request.is_json:
        data = request.get_json()
        fx = data.get("fx")
        x0 = str(data.get("x0"))
        tol = data.get("tol")
        max_iter = str(data.get("max_iter"))
        parsed_tol = str(parse_tolerance(tol))
        python_func = str(sympify(fx))
        # solution = str(fixed_point_iteration(python_func, x0, parsed_tol, max_iter))
        response_data = {
            "fx": str(fx),
            "x0": x0,
            "tol": tol,
            "max_iter": max_iter,
            "pyfunc": python_func
        }
        return jsonify(response_data)
        # return render_template("FixedPointIteration.html", result=response_data)

    else:
        return render_template("FixedPointIteration.html")

def parse_tolerance(tol):
    try:
        tol_sympy = nsimplify(S(tol))
        return float(tol_sympy)
    except ValueError:
        return None 
    
# def fixed_point_iteration(fx, x0, tol, max_iter):
#     x = symbols('x')
#     g_x = sympify(fx)
#     g_prime = diff(g_x, x)

#     iteration = 0
#     x_n = x0

#     while iteration < max_iter:
#         try:
#             x_next = x_n - g_x.subs(x, x_n) / g_prime.subs(x, x_n)
#         except ZeroDivisionError:
#             return None  # Division by zero, convergence not possible

#         if abs(x_next - x_n) < tol:
#             return x_next

#         x_n = x_next
#         iteration += 1

#     return None 

if __name__ == '__main__':
    app.run(debug=True)

x^2 - x - 2 = 0
x^2 + 2 = g(x)
sqrt(x + 2) = g(x) 