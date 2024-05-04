const matchers = require("jest-extended");

expect.extend(matchers);

jest
    .useFakeTimers(
        {
            doNotFake: ["setTimeout"],
            now: new Date("12/31/2023")
        }
    );