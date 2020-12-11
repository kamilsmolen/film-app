import reducer, {
  cacheCurrentPage,
  toggleFormModal,
  toggleSelectedItem,
} from "./gridSlice";

describe("test grid slice actions", () => {
  it("should create an action with grid/cacheCurrentPage type", () => {
    const value = 1;
    const expectation = {
      type: "grid/cacheCurrentPage",
      payload: value,
    };

    expect(cacheCurrentPage(value)).toEqual(expectation);
  });
  it("should create an action with grid/toggleSelectedItem type", () => {
    const value = "id1";
    const expectation = {
      type: "grid/toggleSelectedItem",
      payload: value,
    };

    expect(toggleSelectedItem(value)).toEqual(expectation);
  });

  it("should create an action with grid/toggleFormModal type", () => {
    const value = true;
    const expectation = {
      type: "grid/toggleFormModal",
      payload: value,
    };

    expect(toggleFormModal(value)).toEqual(expectation);
  });
});

describe("test grid slice reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      results: [],
      totalPages: 0,
      currentPage: 1,
      showGrid: false,
      selectedItems: [],
      isFormModalOpened: false,
    });
  });

  it("should handle grid/cacheCurrentPage", () => {
    const action = {
      type: "grid/cacheCurrentPage",
      payload: 2,
    };
    const expectation = {
      results: [],
      totalPages: 0,
      currentPage: 2,
      showGrid: false,
      selectedItems: [],
      isFormModalOpened: false,
    };
    expect(reducer(undefined, action)).toEqual(expectation);
  });

  it("should handle grid/toggleFormModal", () => {
    const action = {
      type: "grid/toggleFormModal",
      payload: true,
    };
    const expectation = {
      results: [],
      totalPages: 0,
      currentPage: 1,
      showGrid: false,
      selectedItems: [],
      isFormModalOpened: true,
    };
    expect(reducer(undefined, action)).toEqual(expectation);
  });

  it("should handle grid/toggleSelectedItem - item selected", () => {
    const action = {
      type: "grid/toggleSelectedItem",
      payload: "id1",
    };

    const initState = {
      results: [{ imdbID: "id1" }, { imdbID: "id2" }],
      totalPages: 0,
      currentPage: 1,
      showGrid: false,
      selectedItems: [],
      isFormModalOpened: true,
    };

    const expectation = {
      results: [{ imdbID: "id1" }, { imdbID: "id2" }],
      totalPages: 0,
      currentPage: 1,
      showGrid: false,
      selectedItems: [{ imdbID: "id1" }],
      isFormModalOpened: true,
    };
    expect(reducer(initState, action)).toEqual(expectation);
  });

  it("should handle grid/toggleSelectedItem - item unselected", () => {
    const action = {
      type: "grid/toggleSelectedItem",
      payload: "id1",
    };

    const initState = {
      results: [{ imdbID: "id1" }, { imdbID: "id2" }],
      totalPages: 0,
      currentPage: 1,
      showGrid: false,
      selectedItems: [{ imdbID: "id1" }],
      isFormModalOpened: true,
    };

    const expectation = {
      results: [{ imdbID: "id1" }, { imdbID: "id2" }],
      totalPages: 0,
      currentPage: 1,
      showGrid: false,
      selectedItems: [],
      isFormModalOpened: true,
    };
    expect(reducer(initState, action)).toEqual(expectation);
  });

  it("should handle grid/fetchMovies/pending", () => {
    const action = {
      type: "grid/fetchMovies/pending",
    };
    const expectation = {
      results: [],
      totalPages: 0,
      currentPage: 1,
      showGrid: false,
      selectedItems: [],
      isFormModalOpened: false,
    };
    expect(reducer(undefined, action)).toEqual(expectation);
  });

  it("should handle grid/fetchMovies/fulfilled", () => {
    const action = {
      type: "grid/fetchMovies/fulfilled",
      payload: {
        Search: [{ imdbID: "id1" }, { imdbID: "id2" }],
        totalResults: 2,
      },
    };
    const expectation = {
      results: [{ imdbID: "id1" }, { imdbID: "id2" }],
      totalPages: 1,
      currentPage: 1,
      showGrid: true,
      selectedItems: [],
      isFormModalOpened: false,
    };
    expect(reducer(undefined, action)).toEqual(expectation);
  });
});
