# Telepathy Labs Coding Test

## Task

There is a virus spreading at the General Hospital. The hospital has an array of M x N wards, where M is the number of rows and N the number of columns. Each ward can be empty or have multiple patients.
Each cell in the matrix can have a value of 0, 1 or 2 with the following meaning:

    0. The ward is empty
    1. The ward has uninfected patients
    2. The ward has infected patients

The infection can spread from an infected ward to an uninfected one only **up**, **down**, **left** and **right** in the matrix of wards during one unit of time. Empty wards cannot propagate the infection. Develop a program to help determine the minimum units of time after which all patients will be infected at the hospital. If all patients are not infected after an infinite amount of time, then return –1.

The input to the program is a string with the following format:

    M N
    <ward matrix>

For example, given the following input:

    3 5
    2 1 0 2 1
    1 1 1 1 1
    1 0 0 2 1

The output would be 2 units of time.

The size of the input matrix is at most 1000 x 1000

# Solution

Since in each time step all uninfected neighbors to an infected ward are infected the answer to the question `what are minimum units of time after which all patients will be infected` is simply translated to `how far away is the furthest uninfected ward from an infected one`.

Therefore the hospital can be represented in a graph, where the nodes are wards, and the edges represent if wards are neighbors.
Then a breadth-first-search algorithm can be used to determine the minimum distance from each uninfected ward to an infected one.
The maximum value out off those minimum distances is the result.

## Runtime complexity

    lorem

# Installation

Clone the repo to your local machine.

## install

make sure you have node and npm installed.

run `npm install` to install required node packages.

## run

run `npm run start` to run the script.
