import express from 'express';
import compression from "compression";
import cors from "cors";
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import schema from "./schema";
import expressPlayGround from "graphql-playground-middleware-express";



const PORT          = 5200;
const app           = express();
const httpServer    = createServer(app);
const servidor      = new ApolloServer({
    schema,
    introspection: true
});



servidor.applyMiddleware({app});



app.use('*', cors() );
app.use( compression() );



app.get('/', expressPlayGround({
    endpoint: '/graphql'
}) )



httpServer.listen( 
    {
        port: PORT
    },
    () => console.log(`servidor listo en http://localhost:${PORT}/graphql`)
);