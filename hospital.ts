import { WardIndex, WardStatus } from "./models";
import { WardGraph } from "./wardGraph";

export class Hospital {
  private m: number;
  private n: number;
  private wardMatrix: WardStatus[][];
  private wardGraph: WardGraph = new WardGraph();

  constructor(input: string[]) {
    const { m, n, wardMatrix } = this.parseInput(input);
    this.m = m;
    this.n = n;
    this.wardMatrix = wardMatrix;

    this.generateWardGraph();
  }

  private parseInput = (
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

  private generateWardGraph = () => {
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.wardMatrix[i][j] !== WardStatus.empty)
          this.wardGraph.addWard([i, j], this.wardMatrix[i][j]);
      }
    }

    this.wardGraph.wards.forEach((_, index) => {
      const parsedIndex = JSON.parse(index);
      const directions: [number, number][] = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
      ];
      directions.forEach((direction) => {
        let neighborIndex: WardIndex = [
          parsedIndex[0] + direction[0],
          parsedIndex[1] + direction[1],
        ];

        this.wardGraph.addEdge(parsedIndex, neighborIndex);
      });
    });
  };

  getTimeUntilAllAreInfected = (): number => {
    return this.wardGraph.getMaxDistanceFromInfected();
  };
}
