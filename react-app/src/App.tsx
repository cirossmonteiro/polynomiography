import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Matrix, matrixPrint, matrixSum, matrixProduct, matrixIntPow } from './matrix';
import { Complex } from './complex';
import { Polynomial } from './polynomial';
import Graphics from './graphics';
import { handleChange } from './utils';
import { number, string } from 'prop-types';

interface IProps {

}

interface IState {
    poly: string,
    poly2: number[],
    axis: string,
    axis2: [number, number, number, number],
    thickness: number,
    thickness2: number,
    dimensions: string,
    dimensions2: [number, number]
}

class App extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            poly: "[1,0]",
            poly2: [1,0],
            axis: "[-3,3,-3,3]",
            axis2: [-3,3,-3,3],
            thickness: thick,
            thickness2: thick,
            dimensions: JSON.stringify(dim),
            dimensions2: dim
        }
    }

    updateGraphics = () => {
        const { poly, axis, thickness, dimensions } = this.state;
        this.setState({
            poly2: eval(poly),
            axis2: eval(axis),
            thickness2: thickness,
            dimensions2: eval(dimensions)
        });
    }

    render(){
        const { poly, poly2, axis, axis2, thickness, thickness2, dimensions, dimensions2 } = this.state;
        return (
            <div className="App">
                <div>
                    Only real numbers, please. Increasing thickness increase the size of points, but computing the same values.
                </div>
                Polynomial coefficients <input name = "poly" value={poly} onChange = {e => handleChange(e, this)} />
                [xmin, xmax, ymin, ymax] <input name = "axis" value={axis} onChange = {e => handleChange(e, this)} />
                [width, height] <input name = "dimensions" value={dimensions} onChange = {e => handleChange(e, this)} />
                Thickness (point) <input name = "thickness" type = "number" min="1" max="2" value={thickness} onChange = {e => handleChange(e, this)} />
                <button onClick = {this.updateGraphics}>update canvas</button>
                <Graphics polynomial = {poly2} axis = {axis2} thickness = {thickness2} width = {dimensions2[0]} height = {dimensions2[0]} />
            </div>
        );
    }

}

export default App;
