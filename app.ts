import { Hospital } from "./hospital";

// const input = ["3 5", "2 1 0 2 1", "1 1 1 1 1", "1 0 0 2 1"];
// const input = ["1 6", "1 1 2 1 0 1"];
const input = ["3 6", "2 1 1 1 0 1", "1 1 1 1 0 1", "1 1 1 1 1 1"];

const hospital = new Hospital(input);

console.log(hospital.getTimeUntilAllAreInfected());
