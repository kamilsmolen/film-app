export const fetchData = (url: string, retries: number = 2): any =>
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        if (retries > 0) return fetchData(url, retries - 1);
        else
          return {
            errorMessage: `${response.status} - ${response.statusText}`,
          };
      } else {
        return response.json();
      }
    })
    .catch((error: Error) => {
      if (retries > 0) return fetchData(url, retries - 1);
      else return { errorMessage: `${error.message}` };
    });
