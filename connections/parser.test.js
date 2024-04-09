const { getConnectionsId, getResult } = require("./parser");

describe("Connections parser", () => {

    test("Parse id", () => {
        expect(getConnectionsId("Connections\nPuzzle #123")).toBe(123);
        expect(getConnectionsId("text before\nConnections\nPuzzle #123")).toBe(123);
        expect(getConnectionsId("Connections\nPuzzle #1,234")).toBe(1234);
        expect(getConnectionsId("Connections\nPuzzle #1 234")).toBe(1234);
    });

    test("Parse mistakes (4/fail)", () => {
        const input =
            ":large_yellow_square::large_blue_square::large_yellow_square::large_yellow_square:\n" +
            ":large_yellow_square::large_yellow_square::large_yellow_square::large_yellow_square:\n" +
            ":large_green_square::large_purple_square::large_blue_square::large_green_square:\n" +
            ":large_green_square::large_purple_square::large_green_square::large_green_square:\n" +
            ":large_green_square::large_green_square::large_green_square::large_green_square:\n" +
            ":large_green_square::large_purple_square::large_blue_square::large_green_square:";

        expect(getResult(input)).toBe(4);
    });

    test("Parse mistakes (2)", () => {
        const input =
            ":large_green_square::large_yellow_square::large_blue_square::large_purple_square:" +
            ":large_green_square::large_green_square::large_green_square::large_green_square:" +
            ":large_yellow_square::large_yellow_square::large_yellow_square::large_yellow_square:" +
            ":large_blue_square::large_purple_square::large_blue_square::large_blue_square:" +
            ":large_blue_square::large_blue_square::large_blue_square::large_blue_square:" +
            ":large_purple_square::large_purple_square::large_purple_square::large_purple_square:";

        expect(getResult(input)).toBe(2);
    });

    test("Parse mistakes (0)", () => {
        const input =
            ":large_yellow_square::large_yellow_square::large_yellow_square::large_yellow_square:" +
            ":large_green_square::large_green_square::large_green_square::large_green_square:" +
            ":large_blue_square::large_blue_square::large_blue_square::large_blue_square:" +
            ":large_purple_square::large_purple_square::large_purple_square::large_purple_square:";

        expect(getResult(input)).toBe(0);
    });

    test("Ignore incomplete input", () => {
        const input =
            ":large_yellow_square::large_blue_square::large_yellow_square::large_yellow_square:\n" +
            ":large_yellow_square::large_yellow_square::large_yellow_square::large_yellow_square:\n" +
            ":large_green_square::large_purple_square::large_blue_square::large_green_square:\n" +
            ":large_green_square::large_green_square::large_green_square::large_green_square:\n" +
            ":large_green_square::large_purple_square::large_blue_square::large_green_square:";

        expect(getResult(input)).toBeNull();
    });

});