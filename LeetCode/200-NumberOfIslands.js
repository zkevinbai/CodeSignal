/*
200. Number of Islands
Medium

8008

241

Add to List

Share
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.



Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3


Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
*/

/*
solution

key is that you cannot get from one island to another

navigate from the first 1 we see, going right and down if those are 1s 
check for duplicates using a visited object
keep going using a queue / BFS 
count that as 1 island

dont count previously seen 1's as they are already part of an island
*/

const numIslands = (grid) => {
    let islandCount = 0;

    const bfsTraversal = (i, j) => {
        let q = [[i, j]];
        while (q.length) {
            let [x, y] = q.shift();
            grid[x][y] = 0;

            for (let [newX, newY] of [[x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1]]) {
                if (
                    newX >= 0 &&
                    newX < grid.length &&
                    newY >= 0 &&
                    newY < grid[0].length &&
                    grid[newX][newY] === '1'
                ) {
                    q.push([newX, newY]);
                }
            }
        }
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const value = grid[i][j];

            if (value === '1') {
                bfsTraversal(i, j);
                islandCount += 1;
            }
        }
    }

    // console.log(grid)

    return islandCount;
};


// const numIslands = (grid) => {
//     let islandCount = 0;

//     const bfsTraversal = (i, j) => {
//         const queue = [[i, j]];

//         while (queue.length) {
//             const shift = queue.shift();
//             const shiftI = shift[0];
//             const shiftJ = shift[1];
//             grid[shiftI][shiftJ] = "0";

//             let newI = shiftI;
//             let newJ = shiftJ;

//             // down
//             if (shiftI !== grid.length - 1) {
//                 newI = shiftI + 1;
//                 newJ = shiftJ;
//                 const down = grid[newI][newJ];
//                 if (down === '1') queue.push([newI, newJ]);
//             }

//             // up
//             if (shiftI !== 0) {
//                 newI = shiftI - 1;
//                 newJ = shiftJ;
//                 const up = grid[newI][newJ];
//                 if (up === '1') queue.push([newI, newJ]);
//             }

//             // right
//             if (shiftJ !== grid[i].length - 1) {
//                 newI = shiftI;
//                 newJ = shiftJ + 1;
//                 const right = grid[newI][newJ];
//                 if (right === '1') queue.push([newI, newJ]);
//             }

//             // left
//             if (shiftJ !== 0) {
//                 newI = shiftI;
//                 newJ = shiftJ - 1;
//                 const left = grid[newI][newJ];
//                 if (left === '1') queue.push([newI, newJ]);
//             }
//         }
//     }

//     for (let i = 0; i < grid.length; i++) {
//         for (let j = 0; j < grid[i].length; j++) {
//             const value = grid[i][j];
        
//             if (value === '1') {
//                 bfsTraversal(i, j);
//                 islandCount += 1;
//             }
//         }
//     }

//     return islandCount;
// };

/*
edge case 1,
a jump
[
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
]

input
[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]

edge case 2
borders
[
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
]

input
[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]

edge case 3
need to go left
[
    ["1","1","1"],
    ["0","1","0"],
    ["1","1","1"]
]

[["1","1","1"],["0","1","0"],["1","1","1"]]

edge case 4
need to go up
[
    ["1","0","1","1","1"],
    ["1","0","1","0","1"],
    ["1","1","1","0","1"]
]

edge case 5
[
    ["1","0","0","1","1","1","0","1","1","0","0","0","0","0","0","0","0","0","0","0"],
    ["1","0","0","1","1","0","0","1","0","0","0","1","0","1","0","1","0","0","1","0"],
    ["0","0","0","1","1","1","1","0","1","0","1","1","0","0","0","0","1","0","1","0"],
    ["0","0","0","1","1","0","0","1","0","0","0","1","1","1","0","0","1","0","0","1"],
    ["0","0","0","0","0","0","0","1","1","1","0","0","0","0","0","0","0","0","0","0"],
    ["1","0","0","0","0","1","0","1","0","1","1","0","0","0","0","0","0","1","0","1"],
    ["0","0","0","1","0","0","0","1","0","1","0","1","0","1","0","1","0","1","0","1"],
    ["0","0","0","1","0","1","0","0","1","1","0","1","0","1","1","0","1","1","1","0"],
    ["0","0","0","0","1","0","0","1","1","0","0","0","0","1","0","0","0","1","0","1"],
    ["0","0","1","0","0","1","0","0","0","0","0","1","0","0","1","0","0","0","1","0"],
    ["1","0","0","1","0","0","0","0","0","0","0","1","0","0","1","0","1","0","1","0"],
    ["0","1","0","0","0","1","0","1","0","1","1","0","1","1","1","0","1","1","0","0"],
    ["1","1","0","1","0","0","0","0","1","0","0","0","0","0","0","1","0","0","0","1"],
    ["0","1","0","0","1","1","1","0","0","0","1","1","1","1","1","0","1","0","0","0"],
    ["0","0","1","1","1","0","0","0","1","1","0","0","0","1","0","1","0","0","0","0"],
    ["1","0","0","1","0","1","0","0","0","0","1","0","0","0","1","0","1","0","1","1"],
    ["1","0","1","0","0","0","0","0","0","1","0","0","0","1","0","1","0","0","0","0"],
    ["0","1","1","0","0","0","1","1","1","0","1","0","1","0","1","1","1","1","0","0"],
    ["0","1","0","0","0","0","1","1","0","0","1","0","1","0","0","1","0","0","1","1"],
    ["0","0","0","0","0","0","1","1","1","1","0","1","0","0","0","1","1","0","0","0"]
]

[["1","0","0","1","1","1","0","1","1","0","0","0","0","0","0","0","0","0","0","0"],["1","0","0","1","1","0","0","1","0","0","0","1","0","1","0","1","0","0","1","0"],["0","0","0","1","1","1","1","0","1","0","1","1","0","0","0","0","1","0","1","0"],["0","0","0","1","1","0","0","1","0","0","0","1","1","1","0","0","1","0","0","1"],["0","0","0","0","0","0","0","1","1","1","0","0","0","0","0","0","0","0","0","0"],["1","0","0","0","0","1","0","1","0","1","1","0","0","0","0","0","0","1","0","1"],["0","0","0","1","0","0","0","1","0","1","0","1","0","1","0","1","0","1","0","1"],["0","0","0","1","0","1","0","0","1","1","0","1","0","1","1","0","1","1","1","0"],["0","0","0","0","1","0","0","1","1","0","0","0","0","1","0","0","0","1","0","1"],["0","0","1","0","0","1","0","0","0","0","0","1","0","0","1","0","0","0","1","0"],["1","0","0","1","0","0","0","0","0","0","0","1","0","0","1","0","1","0","1","0"],["0","1","0","0","0","1","0","1","0","1","1","0","1","1","1","0","1","1","0","0"],["1","1","0","1","0","0","0","0","1","0","0","0","0","0","0","1","0","0","0","1"],["0","1","0","0","1","1","1","0","0","0","1","1","1","1","1","0","1","0","0","0"],["0","0","1","1","1","0","0","0","1","1","0","0","0","1","0","1","0","0","0","0"],["1","0","0","1","0","1","0","0","0","0","1","0","0","0","1","0","1","0","1","1"],["1","0","1","0","0","0","0","0","0","1","0","0","0","1","0","1","0","0","0","0"],["0","1","1","0","0","0","1","1","1","0","1","0","1","0","1","1","1","1","0","0"],["0","1","0","0","0","0","1","1","0","0","1","0","1","0","0","1","0","0","1","1"],["0","0","0","0","0","0","1","1","1","1","0","1","0","0","0","1","1","0","0","0"]]
*/

/*
[
    [+,o,o,+,+,+,o,+,+,o,o,o,o,o,o,o,o,o,o,o],
    [+,o,o,+,+,o,o,+,o,o,o,+,o,+,o,+,o,o,+,o],
    [o,o,o,+,+,+,+,o,+,o,+,+,o,o,o,o,+,o,+,o],
    [o,o,o,+,+,o,o,+,o,o,o,+,+,+,o,o,+,o,o,+],
    [o,o,o,o,o,o,o,+,+,+,o,o,o,o,o,o,o,o,o,o],
    [+,o,o,o,o,+,o,+,o,+,+,o,o,o,o,o,o,+,o,+],
    [o,o,o,+,o,o,o,+,o,+,o,+,o,+,o,+,o,+,o,+],
    [o,o,o,+,o,+,o,o,+,+,o,+,o,+,+,o,+,+,+,o],
    [o,o,o,o,+,o,o,+,+,o,o,o,o,+,o,o,o,+,o,+],

    [o,o,+,o,o,+,o,o,o,o,o,+,o,o,+,o,o,o,+,o],
    [+,o,o,+,o,o,o,o,o,o,o,+,o,o,+,o,+,o,+,o],
    [o,+,o,o,o,+,o,+,o,+,+,o,+,+,+,o,+,+,o,o],
    [+,+,o,+,o,o,o,o,+,o,o,o,o,o,o,+,o,o,o,+],
    [o,+,o,o,+,+,+,o,o,o,+,+,+,+,+,o,+,o,o,o],
    [o,o,+,+,+,o,o,o,+,+,o,o,o,+,o,+,o,o,o,o],
    [+,o,o,+,o,+,o,o,o,o,+,o,o,o,+,o,+,o,+,+],
    [+,o,+,o,o,o,o,o,o,+,o,o,o,+,o,+,o,o,o,o],
    [o,+,+,o,o,o,+,+,+,o,+,o,+,o,+,+,+,+,o,o],
    [o,+,o,o,o,o,+,+,o,o,+,o,+,o,o,+,o,o,+,+],
    [o,o,o,o,o,o,+,+,+,+,o,+,o,o,o,+,+,o,o,o]
]

top
[["1","0","0","1","1","1","0","1","1","0","0","0","0","0","0","0","0","0","0","0"],["1","0","0","1","1","0","0","1","0","0","0","1","0","1","0","1","0","0","1","0"],["0","0","0","1","1","1","1","0","1","0","1","1","0","0","0","0","1","0","1","0"],["0","0","0","1","1","0","0","1","0","0","0","1","1","1","0","0","1","0","0","1"],["0","0","0","0","0","0","0","1","1","1","0","0","0","0","0","0","0","0","0","0"],["1","0","0","0","0","1","0","1","0","1","1","0","0","0","0","0","0","1","0","1"],["0","0","0","1","0","0","0","1","0","1","0","1","0","1","0","1","0","1","0","1"],["0","0","0","1","0","1","0","0","1","1","0","1","0","1","1","0","1","1","1","0"],["0","0","0","0","1","0","0","1","1","0","0","0","0","1","0","0","0","1","0","1"]]
22 islands


bottom
[["0","0","1","0","0","1","0","0","0","0","0","1","0","0","1","0","0","0","1","0"],["1","0","0","1","0","0","0","0","0","0","0","1","0","0","1","0","1","0","1","0"],["0","1","0","0","0","1","0","1","0","1","1","0","1","1","1","0","1","1","0","0"],["1","1","0","1","0","0","0","0","1","0","0","0","0","0","0","1","0","0","0","1"],["0","1","0","0","1","1","1","0","0","0","1","1","1","1","1","0","1","0","0","0"],["0","0","1","1","1","0","0","0","1","1","0","0","0","1","0","1","0","0","0","0"],["1","0","0","1","0","1","0","0","0","0","1","0","0","0","1","0","1","0","1","1"],["1","0","1","0","0","0","0","0","0","1","0","0","0","1","0","1","0","0","0","0"],["0","1","1","0","0","0","1","1","1","0","1","0","1","0","1","1","1","1","0","0"],["0","1","0","0","0","0","1","1","0","0","1","0","1","0","0","1","0","0","1","1"],["0","0","0","0","0","0","1","1","1","1","0","1","0","0","0","1","1","0","0","0"]]
36 islands

22 + 36 = 58
*/