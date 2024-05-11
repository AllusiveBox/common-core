import "jest-extended";
import Environment from "../../../.src/znums/environment";

/*
 We need to mock the Environment getEnvironment method before importing the ProcessService, so that the static block
 is able to be manipulated during tests. Setting it to always return Unknown allows us the ability to check what
 was sent, and calculate what would have been returned, if not mocked.
 */
const mockEnvironmentSpy: jest.SpyInstance = jest.spyOn(
    Environment,
    "getEnvironment"
)
    .mockImplementation(() => {
        return Environment.UNKNOWN;
    });

import ProcessService from "../../../.src/services/process.service";
import LoggerServiceFake from "../../fakes/logger.service.fake";

/**
 *
 * The value passed to the `process.chdir` method during the tests.
 *
 * @type {string}
 *
 */
let chDirArg: string;

/**
 *
 * A logger used during the tests.
 *
 * @type {LoggerServiceFake}
 *
 */
let logger: LoggerServiceFake;

/**
 *
 * The service used during the tests.
 *
 * @type {ProcessService}
 *
 */
let service: ProcessService;

/**
 *
 * Test Suite for the ProcessService class.
 *
 * @group unit
 * @group services
 *
 */
describe(
    "ProcessService Unit Test Suite",
    () => {

        beforeEach(() => {
            jest.spyOn(
                process,
                "cwd"
            )
                .mockReturnValue("foo/bar");

            jest.spyOn(
                process,
                "chdir"
            )
                .mockImplementationOnce((arg: string) => {
                    chDirArg = arg;

                    const newDir: string = chDirArg === "../" ? "foo" : chDirArg;
                    jest.spyOn(
                        process,
                        "cwd"
                    )
                        .mockReturnValue(newDir);
                })
                .mockImplementationOnce(() => {
                    throw new Error("Error - chdir should only be called once");
                });
            mockEnvironmentSpy.mockImplementation(() => {
                return Environment.UNKNOWN;
            });

            logger = new LoggerServiceFake();
            service = new ProcessService(logger);
        });

        afterEach(() => {
            jest.resetAllMocks();
        });

        afterAll(() => {
            jest.restoreAllMocks();
        });

        test(
            "the static values initialize correctly",
            () => {
                expect(ProcessService.environment)
                    .toBeInstanceOf(Environment);
                // This will be false, as the getEnvironment method is mocked to always return Unknown.
                expect(ProcessService.environment.isTest())
                    .toBeFalse();

                expect(mockEnvironmentSpy)
                    .toHaveBeenCalledOnce();
                expect(mockEnvironmentSpy.mock.calls[0][0])
                    .toBe("test");
            }
        );

        test(
            "that the service initializes correctly",
            () => {
                expect(service.currentDirectory)
                    .toBe("foo/bar");
                expect(service.logger)
                    .toBeInstanceOf(LoggerServiceFake);

                // This will be false, as the getEnvironment method is mocked to always return Unknown.
                expect(service.isTest())
                    .toBeFalse();

                expect(mockEnvironmentSpy)
                    .toHaveBeenCalledOnce();
                expect(mockEnvironmentSpy.mock.calls[0][0])
                    .toBe("test");
            }
        );

        test(
            "that back correctly updates the current directory",
            () => {
                // Expect value to be unchanged; Base case
                expect(service.currentDirectory)
                    .toBe("foo/bar");

                // Update directory
                service.back();

                expect(service.currentDirectory)
                    .toBe("foo");
                expect(chDirArg)
                    .toBe("../");
            }
        );

        test(
            "that change correctly updates the current directory",
            () => {
                // Expect value to be unchanged; Base case
                expect(service.currentDirectory)
                    .toBe("foo/bar");

                // Update directory
                service.change("bar");

                expect(service.currentDirectory)
                    .toBe("bar");
                expect(chDirArg)
                    .toBe("bar");
            }
        );

        test(
            "that getEnvironment parses the process.env.NODE_ENV value if the stored Environment is Unknown",
            () => {
                expect(service.getEnvironment())
                    .toBe(Environment.UNKNOWN);

                expect(mockEnvironmentSpy)
                    .toHaveBeenCalledOnce();
                expect(mockEnvironmentSpy.mock.calls[0][0])
                    .toBe("test");
            }
        );

        test(
            "that getEnvironment correctly updates the internal environment value if the process.env.NODE_ENV value" +
            " is anything other than Unknown",
            () => {
                // Setup
                mockEnvironmentSpy.mockImplementationOnce((arg) => {
                    if (arg === "test") {
                        return Environment.TEST;
                    }

                    throw new Error(`Unrecognized value: ${arg}`);
                })
                    .mockImplementationOnce(() => {
                        throw new Error("Error - getEnvironment should only be called once");
                    });

                expect(service.getEnvironment())
                    .toBe(Environment.TEST);

                expect(mockEnvironmentSpy)
                    .toHaveBeenCalledOnce();
                expect(mockEnvironmentSpy.mock.calls[0][0])
                    .toBe("test");
            }
        );

        test(
            "that getEnvironment returns the stored environment, when it is anything other than Unknown",
            () => {
                // Setup
                mockEnvironmentSpy.mockImplementationOnce((arg) => {
                    if (arg === "test") {
                        return Environment.TEST;
                    }

                    throw new Error(`Unrecognized value: ${arg}`);
                })
                    .mockImplementationOnce(() => {
                        throw new Error("Error - getEnvironment should only be called once");
                    });

                expect(service.getEnvironment())
                    .toBe(Environment.TEST);
            }
        );

    }
);