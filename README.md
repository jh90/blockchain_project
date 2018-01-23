An application that serves balance and transaction data for a Bitcoin address from the Blockchain.info API and Bitcoin WebSocket in response to user search using ReactJS and NodeJS with Express.

BUILD:
If you do not have NodeJS and NPM installed, you can find them [here](https://www.nodejs.org).

This application uses [Superagent](https://visionmedia.github.io/superagent/) and [Moment.js](https://www.momentjs.com) to facilitate AJAX and timestamp formatting. Bundling and cross-browser support for React are handled with [Babel](https://babeljs.io) and [Webpack](https://webpack.js.org).

`npm install --save` ..
React: `react react-dom babel-core babel-loader babel-preset-ES2015 babel-preset-react`
Server implementation: `express body-parser dotenv morgan`
Webpack: `webpack webpack-dev-server webpack-dev-middleware webpack-hot-middleware`
Superagent: `superagent`
Moment.js: `moment`

RUN:
From the command line in the top-level directory run:
`node server.js` or `nodemon server.js` for development use.

The application is served on port 3000.
