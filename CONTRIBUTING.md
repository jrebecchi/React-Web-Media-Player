## Prerequisites

[Node.js](http://nodejs.org/) >= 6 must be installed.

## Installation

- Running `npm install` in the component's root directory will install everything you need for development.

## Demo Development Server

- `npm start` will run a development server with the component's demo app at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

- `npm test` will run the tests once.

- `npm run test:coverage` will run the unit and integration tests and produce a coverage report in `coverage/`.

- `npm run test:watch` will run the unit and integration tests on every change.

- `npm run test:end2end` will run the end to end tests performed on Chrome with Selenium. In order to work, you will need to have Chrome installed on your machine and to run the local demo server in another terminal by taping `npm start`.

## Building

- `npm run build` will build the component for publishing to npm and also bundle the demo app.

- `npm run clean` will delete built resources.
