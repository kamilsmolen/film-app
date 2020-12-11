# Film search application

This is application to query films by title from OMDb api (http://www.omdbapi.com/). Application displays basic results (10 per page).

If you need more details, click on details row. It will open modal with detailed info (detailed info is got by query)

If you want to change page - on the bottom there is pagination section, which will run another query to get data.

There is simple functionality to add new row or delete rows, but it generates error dialog.

## How to run app?

1. Clone repository.

2. Install dependencies:

   > `$ npm i`

3. Run application:

   > `$ npm start`
   > App will be run on port `3000` -> `http://localhost:3000/`.

   > To build prod version:
   > `$ npm build`

   > To run tests:
   > `$ npm test`

## Flow of the application

1. Initially application displays search input - this is a place where user types title.
2. When users put data and press enter/click search fetch `by search` starts (to read more about fetching `by search` - visit http://www.omdbapi.com/).
3. When data loaded - they are displayed in grid on table. If fetching error occurred - error message displayed to user in dialog window.
4. User can use pagination to switch pages. It will generate new fetch request.
5. To get more details about film, user needs to click on row. It will generate fetch to api `by id` with provided imdbId.
6. After fetching data - modal is open. To close modal - click outside modal or any of close buttons.
7. User can add new data by clicking `add new` button. It will open dialog window with possibility of inputing basic film details. When submitting - dialog modal with error will appear (this functionality is not done).
8. User can delete data by selecting rows they want to remove and clicking `remove icon`. Currently clicking it will generate dialog modal with error (this functionality is not done).

## Additional information

1. If data fetch fails, retry fetch up to 2 times.
2. Store & project structure is created in `ducks` pattern. It means each feature has its own directory inside `src/features` - each of them has its own store and components.
3. Stores are combined in `app` directory.
4. There is one directory in `features` called `common` which contains logic for creating async thunks. Actions of it are cross-features.
5. Logic for fetching data, building query & urls is inside `src/api`.
6. Basic tests are done for redux slices/ducks.
7. Project was started with `create-react-app`.

## TODO

1. Improve code structure and separate some parts outside of files.
2. (If it would be possible), finish add/remove functionality.
3. Improve adding-new-item functionality by adding more form inputs and validation to them.
4. Improve styling (especially dialog window with details). Take care of mobile devices.
5. Improve test coverage.

## Screenshots
