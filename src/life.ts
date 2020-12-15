export const stringToNumber = (cellValue: CellValue): number =>
  cellValue === '*' ? 1 : 0;

export function parser(input: string): number[][] {
  const hold = input.split('\n').map((row) =>
    row
      .trim()
      .split('')
      .map((cell) => stringToNumber(cell as CellValue))
  );

  // console.log('!!! ', hold)

  return hold;
}

export function serializer(input: number[][]): any {
  return input
    .map((row) => {
      return row.map((cell) => (cell == 1 ? '*' : '.')).join('');
    })
    .join('\n');
}

export function computeNextState(input: string): number[][] {
  const grid = parser(input);
  const output: number[][] = [];
  const dims: Dimensions = {width: grid[0].length, height: grid.length};
  for (let row = 0; row < dims.height; ++row) {
    output[row] = [];
    for (let col = 0; col < dims.width; ++col) {
      let liveNeighbors = countLiveNeighbors(grid, row, col);
      let iAmAlive = grid[row][col] == 1;
      if (iAmAlive) {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          output[row][col] = 0;
        } else {
          output[row][col] = 1;
        }
      } else {
        if (liveNeighbors === 3) {
          output[row][col] = 1;
        } else {
          output[row][col] = 0;
        }
      }
    }
  }
  return serializer(output);
}

// check all eight neighbors, if in bounds.
export function countLiveNeighbors(
  input: number[][],
  row: number,
  col: number
): number {
  let liveNeighbors = 0;
  for (let x = col - 1; x <= col + 1; x++) {
    for (let y = row - 1; y <= row + 1; y++) {
      if (x == col && y == row) continue;
      liveNeighbors += input[y]?.[x] || 0;
    }
  }

  return liveNeighbors;
}
