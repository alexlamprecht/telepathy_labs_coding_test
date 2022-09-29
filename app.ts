import { Hospital } from "./hospital";

const direction = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1],
];

const input = ["3 5", "2 1 0 2 1", "1 1 1 1 1", "1 0 0 2 1"];

const hospital = new Hospital(input);
