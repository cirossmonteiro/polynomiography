import { Complex, complexProduct, complexIntPow, complexSum, complexZeros } from "./complex";
import { MatrixZero, matrixIntPow, matrixProduct, matrixSum, matrixScalar } from "./matrix";
import { zeros } from "./utils";

export class Polynomial {

    coefficients: Complex[];

    constructor(coef: Complex[]) {
        // eliminate excessive zeros
        this.coefficients = coef.filter((currentValue, index, arr) => 
            currentValue != new Complex(0,0) || (currentValue == new Complex(0,0) &&
                !arr.slice(0, index-1).reduce((ac, v) => v != new Complex(0,0), false) && index != arr.length-1)
        );
    }

    get degree() {
        return this.coefficients.length-1;
    }

    compute = (x: any) => {
        const g = this.coefficients.length-1;
        //const type = this.coefficients[0].name;
        const type = x.name;
        if (type == 'Complex') {
            let z = new Complex(0,0);
            for (let i = 0; i <= g; i++) {
                const c = this.coefficients[i];
                const mon = complexIntPow(x, g-i);
                z = complexSum(z, complexProduct(c, mon));
            }
            return z;
        }
        if (type == 'Matrix') {
            if (x.m != x.m)
                throw new TypeError("Matrix power can't be computed because of its dimensions.");
            const type2 = x.matrix[0][0].name;
            let z = MatrixZero(type2, x.m);
            for (let i = 0; i <= g; i++) {
                const c = this.coefficients[i];
                const mono = matrixIntPow(x, g-i);
                z = matrixSum(z, matrixScalar(mono, c));
            }
            return z;
        }
        return null;
    }

    derivate = () => {
        let v = this.coefficients.slice(0);
        const g = v.length-1;
        v.pop();
        v = v.map((e,i) => complexProduct(e, new Complex(g-i,0)));
        return new Polynomial(v);
    }
    
    print = () => {
        let g = this.coefficients.length-1;
        return this.coefficients.map((c,i) => `${c.print()}x^${g-i}`).reduce((ac, now) => ac+'+'+now,'');
    }

};

export const polynomialProduct = (p1: Polynomial, p2: Polynomial) => {
    if (p1.coefficients == [new Complex(0,0)] || p2.coefficients == [new Complex(0,0)])
        return new Polynomial([new Complex(0,0)]);
    const n = p1.degree+p2.degree+1;
    let p = complexZeros(n);
    for (let i = 0; i <= p1.degree; i++)
        for (let j = 0; j <= p2.degree; j++) {
            p[i+j] = complexSum(p[i+j], complexProduct(p1.coefficients[p1.degree-i], p2.coefficients[p2.degree-j]));
        }
    return new Polynomial(p);
}