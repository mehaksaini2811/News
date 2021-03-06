const {gql}=require('apollo-server-express')

const typeDefs=gql`
    type Query{
        hello:String!
    }
    type User{
        _id:ID!
        email:String!
        password:String
        name:String
        lastname:String
        token:String
    }

    type Mutation{
        auth(fields:AuthInput):User!
        signUp(fields:AuthInput!):User!
    }

    input AuthInput{
        email:String!
        password:String!
    }
`

module.exports=typeDefs