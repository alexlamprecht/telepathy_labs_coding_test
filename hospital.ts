enum WardStatus {
  empty = 0,
  uninfected = 1,
  infected = 2,
}

type WardIndex = [number, number];

const directions: [number, number][] = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

class Ward {
  status: WardStatus;
  neighbors: Ward[];

  constructor(status: WardStatus) {
    this.status = status;
    this.neighbors = [];
  }

  addNeighbor = (ward: Ward) => {
    this.neighbors.push(ward);
  };
}

class WardGraph {
  wards: Map<string, Ward> = new Map();
  constructor() {}

  addWard = (index: WardIndex, status?: WardStatus): Ward => {
    let ward = this.wards.get(JSON.stringify(index));
    if (ward) return ward;

    if (!status) throw new Error("new node requires a status");
    ward = new Ward(status);
    this.wards.set(JSON.stringify(index), ward);
    return ward;
  };

  getWard = (index: WardIndex): Ward | undefined => {
    return this.wards.get(JSON.stringify(index));
  };

  addEdge = (source: WardIndex, destination: WardIndex): void => {
    const sourceNode = this.getWard(source);
    const destinationNode = this.getWard(destination);
    if (sourceNode && destinationNode) {
      if (sourceNode.status === WardStatus.uninfected)
        sourceNode.addNeighbor(destinationNode);
      if (destinationNode.status === WardStatus.uninfected)
        destinationNode.addNeighbor(sourceNode);
    }
  };
}

export class Hospital {
  private input: string[];
  private m: number;
  private n: number;
  private wardMatrix: WardStatus[][];
  //     private wardSets: { infected: Set<WardIndex>; uninfected: Set<WardIndex> };
  wardGraph: WardGraph = new WardGraph();

  constructor(input: string[]) {
    this.input = input;
    const { m, n, wardMatrix } = this.parseInput(input);
    this.m = m;
    this.n = n;
    this.wardMatrix = wardMatrix;
    // this.wardSets = this.generateWardSets();
    this.generateWardGraph();
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

  generateWardGraph = () => {
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.wardMatrix[i][j] !== WardStatus.empty)
          this.wardGraph.addWard([i, j], this.wardMatrix[i][j]);
      }
    }

    this.wardGraph.wards.forEach((_, index) => {
      const parsedIndex = JSON.parse(index);
      directions.forEach((direction) => {
        let neighborIndex: WardIndex = [
          parsedIndex[0] + direction[0],
          parsedIndex[1] + direction[1],
        ];

        this.wardGraph.addEdge(parsedIndex, neighborIndex);
      });
    });
  };
}

//   generateWardSets = () => {
//     let infected: Set<Ward> = new Set(),
//       uninfected: Set<Ward> = new Set();
//     for (let i = 0; i < this.m; i++) {
//       for (let j = 0; j < this.n; j++) {
//         if (this.wardMatrix[i][j] === WardStatus.infected) infected.add([i, j]);
//         if (this.wardMatrix[i][j] === WardStatus.uninfected)
//           uninfected.add([i, j]);
//       }
//     }
//     return { infected, uninfected };
//   };

//   nextInfectionStep = () => {
//     let newlyInfected: Set<Ward> = new Set();
//     this.wardSets.uninfected.forEach((ward) => {
//       console.log(this.wardSets.infected);
//       directions.forEach((direction) => {
//         if (
//           !(
//             ward[0] + direction[0] < 0 ||
//             ward[0] + direction[0] >= this.m ||
//             ward[1] + direction[1] < 0 ||
//             ward[1] + direction[1] >= this.n
//           )
//         ) {
//           let testWard: Ward = [ward[0] + direction[0], ward[1] + direction[1]];

//           if (this.wardSets.infected.has(testWard)) {
//             console.log("success", testWard);
//           } else {
//             console.log("fail", testWard);
//           }
//         }
//       });
//     });
//   };

//   calculateMaximumTime = () => {
//     this.nextInfectionStep();
//     // while (true) {
//     return "test";
//     // }
//   };
// }
