import { Hospital } from "./hospital";
import { WardGraph } from "./wardGraph";

describe("Hospital", () => {
  describe("parseInput", () => {
    it("should parse input and return the correct values", async () => {
      const inputStringArray = ["3 5", "0 1 0 2 1", "1 1 1 1 1", "1 0 0 2 1"];
      const testM = 3;
      const testN = 5;
      const testWardMatrix = [
        [0, 1, 0, 2, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 2, 1],
      ];

      const hospital = new Hospital(inputStringArray);
      expect(hospital).toBeInstanceOf(Hospital);
      expect(hospital.m).toStrictEqual(testM);
      expect(hospital.n).toStrictEqual(testN);
      expect(hospital.wardMatrix).toStrictEqual(testWardMatrix);
    });
  });

  describe("generateWardGraph", () => {
    it("should generate a proper wardGraph", async () => {
      const inputStringArray = ["3 2", "2 1", "1 1", "1 0"];

      const hospital = new Hospital(inputStringArray);

      const testWardInfected = hospital.wardGraph.getWard([0, 0]);
      const testWardUninfected = hospital.wardGraph.getWard([1, 1]);
      const testWardEmpty = hospital.wardGraph.getWard([2, 1]);

      expect(hospital.wardGraph).toBeInstanceOf(WardGraph);

      expect(testWardInfected?.status).toStrictEqual(2);
      expect(testWardUninfected?.status).toStrictEqual(1);
      expect(testWardEmpty?.status).toBeUndefined();

      expect(testWardInfected?.neighbors).toStrictEqual([]);
      expect(testWardUninfected?.neighbors).toStrictEqual([
        [0, 1],
        [1, 0],
      ]);
    });
  });

  describe("getTimeUntilAllAreInfected", () => {
    it("should return the correct value", async () => {
      const inputStringArray = ["3 5", "2 1 0 2 1", "1 1 1 1 1", "1 0 0 2 1"];

      const hospital = new Hospital(inputStringArray);

      const timeUntilAllAreInfected = hospital.getTimeUntilAllAreInfected();
      expect(timeUntilAllAreInfected).toEqual(2);
    });
    it("should return the correct value", async () => {
      const inputStringArray = ["3 5", "0 1 0 2 1", "1 1 1 1 1", "1 0 0 2 1"];

      const hospital = new Hospital(inputStringArray);

      const timeUntilAllAreInfected = hospital.getTimeUntilAllAreInfected();
      expect(timeUntilAllAreInfected).toEqual(5);
    });

    it("should return the correct value", async () => {
      const inputStringArray = ["3 5", "0 1 0 2 1", "1 1 0 1 1", "1 0 0 2 1"];

      const hospital = new Hospital(inputStringArray);

      const timeUntilAllAreInfected = hospital.getTimeUntilAllAreInfected();
      expect(timeUntilAllAreInfected).toEqual(-1);
    });
  });
});
