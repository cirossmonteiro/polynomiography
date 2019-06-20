import React from 'react';
import { Polynomial } from './polynomial';
import { Complex, one, zero } from './complex';

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

/*     draw = () => {
        const { width, height, delta } = this;
        const 
        if (!this.canvasRef.current)
            return;
        const ctx = this.canvasRef.current.getContext("2d");
        if (!ctx)
            return;
        var imgData = ctx.createImageData(width*delta, height*delta);
        var i;
        for (i = 0; i < imgData.data.length; i += 4) {
            const k = i/4, x = k/this.width, y = k%this.height;
            imgData.data[i+0] = x*255/this.width; // red
            imgData.data[i+1] = y*255/this.height; // green
            imgData.data[i+2] = 100; // blue
            imgData.data[i+3] = 255; // alpha
        }
        ctx.putImageData(imgData,0,0);
    }
 */
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
                const x = dx*i, y = dy*j;
                const z = new Complex(x,y), fz = p.compute(z) as Complex;
                const color = fz.rgb(200,200);
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
        this.drawPolynomial(new Polynomial(polynomial.map(x => new Complex(x,0))), axis, thickness);
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