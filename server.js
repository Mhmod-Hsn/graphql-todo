const express = require('express');
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const schema = require("./modules");
const loggingPlugin = require("./plugins/logging");

const app = express();

// Enable CORS for all routes
app.use(cors());

async function startServer() {
	const server = new ApolloServer({
		schema,
		plugins: [loggingPlugin],
	});
	await server.start();
	server.applyMiddleware({ app });
}
startServer();

app.listen({ port: 3000 }, () =>
  console.log(`Server ready at http://localhost:3000`)
);
