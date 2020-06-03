





### koa

安装



```text
npm install --save apollo-server-koa graphql koa koa-bodyparser koa-router
```

实例 [源码](https://link.jianshu.com?t=https%3A%2F%2Fgithub.com%2Fwenshaoyan%2Fapollo-server-example%2Fblob%2Fmaster%2Fexample-koa.js)



```js
/**
 * Created by wenshao on 2018/2/10.
 */
'use strict';
const Koa = require('koa');
const Body = require('koa-bodyparser');
const router = require('koa-router')();
const {graphqlKoa} = require('apollo-server-koa');
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt
} = require('graphql');


const User = new GraphQLObjectType({
    name: 'User',
    description: 'User对象',
    fields: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: User,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: function (root, args) {
                return {id: 1, name: '2'};
            }
        }
    }
});
const myGraphQLSchema = new GraphQLSchema({
    query: Query
});
const app = new Koa();
const PORT = 3000;

// Body is needed just for POST.
app.use(Body());

router.post('/graphql', graphqlKoa({schema: myGraphQLSchema}));
router.get('/graphql', graphqlKoa({schema: myGraphQLSchema}));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);
```

### 其他框架参考官方文档



作者：yanshaowen
链接：https://www.jianshu.com/p/70d61aee696b#github-api-v4%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83%E5%88%86%E6%9E%90
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。







## 查询接口

### Query

```js
query {
  book(id:"123") {
    title,
    author
  } 
}


// gql
  type Query {
    hello: String,
    books: [Book],
    book(id : String) : Book
  }

  type Book {
    title: String
    author: String
  }

// resolve 
const resolvers = {
    Query: {
        book: (parent, { id }) => {

            console.log('parent', parent)
            console.log('query books:', id)
            return {
                title: 'abc',
                author: 'xxxx'
            }

        }
    },
```

