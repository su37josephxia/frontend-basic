# 从GraphQL到前端数据管理的革命 - GraphQL干货笔记

你知道吗？FaceBook、GitHub，Pinterest，Twitter，Sky，纽约时报，Shopify，Yelp这些大公司已经在使用GraphQL规范的接口规范了。再不学习就落后了。

> - [【文章参考代码】](https://github.com/su37josephxia/frontend-basic/tree/master/graphql)
> - [一个老外写的声明式GraphQL全栈实例](https://www.zcfy.cc/article/full-stack-react-graphql-tutorial-apollo-graphql-4341.html?t=new)
> - [如果做一个好的API Design](https://juejin.im/post/5c8afebfe51d4512445f227a#heading-7)
> - [Java Spring Boot实现](https://juejin.im/post/5c886063e51d454ffb104bfd#heading-2)
> - [Medium 的 GraphQL 服务设计](https://juejin.im/post/5c00dad3f265da617006db4e#heading-1)

## 你将Get到的技能

- GraphQL概念
- 实战GraphQL - Query/Mutation/Subscription
- Rest vs GraphQL 对比分析
- 如何搭建GraphQL后端服务
- 如何利用React hooks 、Provider封装GraphQL客户端
- 如何通过GraphQL完成对数据变化的订阅

## SPA框架崛起带来的问题

在前端的开发中是否会遇到这样的困扰？

### 1. 面对复杂场景的API粒度问题

- 减少请求次数就需要合并请求
- 多端应用Web、App、小程序视图不同所以需要的接口也不同
- API接口粒度难于确定
  - 粗粒度：移动端不必要的流量耗损
  - 细粒度：造成函数爆炸 (Function Explosion)

### 2. API版本划分问题

- 需要频繁应对API版本的演进

### 3. 实现双向通讯时接口风格不统一

如果需要实现支付状态、或者多人协作 、实时同步股票信息向客户端推送数据时，往往需要使用WebSocket通讯或者其他通讯方式。这时你会发现如果向服务器请求使用Restful风格无法保证接口风格统一。

### 4. 组件需要各自管理状态

- 组件需要将异步请求状态分发
- 父子组件通讯使结构复杂
- 订阅的数据响应会使得数据流变得杂乱无章可读性变差

## GraphQL概览

> 英文：[graphql.org/](https://graphql.org/)
>
> 中文: [graphql.cn/](https://graphql.cn/)
>
> Github GraphQL Explorer [developer.github.com/v4/explorer…](https://developer.github.com/v4/explorer/)

### 概念

- GraphQL 是由 Facebook 创造的用于 API 的查询语言。
- 前后端数据查询方式的规范。

GraphQL 既是一种用于 API 的查询语言也是一个满足你数据查询的运行时。 GraphQL 对你的 API 中的数据提供了一套易于理解的完整描述，使得客户端能够准确地获得它需要的数据，而且没有任何冗余，也让 API 更容易地随着时间推移而演进，还能用于构建强大的开发者工具。

### 优势

- 精确定义所需数据的能力（GraphQL拥有强类型）

```
# 查询
query {
  book(id: "1") {
    id,
    author,
  }
}
# 结果
{
  "data": {
    "book": {
      "id": "1",
      "author": "Author1"
    }
  }
}
复制代码
```

- GraphQL允许您通过一次调用替换多个REST请求以获取指定的数据
- 描述所有可能类型的系统

```
# 查询
query {
  book(id: "1") {
    id,
    author,
  },
  book2 : book(id:"3"){
    id
  }
}
# 结果
{
  "data": {
    "book": {
      "id": "1",
      "author": "Author1"
    },
    "book2": {
      "id": "3"
    }
  }
}
复制代码
```

- API 演进无需划分版本 给你的 GraphQL API 添加字段和类型而无需影响现有查询。老旧的字段可以废弃，从工具中隐藏。通过使用单一演进版本，GraphQL API 使得应用始终能够使用新的特性，并鼓励使用更加简洁、更好维护的服务端代码。

#### GraphQL VS Restful

> [扩展阅读 REST, GraphQL, Webhooks, & gRPC 如何选型](https://juejin.im/post/5b95bc3df265da0af0336911#heading-10)

|                  | GraphQL | Restful |
| ---------------- | ------- | ------- |
| 一次请求多资源   | ✔️       | ❌       |
| API字段定制化    | ✔️       | ❌       |
| 精确定义返回类型 | ✔️       | ❌       |
| 无需划分版本     | ✔️       | ❌       |
| 类型验证机制     | ✔️       | ❌       |
| 支持双向通讯     | ✔️       | ❌       |

### 基础操作

> 语法说明 [graphql.cn/learn/queri…](https://graphql.cn/learn/queries/)
>
> [进阶阅读复杂语法 Fragments Directives Function] [juejin.im/post/5c9247…](https://juejin.im/post/5c9247b26fb9a071090d5ed3#heading-9)

#### Query

##### 普通查询

```
query {
	books {
    title,
    author
  }
}

### Result
{
  "data": {
    "books": [
      {
        "title": "abc",
        "author": "xxxx"
      }
    ]
  }
}
复制代码
```

##### 带有参数和变量和别名的查询

```
# 查询
 query($id:String) {
  book(id: $id) {
    id,
    author,
  },
  book2 : book(id:"3"){
    id
  }
}

# 变量
{
  "id":"1"
}

# 结果
{
  "data": {
    "book": {
      "id": "1",
      "author": "Author1"
    },
    "book2": {
      "id": "3"
    }
  }
}
复制代码
```



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="897" height="466"></svg>)



#### Mutation

对于数据改变这种非幂等性操作使用Mutation来进项描述。

REST 中，任何请求都可能最后导致一些服务端副作用，但是约定上建议不要使用 GET 请求来修改数据。GraphQL 也是类似 —— 技术上而言，任何查询都可以被实现为导致数据写入。然而，建一个约定来规范任何导致写入的操作都应该显式通过变更（mutation）来发送。

```
# 查询
mutation {
  createBook(title:"TTTT",author: "AAA") {
    id
  }
}
复制代码
```

##### Subscription

如果数据发生变化希望后台主动通知前端，你可以使用Subscription后台消息订阅功能。

```
subscription  {
	subsBooks
}

复制代码
```



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="804" height="411"></svg>)



## ApolloServer后端

ApolloServer是一个开源的GraphQL框架。ApolloServer可以单独的作为服务器，同时ApolloServer也可以作为Express，Koa等Node框架的插件。

### HelloWorld

```
const { ApolloServer, gql } = require('apollo-server');

// Schema定义 // “标签模板”功能（tagged template）
const typeDefs = gql`
  type Query {
    hello: String,
  }
`;

// 解释器实现
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    }
};

// 创建服务器实例
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
复制代码
```

### Schema定义小结

#### 数据类型

GraphQL也有几个基础类型，在GraphQL中他们统称叫标量类型(Scalar Type)

- Int（整型）
- Float（浮点型）
- String（字符串）
- Boolean（布尔型）
- ID（唯一标识符类型）
- 自定义类型 例如：Date类型，只需实现相关的序列化，反序列化和验证的功能即可

##### 对象类型

我们可以根据需要将数据类型组合为对象这些统称为对象类型。

```
type Book {
    id:String
    title: String
    author: String
  }
复制代码
```

##### 其他类型

为了达到更好的代码复用GraphQl还提供更为复杂的接口类型这里面就不在一一赘述。

- Enumeration types（枚举类型）
- Union types（联合类型）
- Interface（接口）

### Query

```
// index.js
// 添加Schema
const typeDefs = gql`
  type Query {
    books: [Book],
    book(id : String) : Book
  }

  type Book {
    id:String
    title: String
    author: String
  }
`;


// 创建数据
const books = (
    () => Array(5).fill().map((v, i) => ({
        id: '' + i,
        title: 'Title' + i,
        author: 'Author' + i
    }))
)()

// 添加resolve
const resolvers = {
    Query: {
        
        books: () => books,
        book: (parent, { id }) => {
            return books.find(v => v.id === id)
        }
    },
}
复制代码
```

### Mutation

```
const typeDefs = gql`

  type Mutation {
    
    createBook(title: String, author: String): Book!,

    clearBook : Boolean
  }
`
resolvers.Mutation = {
    createBook: (parent, args) => {
        const book = { ...args, id: books.length + 1 + '' }
        books.push(book)
        return book
    },
    clearBook: () => {
        books.length = 0
        return true
    }
 }
复制代码
```

### Subscription

```
const { ApolloServer, gql, PubSub, withFilter } = require('apollo-server');
const typeDefs = gql`
  type Subscription {
    subsBooks : Boolean,
  }

`;
const pubsub = new PubSub()
resolvers.Mutation = {
    createBook: (parent, args) => {
        const book = { ...args, id: books.length + 1 + '' }
        books.push(book)
        // 发布订阅消息
        pubsub.publish('UPDATE_BOOK', {
            subsBooks: true
        })
        return book
    },
    clearBook: () => {
        books.length = 0
        // 发布订阅消息
        pubsub.publish('UPDATE_BOOK', {
            subsBooks: true
        })
        return true
    }
}
resolvers.Subscription = {
    subsBooks: {
        // 过滤不需要订阅的消息
        subscribe: withFilter(
            (parent, variables) => pubsub.asyncIterator('UPDATE_BOOK'),
            (payload, variables) => true
        )
    },
}

复制代码
```

## GraphQL客户端通讯(Axios)

#### Query

```
<script src="https://cdn.bootcss.com/axios/0.19.0/axios.min.js"></script>
<script>
  axios
    .post("http://localhost:4000/graphql", {
      query: `query {
        books {
          id
          title
          author
        }
      }`
    })
    .then(res => {
      console.log("res: ", res);
      document.writeln(JSON.stringify(res.data))
    });
</script>
复制代码
```

#### Mutataion

```
<script src="https://cdn.bootcss.com/axios/0.19.0/axios.min.js"></script>
<script>
  axios
    .post("http://localhost:4000/graphql", {
      query: `mutation($title:String,$author:String) {
        createBook(title:$title,author:$author){
          id
        }
      }`,
      variables: {
        title: "TTTTT",
        author: "AAAAA"
      }
    })
    .then(res => {
      console.log("res: ", res);
      document.writeln(JSON.stringify(res.data))
    });
</script>
复制代码
```

## GraphQL响应式数据应用

> [响应式 GraphQL 结构](https://github.com/xitu/gold-miner/blob/master/TODO/high-level-reactivity.md)

### ApolloClient (React)实现全局状态管理

> 参考文章 [www.zcfy.cc/article/the…](https://www.zcfy.cc/article/the-future-of-state-management-apollo-graphql-4779.html?t=)
>
> [前端数据管理Redux(指令时) vs Apollo(声明式)](https://juejin.im/post/5afe7a2c518825673b6243a6#heading-3)



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="811" height="413"></svg>)



在使用Apollo时我们可以尝试一种完全不同的前端数据管理方式，即声明式数据管理。在传统的项目中我们通常会将数据存放在Redux这样的统一状态管理模块中。利用ApolloClient通过GraphQL数据声明的方式管理数据。每个模块都可以根据自己的需求定制好自己想要的数据。

#### 数据连接Provider

```
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode >,
  document.getElementById('root')
);

复制代码
```

需要使用Subscription的时候需要符合连接

```
// Subscription
// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


// Subscription
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache
});

复制代码
```

#### Query

```
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const QUERY = gql`
    query {
        books {
            id,
            author,
            title
        }
    }
`;


function Query() {
    const { loading, error, data, refetch } = useQuery(QUERY)

    useEffect(() => {
        refetch()
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    console.log('book', data)
    const list = data.books.map(v => (
    <div>{v.author}: {v.title}</div>
    ))

    return list
}

export default Query;

复制代码
```

#### Mutation

```
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const CREATE_BOOK = gql`
    mutation CreateBook($title:String!,$author:String!){
        createBook(title:$title,author:$author){
            id,
            title,
            author
        }
    }
`;

const CLEAR_BOOK = gql`
    mutation {
        clearBook
    }
`;

function Mutation() {
    const [create, { data }] = useMutation(CREATE_BOOK);

    const [clear] = useMutation(CLEAR_BOOK)

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    create({
                        variables: {
                            "title": 'Title' + (Math.random() * 100).toFixed(),
                            "author": 'Author'+ (Math.random() * 100).toFixed()
                        }
                    });
                    console.log('mutation:',data)
                }}
            >
                
                <button type="submit">Create</button>
            </form>
            <button onClick={ clear }>Clear</button>
        </div>
    );
}

export default Mutation;

复制代码
```

#### Subscription

```
import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Query from './Query'

const subs = gql`
    subscription {
        subsBooks
    }
`;

function Subscription() {
    useSubscription(subs)
    return <Query/>
}

export default Subscription;

复制代码
```

## 附录

> Apollo资源参考这篇文章 [juejin.im/post/58fd6d…](https://juejin.im/post/58fd6d121b69e600589ec740#heading-17)

- 服务端
  - [GraphQL-JS] Node([github.com/graphql/gra…](https://github.com/graphql/graphql-js)) 最初实现
  - [graph-pack](https://github.com/glennreyes/graphpack) 支持热更新的零配置 GraphQL 服务环境
- 客户端
  - [Relay](https://relay.dev/) Facebook 的 GraphQL 工具。
- Prisma 弥合了数据库和GraphQL resolvers之间的鸿沟，让实现生产级别的GraphQL服务器变得更加容易。 除了强大的查询引擎和API，Prisma在开发体验方面尤为突出。[www.prisma.io/](https://www.prisma.io/)
- typeorm 直接复用typegraphql中创建的model