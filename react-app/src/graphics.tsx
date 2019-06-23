import React from 'react';
import { Polynomial, polynomialProduct } from './polynomial';
import { Complex, one, zero, complexSub, complexProduct, complexZeros } from './complex';
import { orbit } from './polynomiography';
import { zeros } from './utils';

interface IProps {
    width: number,
    height: number,
    polynomial: number[],
    axis: [number, number, number, number],
    thickness: number
}

interface IState {

}

class Graphics extends React.Component<IProps, IState> {

    private canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: IProps) {
        super(props);
        this.canvasRef = React.createRef();
    }

    drawBasinAttr = (roots: Complex[], m: number, n: number) => {
        const { width, height, thickness, axis} = this.props;
        const delta = thickness;
        if (!this.canvasRef.current)
            return;
        const ctx = this.canvasRef.current.getContext("2d");
        if (!ctx)
            return;
        var imgData = ctx.createImageData(width*delta, height*delta);
        const dx = (axis[1]-axis[0])/width, dy = (axis[3]-axis[2])/height;
        let f = new Polynomial([new Complex(1,0)]);
        roots.forEach(root =>
            f = polynomialProduct(f, new Polynomial([new Complex(1,0), complexProduct(new Complex(-1,0), root)]))
        );
        console.log(4343);
        let Z = zeros(width).map(() => complexZeros(height));
        for (let i = 0; i < width; i++) {
            console.log(45,i);
            //console.time('j-loop');
            for (let j = 0; j < height; j++) {
                const x = axis[0]+dx*i, y = axis[2]+dy*j;
                const z = new Complex(x,y);
                const L = orbit(f,m,z,n); // ta produzindo muito NaN
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
            //console.timeEnd('j-loop');
        }
        console.log(Z);
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const color = Z[i][j].rgb(axis);
                for (let k1 = 0; k1 < delta; k1++)
                    for (let k2 = 0; k2 < delta; k2++) {
                        //const ind = 4*((i+k1)*width*delta+(j+k2));
                        const ind = 4*((i*delta+k1)*width*delta+(j*delta+k2));
                        imgData.data[ind+0] = color[0];
                        imgData.data[ind+1] = color[1];
                        imgData.data[ind+2] = color[2];
                        imgData.data[ind+3] = 255;
                    }
                
            }
        }
        roots.forEach(root => {
            const i = Math.floor((root.a-axis[0])/dx), j = Math.floor((root.b-axis[2])/dy);
            for (let k1 = 0; k1 < delta; k1++) {
                for (let k2 = 0; k2 < delta; k2++) {
                    const ind = 4*((i*delta+k1)*width*delta+(j*delta+k2));
                    imgData.data[ind+0] = 255;
                    imgData.data[ind+1] = 255;
                    imgData.data[ind+2] = 255;
                    imgData.data[ind+3] = 255;
                }
            }
        });
        console.log(74);
        ctx.putImageData(imgData,0,0);
    }

    drawPolynomial = (p: Polynomial, axis: [number, number, number, number], thickness: number) => {
        const { width, height} = this.props;
        const delta = thickness;
        if (!this.canvasRef.current)
            return;
        const ctx = this.canvasRef.current.getContext("2d");
        if (!ctx)
            return;
        var imgData = ctx.createImageData(width*delta, height*delta);
        const dx = (axis[1]-axis[0])/width, dy = (axis[3]-axis[2])/height;
        for (let i = 0; i < width; i++)
            for (let j = 0; j < height; j++) {
                const x = axis[0]+dx*i, y = axis[2]+dy*j;
                const z = new Complex(x,y), fz = p.compute(z) as Complex;
                const color = fz.rgb(axis);
                for (let k1 = 0; k1 < delta; k1++)
                    for (let k2 = 0; k2 < delta; k2++) {
                        //const ind = 4*((i+k1)*width*delta+(j+k2));
                        const ind = 4*((i*delta+k1)*width*delta+(j*delta+k2));
                        imgData.data[ind+0] = color[0];
                        imgData.data[ind+1] = color[1];
                        imgData.data[ind+2] = color[2];
                        imgData.data[ind+3] = 255;
                    }
            }
        /* var i;
        for (i = 0; i < imgData.data.length; i += 4) {
            const k = i/4, x = Math.floor(k/this.width), y = k%this.height;
            const z = new Complex(x,y), fz = p.compute(z) as Complex;
            console.log(53, i, z.print(), fz.print());
            const color = fz.rgb();
            imgData.data[i+0] = color[0];
            imgData.data[i+1] = color[1];
            imgData.data[i+2] = color[2];
            imgData.data[i+3] = 255;
        } */
        ctx.putImageData(imgData,0,0);
    }

    basicDraw = () => {
        const { polynomial, axis, thickness } = this.props;
        //this.drawPolynomial(new Polynomial(polynomial.map(x => new Complex(x,0))), axis, thickness);
        this.drawBasinAttr([new Complex(1,0), new Complex(-1,0),
            new Complex(0,1), new Complex(0,-1)], 2 , 8);
    }

    componentDidMount() {
        //this.draw();
        this.basicDraw();
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        const { polynomial, axis, thickness } = this.props;
        if(polynomial != prevProps.polynomial ||
            axis != prevProps.axis ||
            thickness != prevProps.thickness)
            this.basicDraw();

    }

    render() {
        const { width, height, thickness } = this.props;
        return (
            <div>
                <canvas style={{border: "1px solid black"}} ref={this.canvasRef} width={width*thickness} height={height*thickness} />
            </div>
        )
    };
}

export default Graphics;