enum WardStatus {
  empty = 0,
  uninfected = 1,
  infected = 2,
}

export class Hospital {
  input: string[];
  m: number;
  n: number;
  wardMatrix: WardStatus[][];

  constructor(input: string[]) {
    this.input = input;
    const { m, n, wardMatrix } = this.parseInput(input);
    this.m = m;
    this.n = n;
    this.wardMatrix = wardMatrix;
  }

  parseInput = (
    input: string[]
  ): { m: number; n: number; wardMatrix: WardStatus[][] } => {
    const out = input[0].split(" ");
    const { m, n } = { m: parseInt(out[0]), n: parseInt(out[1]) };

    let wardMatrix: WardStatus[][] = [];

    for (let i = 1; i < m + 1; i++) {
      wardMatrix[i] = input[i].split(" ").map((val) => {
        return parseInt(val);
      });
    }
    return { m, n, wardMatrix };
  };

  calculateMaximumTime = () => {};
}
