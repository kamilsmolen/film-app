import reducer, { cacheErrorMessage, toggleModal } from "./errorModalSlice";

describe("test error modal slice actions", () => {
  it("should create an action with errorModal/toggleModal type", () => {
    const value = true;
    const expectation = {
      type: "errorModal/toggleModal",
      payload: value,
    };

    expect(toggleModal(value)).toEqual(expectation);
  });
  it("should create an action with errorModal/cacheErrorMessage type", () => {
    const value = "err";
    const expectation = {
      type: "errorModal/cacheErrorMessage",
      payload: value,
    };

    expect(cacheErrorMessage(value)).toEqual(expectation);
  });
});

describe("test input slice reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      isOpened: false,
      errorMessage: "",
    });
  });

  it("should handle errorModal/toggleModal", () => {
    const action = {
      type: "errorModal/toggleModal",
      payload: true,
    };
    const expectation = {
      isOpened: true,
      errorMessage: "",
    };
    expect(reducer(undefined, action)).toEqual(expectation);
  });

  it("should handle errorModal/cacheErrorMessage", () => {
    const action = {
      type: "errorModal/cacheErrorMessage",
      payload: "err",
    };
    const expectation = {
      isOpened: true,
      errorMessage: "err",
    };
    expect(reducer(undefined, action)).toEqual(expectation);
  });
  it("should handle errorModal/cacheErrorMessage - empty string", () => {
    const action = {
      type: "errorModal/cacheErrorMessage",
      payload: "",
    };
    const expectation = {
      isOpened: false,
      errorMessage: "",
    };
    expect(reducer(undefined, action)).toEqual(expectation);
  });

  it("should handle grid/fetchMovies/rejected", () => {
    const action = {
      type: "grid/fetchMovies/rejected",
      error: {
        message: "err1",
      },
    };
    const expectation = {
      isOpened: true,
      errorMessage: "err1",
    };
    expect(reducer(undefined, action)).toEqual(expectation);
  });
  it("should handle grid/fetchMovieDetails/rejected", () => {
    const action = {
      type: "grid/fetchMovieDetails/rejected",
      error: {
        message: "err2",
      },
    };
    const expectation = {
      isOpened: true,
      errorMessage: "err2",
    };
    expect(reducer(undefined, action)).toEqual(expectation);
  });
});
