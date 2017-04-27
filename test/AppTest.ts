import {equal} from  "assert";
import {hello} from "../src/App";

describe("The applications hello function", () => {

    it("should return the correct string", () => {
        let res: string = hello("World");

        equal(res, "Hello World");
    });
});