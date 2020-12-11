import reducer, { cacheQuery } from "./inputSlice";

describe("test input slice actions", () => {
  it("should create an action with input/cacheQuery type", () => {
    const value = "query";
    const expectation = {
      type: "input/cacheQuery",
      payload: value,
    };

    expect(cacheQuery(value)).toEqual(expectation);
  });
});

describe("test input slice reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({ query: "" });
  });

  it("should handle input/cacheQuery", () => {
    const action = {
      type: "input/cacheQuery",
      payload: "q",
    };
    const expectation = { query: "q" };
    expect(reducer(undefined, action)).toEqual(expectation);
  });
});
