import reducer, { toggleModal } from "./detailsModalSlice";

describe("test details modal slice actions", () => {
  it("should create an action with detailsModal/toggleModal type", () => {
    const value = true;
    const expectation = {
      type: "detailsModal/toggleModal",
      payload: value,
    };

    expect(toggleModal(value)).toEqual(expectation);
  });
});

describe("test  details modal slice reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      details: undefined,
      isOpened: false,
    });
  });

  it("should handle detailsModal/toggleModal", () => {
    const action = {
      type: "detailsModal/toggleModal",
      payload: true,
    };
    const expectation = {
      details: undefined,
      isOpened: true,
    };
    expect(reducer(undefined, action)).toEqual(expectation);
  });

  it("should handle grid/fetchMovieDetails/fulfilled", () => {
    const action = {
      type: "grid/fetchMovieDetails/fulfilled",
      payload: { imdbID: "id" },
    };
    const expectation = {
      details: { imdbID: "id" },
      isOpened: true,
    };
    expect(reducer(undefined, action)).toEqual(expectation);
  });
});
