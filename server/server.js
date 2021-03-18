const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const config=require('./config/keys')
const typeDefs=require('./graphql/schema')
const {Query}=require('./graphql/resolvers/Query')
const {Mutation}=require('./graphql/resolvers/mutations')


const resolvers={
  Query:{
    hello:()=>{
      return "123"
    }
  }
}



const server = new ApolloServer({
  typeDefs,
  resolvers:{
    Query,
    Mutation
  }
});

const app = express();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${config.mongoDBUser}:${config.mongoDBPwd}@cluster0.xgyma.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
