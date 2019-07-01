import { one, Complex, complexProduct, complexZeros, complexSub, zero } from "../complex";
import { Polynomial, polynomialProduct } from "../polynomial";

export default class WebWorker {
    [x: string]: any;
	constructor(worker: any/* { toString: () => void; } */) {
		const code = worker.toString();
		const blob = new Blob(['('+code+')()']);
		return new Worker(URL.createObjectURL(blob));
	}
};