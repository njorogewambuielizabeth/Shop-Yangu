const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');  // Ensure db.json is in the same directory as your server.js
const middlewares = jsonServer.defaults();

server.use(cors());  // Enable CORS
server.use(middlewares);
server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});
