import "jest-extended";
import {
    ZnumMissingRequiredValue,
    ZnumMissingRequiredValueOptions
} from "../../../.src";

/**
 *
 * Test Suite for the ZnumMissingRequiredValue class.
 *
 * @group unit
 * @group errors
 * @group znum
 *
 */
describe(
    "ZnumMissingRequiredValue Unit Test Suite",
    () => {

        test(
            "that ZnumMissingRequiredValue initializes correctly when given a string",
            () => {
                // Setup
                const error: ZnumMissingRequiredValue =
                    new ZnumMissingRequiredValue("Test");

                expect(error)
                    .toMatchObject({
                        message: 'Unable to create Znum instance; Missing required field "Test"',
                        context: undefined
                    });
            }
        );

        test(
            'that ZnumMissingRequiredValue initializes correctly when given an object with "expectedValue"',
            () => {
                // Setup
                const options: ZnumMissingRequiredValueOptions = {
                    fieldName: "code",
                    expectedValue: "Znumable",
                    receivedValue: "null"
                };
                const error: ZnumMissingRequiredValue = new ZnumMissingRequiredValue(options);

                expect(error)
                    .toMatchObject({
                        message: 'Unable to create Znum instance; Missing required field "code"',
                        context: {
                            fieldName: "code",
                            expectedValue: "Znumable",
                            receivedValue: "null"
                        }
                    });
            }
        );

        test(
            'that ZnumMissingRequiredValue initializes correctly when given an object with "expectedValues"',
            () => {
                // Setup
                const options: ZnumMissingRequiredValueOptions = {
                    fieldName: "code",
                    expectedValues: ["string", "number"],
                    receivedValue: "boolean"
                };
                const error: ZnumMissingRequiredValue = new ZnumMissingRequiredValue(options);

                expect(error)
                    .toMatchObject({
                        message: 'Unable to create Znum instance; Missing required field "code"',
                        context: {
                            fieldName: "code",
                            expectedValues: ["string", "number"],
                            receivedValue: "boolean"
                        }
                    });
            }
        );

    }
);