const { getDate, getResultingTime } = require("./parser");

describe("The Mini parser", () => {

    test("Parse date", () => {
        expect(getDate("I solved the 12/10/2024 New York Times Mini Crossword in 0:56")).toEqual(new Date("2024-12-10"));
    });

    test("Parse result", () => {
        expect(getResultingTime("I solved the 4/10/2024 New York Times Mini Crossword in 1:38")).toBe(98);
    });

});