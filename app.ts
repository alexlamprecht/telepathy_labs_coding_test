import { Hospital } from "./hospital";
var fs = require("fs");

// read the input string from the file input.txt
var input = fs.readFileSync("./input.txt", "utf-8");

console.log("input");
console.table(input);

const hospital = new Hospital(input.split("\n"));

console.log("\nresult");
console.log(hospital.getTimeUntilAllAreInfected().toString());
