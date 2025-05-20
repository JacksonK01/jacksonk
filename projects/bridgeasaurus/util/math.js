
//NOT FOR VECTORS
export function matrixMultiply(A, B) {
    let columnLength = A[0].length
    let rowLength = B.length;

    //Amount of Columns of A have to equal amount of rows for B
    if(columnLength !== rowLength) {
        throw new TypeError(`Column of ${A} not equal to row of ${B}`)
    }

    let AB = []
    AB.length = A.length

    //Depth for how far k goes in each row or column
    let depth = A[0].length;

    for(let i = 0; i < AB.length; i++) {
        AB[i] = []
        AB[i].length = B[0].length;
        for(let j = 0; j < AB[0].length; j++) {
            if(isNaN(AB[i][j])) {
                AB[i][j] = 0;
            }
            for(let k = 0; k < depth; k++) {
                AB[i][j] += A[i][k] * B[k][j]
            }
        }
    }

    return AB;
}

// let A = [[1, 4, -2], [3, 5, -6]]
// let B = [[5, 2, 8, -1], [3, 6, 4, 5], [-2, 9, 7, -3]]
//
// console.log(matrixMultiply(A, B))
// //Expect [ [ 21, 8, 10, 25 ], [ 42, -18, 2, 40 ] ]