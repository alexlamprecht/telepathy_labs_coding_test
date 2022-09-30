import { WardIndex, WardStatus } from "./models";

class Ward {
  status: WardStatus;
  neighbors: WardIndex[];

  constructor(status: WardStatus) {
    this.status = status;
    this.neighbors = [];
  }

  addNeighbor = (ward: WardIndex) => {
    const valueExists = this.neighbors.filter(
      (n) => JSON.stringify(n) == JSON.stringify(ward)
    );
    if (!valueExists.length) {
      this.neighbors.push(ward);
    }
  };
}

export class WardGraph {
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
        sourceNode.addNeighbor(destination);
      if (destinationNode.status === WardStatus.uninfected)
        destinationNode.addNeighbor(source);
    }
  };

  breadthFirstSearch = (
    index: WardIndex,
    visited: Set<string> = new Set()
  ): number => {
    const queue: [WardIndex, number][] = [];

    queue.push([index, 0]);
    let minDistance = 0;
    let foundInfected = false;
    while (queue) {
      const currentIndex = queue.shift();
      if (!currentIndex) break;
      if (visited.has(JSON.stringify(currentIndex[0]))) continue;
      if (this.getWard(currentIndex[0])?.status === WardStatus.infected) {
        minDistance = currentIndex[1];
        foundInfected = true;
        break;
      }

      visited.add(JSON.stringify(currentIndex[0]));
      this.getWard(currentIndex[0])?.neighbors.forEach((neighbor) => {
        if (!visited.has(JSON.stringify(neighbor))) {
          queue.push([neighbor, currentIndex[1] + 1]);
        }
      });
    }

    return foundInfected ? minDistance : -1;
  };

  getMaxDistanceFromInfected = () => {
    let max = 0;
    for (const [index, ward] of this.wards.entries()) {
      const parsedIndex = JSON.parse(index);
      if (ward.status === WardStatus.uninfected) {
        const result = this.breadthFirstSearch(parsedIndex);

        if (result === -1) return -1;
        max = Math.max(result, max);
      }
    }

    return max;
  };
}
