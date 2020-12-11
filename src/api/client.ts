export const API_KEY_ID = "9af15e80";

export const API_KEY = "apikey";

export const HOST = "http://www.omdbapi.com/";

export const SEARCH_PARAM = "s";

export const YEAR_PARAM = "y";

export const PAGE_PARAM = "page";

export const ID_PARAM = "i";

export const buildSearchUrl = (query: string, currentPage: number = 1) =>
  `${HOST}?${SEARCH_PARAM}=${query}&${PAGE_PARAM}=${currentPage.toString()}&${API_KEY}=${API_KEY_ID}`;

export const buildIdUrl = (id: string) =>
  `${HOST}?${ID_PARAM}=${id}&${API_KEY}=${API_KEY_ID}`;

export class FetchError extends Error {
  constructor(status: any, statusText: any) {
    super(`${status} ${statusText}`);

    this.name = "FetchError";

    Object.setPrototypeOf(this, FetchError.prototype);
  }
}
export const fetchData = (url: string, retries: number = 2): any =>
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        if (retries > 0) return fetchData(url, retries - 1);
        else throw new FetchError(response.status, response.statusText);
      } else {
        return response.json();
      }
    })
    .catch((error: Error) => {
      if (retries > 0) return fetchData(url, retries - 1);
      else throw new FetchError("Error: ", error.message);
    });
