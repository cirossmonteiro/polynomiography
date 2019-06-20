import React from 'react';
import { Complex, complexSum, complexProduct, complexPrint } from "./complex";
import { zeros } from "./utils";

export class Matrix {

    name: string = 'Matrix';
    matrix: any[][];
    m: number;
    n: number;

    constructor(type: string, m: number, n: number) {
        this.m = m;
        this.n = n;
        if (type == 'Complex')
            this.matrix = zeros(m).map(() => zeros(n).map(() => new Complex(0,0)));
        else
            this.matrix = zeros(m).map(() => zeros(n));
    }

    set = (mat: any[][]) => {
        this.m = mat.length;
        this.n = mat[0].length;
        return this.matrix = mat.slice(0).map(row => row.slice(0));
    }

};

export const MatrixZero = (type: string, n: number) => {
    let matrix = new Matrix(type, n,n);
    if (type == 'Complex')
        for (let k = 0; k < n; k++)
            matrix.matrix[k][k] = new Complex(0,0);
    return matrix;
}

export const matrixId = (type: string, n: number) => {
    let matrix = new Matrix(type, n,n);
    if (type == 'Complex')
        for (let k = 0; k < n; k++)
            matrix.matrix[k][k] = new Complex(1,0);
    return matrix;
}

export const matrixSum = (m1: Matrix, m2: Matrix) => {
    const type = m1.matrix[0][0].name;
    let matrix = new Matrix(type, m1.m, m1.n);
    for (let i = 0; i < m1.m; i++)
        for (let j = 0; j < m1.n; j++)
            if (type == 'Complex')
                matrix.matrix[i][j] = complexSum(m1.matrix[i][j],m2.matrix[i][j]);
    return matrix;
};

export const matrixScalar = (m1: Matrix, z: Complex) => {
    const type = m1.matrix[0][0].name;
    let matrix = new Matrix(type, m1.m, m1.n);
    for (let i = 0; i < m1.m; i++)
        for (let j = 0; j < m1.n; j++)
            if (type == 'Complex')
                matrix.matrix[i][j] = complexProduct(m1.matrix[i][j], z);
    return matrix;
};

export const matrixSub = (m1: Matrix, m2: Matrix) => {
    const type = m1.matrix[0][0].name;
    if (type == 'Complex')
        return matrixSum(m1, matrixScalar(m2, new Complex(-1, 0)));
}

export const matrixProduct = (m1: Matrix, m2: Matrix) => {
    if (m1.n != m2.m)
        throw TypeError(`Matrices product can't be computed because of its dimensions: ${m1.n} != ${m2.m}.`);
    const type = m1.matrix[0][0].name;
    let matrix = new Matrix(type, m1.m, m2.n);
    for (let i = 0; i < m1.m; i++)
        for (let j = 0; j < m2.n; j++)
            for (let k = 0; k < m1.n; k++)
                if (type == 'Complex')
                    matrix.matrix[i][j] = complexSum(matrix.matrix[i][j],
                        complexProduct(m1.matrix[i][k],m2.matrix[k][j]));
    return matrix;
};

export const matrixIntPow = (m1: Matrix, n: number) => {
    if (m1.m != m1.n)
        throw new TypeError(`Matrix power can't be computed because of its dimensions: ${m1.m} != ${m1.n}.`);
    const type = m1.matrix[0][0].name;
    let matrix = matrixId(type, m1.m);
    for (let k = 0; k < n; k++)
        matrix = matrixProduct(matrix, m1);
    return matrix;
};

export const matrixPrint = (m1: Matrix): JSX.Element => {
    const type = m1.matrix[0][0].name;
    return (
        <div className = "matrix-body">
            {m1.matrix.map(row =>
                <div className = "matrix-row">
                    {row.map(cell => <div className = "matrix-cell">{complexPrint(cell)}</div>)}
                </div>
            )}
        </div>
    )
}