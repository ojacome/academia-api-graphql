"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./schema"));
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const PORT = 5200;
const app = express_1.default();
const httpServer = http_1.createServer(app);
const servidor = new apollo_server_express_1.ApolloServer({
    schema: schema_1.default,
    introspection: true
});
servidor.applyMiddleware({ app });
app.use('*', cors_1.default());
app.use(compression_1.default());
app.get('/', graphql_playground_middleware_express_1.default({
    endpoint: '/graphql'
}));
httpServer.listen({
    port: PORT
}, () => console.log(`servidor listo en http://localhost:${PORT}/graphql`));
