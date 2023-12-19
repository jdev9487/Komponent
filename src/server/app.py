import metric as m
import sympy as sp
import sympy.parsing.latex as l
from flask import Flask
from flask import request
from flask import Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.post("/christoffel")
def christoffel():
    body = request.json
    metricVars = []
    for var in body["variables"]:
        metricVars.append(sp.Symbol(var))
    metric = m.Metric(metricVars)
    diagonalEntries = []
    for diag in body["diagonals"]:
        diagonalEntries.append(l.parse_latex(diag))
    rep = sp.diag(*diagonalEntries)
    metric.setMatrixRep(rep)
    matrix = metric.get_christoffel_matrix(body["matrix_identifier"])
    pretty = sp.latex(matrix)
    resp = Response(pretty, mimetype='text/plain')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp