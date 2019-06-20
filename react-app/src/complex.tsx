import { zeros } from "./utils";

export class Complex {

    name: string = 'Complex';
    b: number;
    a: number;

    constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
    }

    norm = () => Math.sqrt(this.a**2+this.b**2);

    conjugate = () => new Complex(this.a, -this.b);

    inverse = () => new Complex(this.a/(this.a**2+this.b**2), -this.b/(this.a**2+this.b**2));

};

export const complexSum = (x: Complex, y: Complex) => new Complex(x.a+y.a, x.b+y.b);

export const complexProduct = (x: Complex, y: Complex) => new Complex(x.a*y.a, -x.b*y.b);

export const complexSub = (x: Complex, y: Complex) =>
    complexSum(x, complexProduct(y, new Complex(-1,0)));

export const complexIntPow = (x: Complex, n: number) => {
    if(n == 0)
        return new Complex(1,0);
    let z = x;
    for(let k = 1; k < n; k++)
        z = complexProduct(z, x);
    return z;
};

