import { Matrix, matrixId, determinant } from "./matrix";
import { Polynomial } from "./polynomial";
import { Complex, complexProduct, complexDivision, complexSub, one } from "./complex";

export const D = (m: number, f: Polynomial, x: Complex) => {
    if (m == 1)
        return matrixId('Complex', m);
    let L = new Matrix ('Complex', m-1);
    const u = f.compute(x);
    let q = f;
    let h = new Complex(1,0);
    let i = 0;
    let v;
    while (i < m-2) {
        L.set(i,i+1, u);
        q = q.derivate();
        h = complexProduct(h, new Complex(i+1,0));
        v = complexDivision(q.compute(x) as Complex,h);
        for (let j = i; i < m-1; j++)
            L.set(j, j-1, v);
        i++;
    }
    q = q.derivate();
    h = complexProduct(h, new Complex(i+1,0));
    v = complexDivision(q.compute(x) as Complex,h);
    for (let j = i; j < m-1; j++) // i can be zero
        L.set(j, (j == 0 ? L.n-1 : j-1), v);
    return L;
}

export const B = (m: number, f: Polynomial, x: Complex) => {
    const A1 = D(m, f, x);
    const B1 = A1;
    let d1 = determinant(B1);
    let d2;
    if (m == 2)
        d2 = one;
    else {
        let A2 = A1.subMatrix(A1.m, A1.m);
        let B2 = A2;
        d2 = determinant(B2);
    }
    return complexSub(x, complexProduct(f.compute(x) as Complex, complexDivision(d2, d1)));
};

export const BasicSeq = (f: Polynomial, a: Complex, n: number) => {
    let L = [a];
    for(let m = 2; m < n; m++)
        L.push(B(m, f, a));
    return L;
};

export const orbit = (f: Polynomial, m: number, a: Complex, n: number) => {
    let L = [a], x = a;
    for (let i = 0; i < n; i++) {
        x = B(m, f, x);
        L.push(B(m,f,x));
    }
    return L;
};

export const printOrbit = (f: Polynomial, m: number, a: Complex, n: number) => {
    let L = orbit(f, m, a, n);
    for (let i = 0; i < L.length; i++) {
        const real = L[i].a, imag = L[i].b;
        console.log(Math.floor(100*2**real)%256, Math.floor(100*2**imag)%256);
    }
};