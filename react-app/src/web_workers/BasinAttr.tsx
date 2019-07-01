import { one, Complex, complexProduct, complexZeros, complexSub, zero } from "../complex";
import { Polynomial, polynomialProduct } from "../polynomial"; // ISSUE: error message: __WEBPACK_IMPORTED_MODULE_0__ is not defined
import { zeros } from "../utils";
import { orbit } from "../polynomiography";

export default () => {
	self.addEventListener('message', event => { // eslint-disable-line no-restricted-globals
        if (!event) return;
        let eventData = JSON.parse(event.data);
        postMessage({status: 0, message: "worker started"});
        try{
            const { roots, width, height, axis, m, n} = eventData;
            postMessage({status: 0, message: "line13"});
            const dx = (axis[1]-axis[0])/width, dy = (axis[3]-axis[2])/height;
            postMessage({status: 0, message: "line15"});
            let f = new Polynomial([one]);
            postMessage({status: 0, message: "line17"});
            roots.forEach((root: Complex) =>
                f = polynomialProduct(f, new Polynomial([new Complex(1,0), complexProduct(new Complex(-1,0), root)]))
            );
            postMessage({status: 0, message: "line21"});
            let Z = zeros(width).map(() => complexZeros(height));
            postMessage({status: 0, message: "line23"});
        }catch(err) {
            postMessage({status: 0, message: err.message});
            return;
        }
        /* postMessage({status: 0, message: "before for"});
        for (let i = 0; i < width; i++) {
            postMessage({status: 0, message: `complete: ${i/width*100}%`});
            for (let j = 0; j < height; j++) {
                const x = axis[0]+dx*i, y = axis[2]+dy*j;
                const z = new Complex(x,y);
                const L = orbit(f,m,z,n);
                const w = L[L.length-1];
                if ((f.compute(w) as Complex).norm() < 0.1) {
                    for (let k = 0; k < roots.length; k++) {
                        if (complexSub(w,roots[k]).norm() < 0.1) {
                            Z[i][j] = new Complex(k+1, 0);
                            break;
                        }
                    }
                }
            }
        }
        roots.forEach((root: Complex) => {
            const i = Math.floor((root.a-axis[0])/dx), j = Math.floor((root.b-axis[2])/dy);
            Z[i][j] = zero;
        });
        postMessage({status: 1, data: Z, message: "complete: 100% - done"}); */
	})
};



/* self.addEventListener("message", event => {
    postMessage({status: 0, data: 'worker started'});
    const { roots, width, height, axis, m, n} = event.data;
    const dx = (axis[1]-axis[0])/width, dy = (axis[3]-axis[2])/height;
    let f = new Polynomial([one]);
    roots.forEach((root: Complex) =>
        f = polynomialProduct(f, new Polynomial([new Complex(1,0), complexProduct(new Complex(-1,0), root)]))
    );
    let Z = zeros(width).map(() => complexZeros(height));
    for (let i = 0; i < width; i++) {
        postMessage({status: 0, data: `complete: ${i/width*100}%`});
        for (let j = 0; j < height; j++) {
            const x = axis[0]+dx*i, y = axis[2]+dy*j;
            const z = new Complex(x,y);
            const L = orbit(f,m,z,n);
            const w = L[L.length-1];
            if ((f.compute(w) as Complex).norm() < 0.1) {
                for (let k = 0; k < roots.length; k++) {
                    if (complexSub(w,roots[k]).norm() < 0.1) {
                        Z[i][j] = new Complex(k+1, 0);
                        break;
                    }
                }
            }
        }
    }
    roots.forEach((root: Complex) => {
        const i = Math.floor((root.a-axis[0])/dx), j = Math.floor((root.b-axis[2])/dy);
        Z[i][j] = zero;
    });
    postMessage({status: 1, data: Z});
}, false); */