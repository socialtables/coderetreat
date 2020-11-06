import {
  parser,
  stringToNumber,
  countLiveNeighbors,
  computeNextState,
  serializer,
} from '../src/life';

describe('stringToNumber', () => {
  it('does what it says', () => {
    expect(stringToNumber('.')).toEqual(0);
    expect(stringToNumber('*')).toEqual(1);
  });
});

const startExample1 = `........
....*...
...**...
.....*..`;

const nextExample1 = `........
...**...
...***..
....*...`;

const parsedStartExample1 = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
];

const startExample2 = `........
...**...
.*****..
........
........`;

const nextExample2 = `........
.....*..
..*..*..
..***...
........`;

const parsedNextExample2 = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

describe('parsing input or something', () => {
  it('parses input', () => {
    expect(parser(startExample1)).toEqual(parsedStartExample1);
  });

  it('parses input', () => {
    expect(parser(nextExample2)).toEqual(parsedNextExample2);
  });
});

describe('format visualization', () => {
  it('serializes state array for example 1', () => {
    expect(serializer(parsedStartExample1)).toEqual(startExample1);
  });

  it('serializes state array for example 2', () => {
    expect(serializer(parsedNextExample2)).toEqual(nextExample2);
  });
});

describe('game of life stuff', () => {
  it('compute next state', () => {
    expect(computeNextState(startExample1)).toEqual(nextExample1);
  });
});

describe('game of life stuff', () => {
  it('compute next state', () => {
    expect(computeNextState(startExample2)).toEqual(nextExample2);
  });
});

describe('countLiveNeighbors', () => {
  it('should return 3 if 3 live neighbors', () => {
    expect(countLiveNeighbors(parsedStartExample1, 1, 3)).toEqual(3);
  });

  it('should return 1 if 1 live neighbor', () => {
    expect(countLiveNeighbors(parsedStartExample1, 0, 3)).toEqual(1);
  });

  it('should return 0 if no live neighbors', () => {
    expect(countLiveNeighbors(parsedStartExample1, 0, 0)).toEqual(0);
  });

  it('should return 0 if no live neighbors', () => {
    expect(countLiveNeighbors(parsedStartExample1, 1, 1)).toEqual(0);
  });
});

const blockExample = `........
...**...
...**...
........`;

describe('Block still life', () => {
  it('compute next state', () => {
    expect(computeNextState(blockExample)).toEqual(blockExample);
  });
});

const blinkerVertical = `........
....*...
....*...
....*...`;

const blinkerHorizontal = `........
........
...***..
........`;

describe('Blinker oscillator', () => {
  it('compute next state', () => {
    expect(computeNextState(blinkerVertical)).toEqual(blinkerHorizontal);
  });
});
