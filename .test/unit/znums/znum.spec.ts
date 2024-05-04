import "jest-extended";
import {
    Nullable,
    Znum,
    Znumable,
    ZnumDoesNotExist,
    ZnumMissingRequiredValue
} from "../../../.src";


class TestZnum extends Znum<Znumable> {

    protected static override readonly ZNUM_TO_VALUE_MAP: Map<TestZnum, Znumable> = new Map<TestZnum, Znumable>();

    protected static override readonly VALUE_TO_ZNUM_MAP: Map<Znumable, TestZnum> = new Map<Znumable, TestZnum>();

    protected static override readonly TYPE: string = "TestZnum";

    public static readonly STRING_ZNUM: TestZnum = new TestZnum("test");

    public static readonly NUMBER_ZNUM: TestZnum = new TestZnum(1);

    public static readonly NUMERICAL_ZNUM: TestZnum = new TestZnum("1");

    public static override readonly SUPPORTED_ZNUMS: Array<TestZnum> = [
        TestZnum.STRING_ZNUM,
        TestZnum.NUMBER_ZNUM,
        TestZnum.NUMERICAL_ZNUM
    ];

    constructor(
        code: Znumable
    ) {
        super(code);
    }

    protected setZnumMap(
        value: Znumable
    ): void {
        TestZnum.ZNUM_TO_VALUE_MAP.set(
            this,
            value
        );
        TestZnum.VALUE_TO_ZNUM_MAP.set(
            value,
            this
        );
    }

    get type(): string {
        return TestZnum.TYPE;
    }

    static get ZnumMapSize(): number {
        return this.ZNUM_TO_VALUE_MAP.size;
    }

    static get valueMapSize(): number {
        return this.VALUE_TO_ZNUM_MAP.size;
    }
}

/**
 *
 * Test Suite for the Znum class.
 *
 * @group unit
 * @group znum
 *
 */
describe(
    "Znum Unit Test Suite",
    () => {

        test(
            'that Znum static toString returns "Znum"',
            () => {
                expect(Znum.toString())
                    .toBe("Znum");
            }
        );

        test(
            "that Znum ZNUM_TO_VALUE_MAP is undefined",
            () => {
                expect(Znum["ZNUM_TO_VALUE_MAP"])
                    .not
                    .toBeDefined();
            }
        );

        test(
            "that Znum VALUE_TO_ZNUM_MAP is undefined",
            () => {
                expect(Znum["VALUE_TO_ZNUM_MAP"])
                    .not
                    .toBeDefined();
            }
        );

        test(
            "that Znum SUPPORTED_ZNUMS is undefined",
            () => {
                expect(Znum["SUPPORTED_ZNUMS"])
                    .not
                    .toBeDefined();
            }
        );

        test(
            'that Znum static type returns "Znum"',
            () => {
                expect(Znum["TYPE"])
                    .toBe("Znum");
            }
        );

        test(
            "that a child of the Znum class correctly sets the XNUM_TO_VALUE_MAP",
            () => {
                expect(TestZnum.ZnumMapSize)
                    .toBe(3);
            }
        );

        test(
            "that a child of the Znum class correctly sets the VALUE_TO_XNUM_MAP",
            () => {
                expect(TestZnum.valueMapSize)
                    .toBe(2);
            }
        );

        test(
            "that a child of the Znum class correctly sets the SUPPORTED_XNUMS array",
            () => {
                const supportedZnums: Array<TestZnum> = TestZnum["SUPPORTED_ZNUMS"];
                expect(supportedZnums)
                    .toBeArrayOfSize(3);
                expect(supportedZnums[0])
                    .toStrictEqual(TestZnum.STRING_ZNUM);
                expect(supportedZnums[1])
                    .toStrictEqual(TestZnum.NUMBER_ZNUM);
                expect(supportedZnums[2])
                    .toStrictEqual(TestZnum.NUMERICAL_ZNUM);
            }
        );

        test(
            "that a child of the Znum class returns the provided type with static toString",
            () => {
                expect(TestZnum.toString())
                    .toBe("TestZnum");
            }
        );

        test.each([
            true,
            new Date(),
            [],
            {}
        ])
        (
            'that given %s for "code", attempting to create an Znum child throws a TypeError',
            (arg) => {
                expect(() => {
                    new TestZnum(arg as any);
                })
                    .toThrowError(TypeError);
            }
        );

        test.each([
            null,
            undefined
        ])
        (
            'that given %s for "code", attempting to create an Znum child throws a ZnumMissingRequiredValue error',
            (arg) => {
                expect(() => {
                    new TestZnum(arg as any);
                })
                    .toThrowError(ZnumMissingRequiredValue);
            }
        );

        test(
            "that given an invalid value, getZnum throws an error by default",
            () => {
                expect(() => {
                    TestZnum.getZnum("Invalid");
                })
                    .toThrowError(ZnumDoesNotExist);
            }
        );

        test(
            'that given an invalid value, getZnum should not error if passed an "errorIfNotFound" value of false',
            () => {
                const xnum: Nullable<Znum<Znumable>> = TestZnum.getZnum(
                    "Invalid",
                    false
                );

                expect(xnum)
                    .toBeNull();
            }
        );

        test.each([
            "test",
            "TEST",
            1,
            "1"
        ])
        (
            "that given %s, getZnum returns the expected result",
            (arg) => {
                expect(TestZnum.getZnum(arg))
                    .toMatchSnapshot();
            }
        );

        test(
            "that given an invalid value, getValue throws an error by default",
            () => {
                expect(() => {
                    TestZnum.getValue(null);
                })
                    .toThrowError(ZnumDoesNotExist);
            }
        );

        test(
            'that given an invalid value, getValue should not error if passed an "errorIfNotFound" value of false',
            () => {
                const xnumable: Nullable<Znumable> = TestZnum.getValue(
                    null,
                    false
                );

                expect(xnumable)
                    .toBeNull();
            }
        );

        test.each([
            TestZnum.STRING_ZNUM,
            TestZnum.NUMBER_ZNUM
        ])
        (
            "that given $xnum, getValue returns $expectedResult",
            (arg) => {

                expect(TestZnum.getValue(arg))
                    .toMatchSnapshot();
            }
        );

        test.each([
            TestZnum.STRING_ZNUM,
            TestZnum.NUMBER_ZNUM
        ])
        (
            "that given %s, isValid returns true",
            (arg) => {
                expect(TestZnum.isValid(arg))
                    .toBeTrue();
            }
        );

        test(
            "that given an Znum that is not in the SUPPORTED_XNUMS array, isValid returns false",
            () => {
                // Setup
                const invalidXnum: TestZnum = new TestZnum("Invalid");

                expect(TestZnum.isValid(invalidXnum))
                    .toBeFalse();
            }
        );

        test.each([
            TestZnum.STRING_ZNUM,
            TestZnum.NUMBER_ZNUM
        ])
        (
            'that given %s, "code" returns the expected result',
            (arg) => {
                expect(arg.code)
                    .toMatchSnapshot();
            }
        );

        test.each([
            TestZnum.STRING_ZNUM,
            TestZnum.NUMBER_ZNUM
        ])
        (
            'that given %s, "symbol" returns the expected result',
            (arg) => {
                expect(arg.symbol)
                    .toMatchSnapshot();
            }
        );

        test.each([
            TestZnum.STRING_ZNUM,
            TestZnum.NUMBER_ZNUM
        ])
        (
            'that given %s, "type" returns the expected result',
            (arg) => {
                // This should be the same for all TestZnum values
                expect(arg.type)
                    .toBe("TestZnum");
            }
        );

    }
);