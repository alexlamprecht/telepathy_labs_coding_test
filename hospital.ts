enum WardStatus {
  empty = 0,
  uninfected = 1,
  infected = 2,
}

type Ward = [number, number];

const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

export class Hospital {
  private input: string[];
  private m: number;
  private n: number;
  private wardMatrix: WardStatus[][];
  private wardSets: { infected: Set<Ward>; uninfected: Set<Ward> };

  constructor(input: string[]) {
    this.input = input;
    const { m, n, wardMatrix } = this.parseInput(input);
    this.m = m;
    this.n = n;
    this.wardMatrix = wardMatrix;
    this.wardSets = this.generateWardSets();
    // console.log(this.wardMatrix);
    console.log(this.wardSets);
  }

  parseInput = (
    input: string[]
  ): { m: number; n: number; wardMatrix: WardStatus[][] } => {
    const out = input[0].split(" ");
    const { m, n } = { m: parseInt(out[0]), n: parseInt(out[1]) };

    let wardMatrix: WardStatus[][] = [];

    for (let i = 1; i < m + 1; i++) {
      wardMatrix[i - 1] = input[i].split(" ").map((val) => {
        return parseInt(val);
      });
    }
    return { m, n, wardMatrix };
  };

  generateWardSets = () => {
    let infected: Set<Ward> = new Set(),
      uninfected: Set<Ward> = new Set();
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.wardMatrix[i][j] === WardStatus.infected) infected.add([i, j]);
        if (this.wardMatrix[i][j] === WardStatus.uninfected)
          uninfected.add([i, j]);
      }
    }
    return { infected, uninfected };
  };

  nextInfectionStep = () => {
    let newlyInfected: Set<Ward> = new Set();
    this.wardSets.uninfected.forEach((ward) => {
      console.log(this.wardSets.infected);
      directions.forEach((direction) => {
        if (
          !(
            ward[0] + direction[0] < 0 ||
            ward[0] + direction[0] >= this.m ||
            ward[1] + direction[1] < 0 ||
            ward[1] + direction[1] >= this.n
          )
        ) {
          let testWard: Ward = [ward[0] + direction[0], ward[1] + direction[1]];

          if (this.wardSets.infected.has(testWard)) {
            console.log("success", testWard);
          } else {
            console.log("fail", testWard);
          }
        }
      });
    });
  };

  calculateMaximumTime = () => {
    this.nextInfectionStep();
    // while (true) {
    return "test";
    // }
  };
}
