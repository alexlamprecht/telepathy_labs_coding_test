import { Hospital } from "./hospital";

const input = ["3 5", "2 1 0 2 1", "1 1 1 1 1", "1 0 0 2 1"];

const hospital = new Hospital(input);

console.log(hospital.calculateMaximumTime());
