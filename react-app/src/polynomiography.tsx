import { Matrix } from "./matrix";
import { Polynomial } from "./polynomial";
import { Complex, complexProduct, complexDivision } from "./complex";

export const D = (m: number, f: Polynomial, x: Complex) => {
    if (m == 1)
        return 1;
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