import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Matrix, matrixPrint, matrixSum, matrixProduct, matrixIntPow } from './matrix';
import { Complex } from './complex';

class App extends React.Component {

    render(){
        const m = new Matrix(2,2);
        m.set([[1,2],[3,4]].map(row => row.map(cell => new Complex(cell, 0))));
        return (
            <div className="App">
                nothing3
                {matrixPrint(matrixIntPow(m,200))}
            </div>
        );
    }

}

export default App;
