import { WardGraph } from "./wardGraph";

describe("WardGraph", () => {
  let testWardGraph: WardGraph;
  beforeEach(() => {
    testWardGraph = new WardGraph();
  });
  describe("addWard,getWard", () => {
    it("should add a ward properly and then successfully get it", async () => {
      testWardGraph.addWard([0, 0], 1);

      const testWard = testWardGraph.getWard([0, 0]);

      expect(testWard?.status).toEqual(1);
      expect(testWard?.neighbors).toEqual([]);
    });
    it("should throw an error if a ward has no status", async () => {
      try {
        testWardGraph.addWard([0, 0]);
      } catch (error) {
        expect(error).toEqual(new Error("new node requires a status"));
      }
    });
  });

  describe("addEdge", () => {
    it("should add an edge between two wards properly", async () => {
      testWardGraph.addWard([0, 0], 1);
      testWardGraph.addWard([1, 1], 2);

      testWardGraph.addEdge([0, 0], [1, 1]);

      const testWardUninfected = testWardGraph.getWard([0, 0]);
      const testWardInfected = testWardGraph.getWard([1, 1]);

      expect(testWardUninfected?.status).toEqual(1);
      expect(testWardInfected?.status).toEqual(2);

      expect(testWardUninfected?.neighbors).toEqual([[1, 1]]);
      expect(testWardInfected?.neighbors).toEqual([]);
    });
  });

  describe("getMaxDistanceFromInfected", () => {
    it("return the correct value", async () => {
      testWardGraph.addWard([0, 0], 1);
      testWardGraph.addWard([1, 1], 2);

      testWardGraph.addEdge([0, 0], [1, 1]);

      const maxDistanceFromInfected =
        testWardGraph.getMaxDistanceFromInfected();

      expect(maxDistanceFromInfected).toEqual(1);
    });
    it("return the correct value", async () => {
      testWardGraph.addWard([0, 0], 1);
      testWardGraph.addWard([1, 1], 1);
      testWardGraph.addWard([2, 2], 2);

      testWardGraph.addEdge([0, 0], [1, 1]);
      testWardGraph.addEdge([1, 1], [2, 2]);

      const maxDistanceFromInfected =
        testWardGraph.getMaxDistanceFromInfected();

      expect(maxDistanceFromInfected).toEqual(2);
    });
  });
});
