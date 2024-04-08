const { getWordleId, getResult } = require("./parser");

describe("Wordle parser", () => {

    test("Parse id", () => {
        expect(getWordleId("Wordle 22 2/6\n")).toBe(22);
        expect(getWordleId("text before Wordle 123 4/6*")).toBe(123);
        expect(getWordleId("Wordle 1 234 X/6\n")).toBe(1234);
        expect(getWordleId("Wordle 1,234 6/6\n")).toBe(1234);
    });

    test("Parse score", () => {
        const input =
            ":black_large_square::black_large_square::large_yellow_square::large_green_square::black_large_square:\n" +
            ":black_large_square::large_green_square::black_large_square::large_green_square::large_green_square:\n" +
            ":black_large_square::large_green_square::white_square::large_green_square::large_green_square:\n" +
            ":large_green_square::large_green_square::large_green_square::large_green_square::large_green_square:";

        expect(getResult(input)).toBe(4);
    });

    test("Count failing as 7", () => {
        const input =
            ":black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:\n" +
            ":black_large_square::black_large_square::large_yellow_square::large_green_square::black_large_square:\n" +
            ":black_large_square::large_green_square::black_large_square::black_large_square::large_yellow_square:\n" +
            ":black_large_square::large_green_square::black_large_square::large_green_square::large_green_square:\n" +
            ":black_large_square::large_green_square::white_square::large_green_square::large_green_square:\n" +
            ":black_large_square::large_green_square::large_green_square::large_green_square::large_green_square:";

        expect(getResult(input)).toBe(7);
    });

    test("Ignore too many emojis", () => {
        const input =
            ":black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:\n" +
            ":black_large_square::black_large_square::large_yellow_square::large_green_square::black_large_square:\n" +
            ":black_large_square::large_green_square::black_large_square::black_large_square::large_yellow_square:\n" +
            ":black_large_square::large_green_square::black_large_square::large_green_square::large_green_square:\n" +
            ":black_large_square::large_green_square::white_square::large_green_square::large_green_square:\n" +
            ":large_green_square::large_green_square::black_large_square::large_green_square::large_green_square:\n" +
            ":large_green_square::large_green_square::large_green_square::large_green_square::large_green_square:";

        expect(getResult(input)).toBeNull();
    });

    test("Ignore incomplete input", () => {
        const input =
            ":black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:\n" +
            ":black_large_square::black_large_square::large_yellow_square::large_green_square::black_large_square:\n" +
            ":black_large_square::large_green_square::black_large_square::black_large_square::large_yellow_square:\n";

        expect(getResult(input)).toBeNull();
    });

    test("Ignore invalid input", () => {
        const input = "Not a valid wordle result";
        expect(getResult(input)).toBeNull();
    });

});