const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { resolve } = require('path')
const PORT = 4000;
const app = express();
app.use(express.static(resolve(__dirname + '/')))

class Ball {
    constructor() {
        this.size = ((Math.random() * 10) | 0) + 5;
        this.color = ["black", "red", "white", "blue"][(Math.random() * 4) | 0];
    }
}
const box = {
    width: 100,
    height: 200,
    weight: "100g",
    color: "white",
    balls: new Array(10).fill().map(n => new Ball())
}

const typeDefs = [`
"""
一个盒子模型
"""

type Box{
    width:Int,
    height:Int,
    color:String,
    balls(color:String):[Ball]
}
type Ball{
    size:Int,
    color:String
}
  
type Query {
  getBox: Box
}

type Mutation{
  setWidth(width:Int):Box
}

schema {
  query: Query,
  mutation: Mutation
}`]

const resolvers = {
    Query: {
        getBox(_) {
            return box
        },
    },
    Mutation: {
        setWidth(_, { width }) {
            box.width = width;
            return box
        }
    },
    Box: {
        balls(parent, { color }) {
            return color ? box.balls.filter(ball => ball.color === color) : box.balls
        }
    }
};


const server = new ApolloServer({
    typeDefs,
    resolvers
});
server.applyMiddleware({ app });

app.listen(PORT, () =>
    console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
);