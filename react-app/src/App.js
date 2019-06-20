import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Matrix, matrixPrint, matrixSum, matrixProduct, matrixIntPow } from './matrix';
import { Complex } from './complex';
import { Polynomial } from './polynomial';

class App extends React.Component {

    render(){
        const m = new Matrix(2,2);
        m.set([[1,2],[3,4]].map(row => row.map(cell => new Complex(cell, 0))));
        const p = new Polynomial([5,4,3,2,1].map(n => new Complex(n, 0)));
        return (
            <div className="App">
                simple matrix operations
                {matrixPrint(matrixIntPow(m,200))}
                {p.print()}<br />
                {p.derivate().print()}
            </div>
        );
    }

}

export default App;
