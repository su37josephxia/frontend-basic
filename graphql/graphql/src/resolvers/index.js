
// import Db from '../db'

const Db = {
    user : id => ({
        "id": "2",
        "name": "李四",
        "email": "mmmmm@qq.com",
        "age": 18
      }),
    users : () => ([{
        "id": "1",
        "name": "张三"
      },{
        "id": "2",
        "name": "李四"
      }])
}

export default {
    Query: {
        hello: () => 'Hello world!',
        user: (parent, { id }) => Db.user({ id }),
        users: (parent, args) => Db.users({})

    }
}