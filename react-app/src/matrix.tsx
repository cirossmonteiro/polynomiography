import { Complex, complexSum, complexProduct } from "./complex";
import { zeros } from "./utils";

export class Matrix {

    name: string = 'Matrix';
    matrix: any[][];
    m: number;
    n: number;

    constructor(type: string, m: number, n: number) {
        if (type == 'Complex')
            this.matrix = zeros(m).map(() => zeros(n).map(() => new Complex(0,0)));
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
        throw TypeError("Matrices can't be multiplied because of their dimensios.");
    const type = m1.matrix[0][0].name;
    let matrix = new Matrix(type, m1.m, m2.n);
    for (let i = 0; i < m1.m; i++)
        for (let j = 0; j < m2.n; j++)
            for (let k = 0; k < m1.n; k++)
                if (type == 'Complex')
                    matrix.matrix[i][j] = complexSum(matrix.matrix[i][j],
                        complexProduct(matrix.matrix[i][k],matrix.matrix[k][j]));
    return matrix;
};

export const matrixIntPow = (m1: Matrix, n: number) => {
    if (m1.m != m1.n)
        throw new TypeError("Matrix power can't be computed because of its dimensions.");
    const type = m1.matrix[0][0].name;
    let matrix = matrixId(type, n);
    for (let k = 0; k < n; k++)
        matrix = matrixProduct(matrix, m1);
    return matrix;
};

export const matrixPrint = (m1: Matrix) => {
    const type = m1.matrix[0][0].name;
    const printCell = (cell: Complex) => `${cell.a}+${cell.b}i`;
    return (
        <div className = "matrix">
            {m1.matrix.map(row =>
                <div className = "row">
                    {row.map(cell => <div className = "cell">{printCell(cell)}</div>)}
                </div>
            )}
        </div>
    )
}