const { getDate, getResultingTime } = require("./parser");

describe("The Crossword parser", () => {

    test("Parse date", () => {
        expect(getDate("I solved the Sunday 3/02/2024 New York Times Daily Crossword in 2:21:39!")).toEqual(new Date("2024-03-02"));
    });

    test("Parse result", () => {
        expect(getResultingTime("I solved the Sunday 3/03/2024 New York Times Daily Crossword in 49:33!")).toBe(2973);
        expect(getResultingTime("I solved the Sunday 3/03/2024 New York Times Daily Crossword in 0:49:33!")).toBe(2973);
        expect(getResultingTime("I solved the Sunday 3/03/2024 New York Times Daily Crossword in 2:21:39!")).toBe(8499);
    });

});