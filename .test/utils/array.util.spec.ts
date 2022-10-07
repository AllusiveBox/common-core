import "jest-extended";
import { ArrayUtil } from "../../.src/utils";

/**
 *
 * Test Suite for all the functions included in the Array Util sub package.
 *
 * @group unit
 * @group utils
 * @group array
 *
 */
describe("ArrayUtil Unit Test Suite", () => {

    test("that given a non-empty array, isEmptyArray returns false", () => {
        expect(ArrayUtil.isEmptyArray(["hello", "world"])).toBeFalse();
    });

    test("that given an empty array, isEmptyArray returns true", () => {
        expect(ArrayUtil.isEmptyArray([])).toBeTrue();
    });

    test("that given an empty array, isNotEmptyArray returns false", () => {
        expect(ArrayUtil.isNotEmptyArray([])).toBeFalse();
    });

    test("that given a non-empty array, isNotEmptyArray returns true", () => {
        expect(ArrayUtil.isNotEmptyArray(["hello", "world"]));
    });

});
