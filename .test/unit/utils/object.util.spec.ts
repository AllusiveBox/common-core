import "jest-extended";
import { NilError } from "../../../.src";
import { ObjectUtil } from "../../../.src/utils";


/**
 *
 * Test Suite for all the functions included in the Object Util sub package.
 *
 * @group unit
 * @group utils
 * @group object
 *
 */
describe(
    "ObjectUtil Unit Test Suite",
    () => {

        test(
            "that given a null object, getProperty throws a NilError",
            () => {
                // Setup
                const obj = null;

                expect(() => {
                    ObjectUtil.getProperty(
                        obj as any,
                        ""
                    );
                })
                    .toThrowError(NilError);
            }
        );

        test.each([
            "Hello world",
            true,
            [],
            new Date(),
            Symbol("Test")
        ])
        (
            "that given %s for the first parameter, getProperty throws a TypeError",
            (arg) => {
                expect(() => {
                    ObjectUtil.getProperty(
                        arg as any,
                        ""
                    );
                })
                    .toThrowError(TypeError);
            }
        );

        test(
            "that given a null path, getProperty throws a NilError",
            () => {
                // Setup
                const obj: { name: string } = { name: "John Doe" };

                expect(() => {
                    ObjectUtil.getProperty(
                        obj,
                        null as any
                    );
                })
                    .toThrowError(NilError);
            }
        );

        test(
            "that given both parameters are null, getProperty throws an Error",
            () => {
                expect(() => {
                    ObjectUtil.getProperty(
                        null as any,
                        null as any
                    );
                })
                    .toThrowError(Error);
            }
        );

        test(
            "that given a shallow object, getProperty returns the value stored at the specified path",
            () => {
                // Setup
                const obj = {
                    name: "John Doe",
                    age: 24,
                    gender: "male"
                };

                expect(ObjectUtil.getProperty(
                    obj,
                    "name"
                ))
                    .toBe("John Doe");
                expect(ObjectUtil.getProperty(
                    obj,
                    "age"
                ))
                    .toBe(24);
                expect(ObjectUtil.getProperty(
                    obj,
                    "gender"
                ))
                    .toBe("male");
            }
        );

        test(
            "that given a deep object, getProperty returns the object stored at the specified path",
            () => {
                // Setup
                const obj = { foo: { bar: { foobar: { foo: "bar" } } } };

                expect(ObjectUtil.getProperty(
                    obj,
                    "foo"
                ))
                    .toStrictEqual({
                        bar: {
                            foobar: {
                                foo: "bar"
                            }
                        }
                    });
            }
        );

        test(
            "that given a nested object, getProperty returns the value stored in a nested object",
            () => {
                // Setup
                const obj = { foo: { bar: { foobar: { foo: "bar" } } } };

                expect(ObjectUtil.getProperty(
                    obj,
                    "foo.bar"
                ))
                    .toStrictEqual({
                        foobar: {
                            foo: "bar"
                        }
                    });
            }
        );

        test.each([
            null,
            undefined
        ])
        (
            "that given an object with a value of %s, getProperty returns null",
            (arg) => {
                // Setup
                const obj = { foo: arg };

                expect(ObjectUtil.getProperty(
                    obj,
                    "foo"
                ))
                    .toBeNull();
            }
        );

        test(
            "that given a non-empty object, isEmptyObject returns false",
            () => {
                expect(ObjectUtil.isEmptyObject({ foo: "bar" }))
                    .toBeFalse();
            }
        );

        test(
            "that given an empty object, isEmptyObject returns true",
            () => {
                expect(ObjectUtil.isEmptyObject({}))
                    .toBeTrue();
            }
        );

        test(
            "that given an empty object, isNonEmptyObject returns false",
            () => {
                expect(ObjectUtil.isNonEmptyObject({}))
                    .toBeFalse();
            }
        );

        test(
            "that given a non-empty object, isNonEmptyObject returns true",
            () => {
                expect(ObjectUtil.isNonEmptyObject({ foo: "bar" }))
                    .toBeTrue();
            }
        );

    }
);
