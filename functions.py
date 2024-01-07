import math

function_dictionary = {
    "x**2-2*x+1": lambda x: (x**2 + 1) / 2,
    "x**2+1-2*x": lambda x: (x**2 + 1) / 2,
    "1-2*x+x**2": lambda x: (x**2 + 1) / 2,
    "1+x**2-2*x": lambda x: (x**2 + 1) / 2,
    "-2*x+1+x**2": lambda x: (x**2 + 1) / 2,
    "-2*x+x**2+1": lambda x: (x**2 + 1) / 2,
    "x**3-x**2+5": lambda x: complex((x**2-5)**(1/3)),
    "x**3+5-x**2": lambda x: complex((x**2-5)**(1/3)),
    "5-x**2+x**3": lambda x: complex((x**2-5)**(1/3)),
    "5+x**3-x**2": lambda x: complex((x**2-5)**(1/3)),
    "-x**2+5+x**3": lambda x: complex((x**2-5)**(1/3)),
    "-x**2+x**3+5": lambda x: complex((x**2-5)**(1/3)),
    "5*x**2+3*x-2": lambda x: (2-5*math.pow(x, 2)) / 3,
    "5*x**2-2+3*x": lambda x: (2-5*math.pow(x, 2)) / 3,
    "-2+3*x+5*x**2": lambda x: (2-5*math.pow(x, 2)) / 3,
    "-2+5*x**2+3*x": lambda x: (2-5*math.pow(x, 2)) / 3,
    "3*x-2+5*x**2": lambda x: (2-5*math.pow(x, 2)) / 3,
    "3*x+5*x**2-2": lambda x: (2-5*math.pow(x, 2)) / 3,
    "x*e**x-0.3": lambda x: 0.3 / math.exp(x),
    "e**x*x-0.3": lambda x: 0.3 / math.exp(x),
    "-0.3+x*e**x": lambda x: 0.3 / math.exp(x),
    "x**3+2*x+1": lambda x: (-1 * math.pow(x, 3) - 1) / 2,
    "x**3+1+2*x": lambda x: (-1 * math.pow(x, 3) - 1) / 2,
    "1+2*x+x**3": lambda x: (-1 * math.pow(x, 3) - 1) / 2,
    "1+x**3+2*x": lambda x: (-1 * math.pow(x, 3) - 1) / 2,
    "2*x+1+x**3": lambda x: (-1 * math.pow(x, 3) - 1) / 2,
    "2*x+x**3+1": lambda x: (-1 * math.pow(x, 3) - 1) / 2,
}