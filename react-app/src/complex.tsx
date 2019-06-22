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

    print = () => {
        let str = "";
        if (this.a != 0)
            str += this.a;
        if (this.b != 0) {
            if (this.a && this.b > 0)
                str += ' + ';
            str += this.b + 'i';
        }
        if (str == "")
            str = "0"
        return str;
    }

    // a,b are scaling parameters
    //rgb = (a = 10, b = 10) => [this.a/a+a/2, this.b/b+b/2, 100];
    rgb = (a: number, b: number) => [this.a*a, 0, this.b*b];

};

export const one = new Complex(1,0);

export const zero = new Complex(0,0);

export const complexSum = (x: Complex, y: Complex) => new Complex(x.a+y.a, x.b+y.b);

export const complexProduct = (x: Complex, y: Complex) => new Complex(x.a*y.a-x.b*y.b, x.b*y.a+x.a*y.b);

export const complexDivision = (x: Complex, y: Complex) => complexProduct(x, y.inverse());

export const complexSub = (x: Complex, y: Complex) =>
    complexSum(x, complexProduct(y, new Complex(-1,0)));

export const complexIntPow = (x: Complex, n: number) => {
    if (x.a == 0 && x.b == 0)
        return x;
    if(n == 0)
        return new Complex(1,0);
    let z = x;
    for(let k = 1; k < n; k++)
        z = complexProduct(z, x);
    return z;
};

export const polygon = (n: number, r: number = 1) => 
    zeros(n).map((v, i) => new Complex(r*Math.cos(2*Math.PI*i/n), r*Math.sin(2*Math.PI*i/n)));