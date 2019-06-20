import { Matrix, matrixId, determinant } from "./matrix";
import { Polynomial } from "./polynomial";
import { Complex, complexProduct, complexDivision, complexSub } from "./complex";

export const D = (m: number, f: Polynomial, x: Complex) => {
    if (m == 1)
        return matrixId('Complex', m);
    let L = new Matrix ('Complex', m-1);
    const u = f.compute(x);
    let q = f;
    let h = new Complex(1,0);
    let i = 1;
    let v;
    while (i < m-2) {
        L.set(i,i+1, u);
        q = q.derivate();
        h = complexProduct(h, new Complex(i,0));
        v = complexDivision(q.compute(x) as Complex,h);
        for (let j = i; i < m-1; j++)
            L.set(j, j-1, v);
        i++;
    }
    q = q.derivate();
    h = complexProduct(h, new Complex(i,0));
    v = complexDivision(q.compute(x) as Complex,h);
    for (let j = i; i < m-1; j++)
        L.set(j, j-1, v);
    return L;
}

export const B = (m: number, f: Polynomial, x: Complex) => {
    const A1 = D(m, f, x);
    const B1 = A1;
    let d1 = determinant(B1);
    let d2;
    if (m == 2)
        d2 = matrixId('Complex', A1.m);
    else {
        let A2 = A1.subMatrix(A1.m, A1.m);
        let B2 = A2;
        d2 = determinant(B2);
    }
    return complexSub(x, complexProduct(f.compute(x) as Complex, complexDivision(d2, d1)));
};

