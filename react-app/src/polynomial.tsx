import { Complex, complexProduct, complexIntPow, complexSum } from "./complex";
import { MatrixZero, matrixIntPow, matrixProduct, matrixSum, matrixScalar } from "./matrix";

export class Polynomial {

    coefficients: Complex[];

    constructor(arr: Complex[]) {
        this.coefficients = arr.slice(0);
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