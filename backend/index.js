import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schema/schemaGql.js";
import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";
import './modal/User.js'
import './modal/Quotes.js'

import resolvers from "./resolvers/queryResolvers.js";

mongoose.connect(MONGO_URI)
mongoose.connection.on("connected",()=>{
    console.log("Connected to mongodb")
})

mongoose.connection.on("error",(err)=>{
    console.log({err})
})

//mongodb+srv://dpk:dpk@graphql.nmjoaae.mongodb.net/?retryWrites=true&w=majority&appName=graphqldb


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

server.listen().then(({url})=>{
    console.log(`server ready at ${url}`)
})
