import { gql } from "apollo-server-core"

const typeDefs = gql`

    type Query{
        users:[User]
        user(_id:ID!):User
        quotes:[Quote]
        quote(by:ID!):[Quote]

    }

    type User{
    _id:ID!
    firstname:String
    lastname:String
    email:String
    quotes:[Quote]
    }
    type Quote{
    name:String
    by:ID
    }

    type Mutation{
        signupUser(newUser:UserInput!):User
        signinUser(userLogin: UserLogin!):User
    }

    input UserInput{
    firstname:String!
    lastname:String!
    email:String!
    password:String!
    }

    input UserLogin{
    email:String!
    password:String!
    }

`

export default typeDefs