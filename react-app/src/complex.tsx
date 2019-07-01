import { zeros, min, max } from "./utils";

export class Complex {

    name: string = 'Complex';
    b: number;
    a: number;

    constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
    }

    norm = () => (this.a**2+this.b**2)**0.5;

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

    // axis is given by image
    rgb = (axis: [number, number, number, number]) =>
        [(axis[1]-this.a)/(axis[1]-axis[0])*255, 0, (axis[3]-this.b)/(axis[3]-axis[2])*255];

};

export let one = new Complex(1,0);

export let zero = new Complex(0,0);

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

export const complexZeros = (n: number) => zeros(n).map(() => new Complex(0,0));

export const axisComplexDomain = (Z: Complex[][]): [number, number, number, number] => {
    const onlyReal = Z.map(line => line.map(complex  => complex.a));
    const minReal = min(onlyReal.reduce((pline,line) => pline.concat(line),[]));
    const maxReal = max(onlyReal.reduce((pline,line) => pline.concat(line),[]));
    const onlyImag = Z.map(line => line.map(complex => complex.b));
    const minImag = min(onlyImag.reduce((pline,line) => pline.concat(line),[]));
    const maxImag = max(onlyImag.reduce((pline,line) => pline.concat(line),[]));
    return [minReal, maxReal, minImag, maxImag];
}