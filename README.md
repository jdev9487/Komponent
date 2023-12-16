# Komponent

## 1. Christoffel symbols $\Gamma^\rho_{\mu\nu}$

This is the formula used to calculate Christoffel symbols:

$$ \Gamma^\rho_{\mu\nu} = \frac{1}{2} g^{\rho\lambda}\left(\partial_{\mu}g_{\lambda\nu} + \partial_{\nu}g_{\lambda\mu} - \partial_{\lambda}g_{\mu\nu}\right)$$

The python package is accessible via a grpc interface. The following example illustrates the parameters

```json
{
    "variables": [
        "r",
        "theta"
    ],
    "diagonals": [
        "1",
        "r^2"
    ],
    "matrix_identifier": 0
}
```

The coordinate system is defined via the choice of variables. Only diagonal metrics are supported. `matrix_identifier` indicates the $\rho$ value. The above payload produces

```json
{
    "matrix": "\\left[\\begin{matrix}0 & 0\\\\0 & - r\\end{matrix}\\right]"
}
```

which when typeset in $\LaTeX$ gives $\Gamma^r_{\mu\nu}$

$$ \left[\begin{matrix}0 & 0\\0 & - r\end{matrix}\right] $$