const DbConn = require('./connect')

const DB_USERS = 'users'

/**
 * 用户查询
 * @param data
 * @returns {Promise}
 */
const findUsers = data =>
    new Promise(resolve => DbConn.find(DB_USERS, data, resolve))

/**
 * 单个用户查询
 * @param data
 * @returns {Promise}
 */
const findUser = data =>
    new Promise(resolve => DbConn.findOne(DB_USERS, data, resolve))

/**
 * 创建用户
 * @param id
 * @param name
 * @param email
 * @param age
 * @returns {Promise}
 * @param gender
 */
const createUser = ({ id, name, email, age, gender }) =>
    new Promise(resolve => DbConn.insertOne(DB_USERS, { id, name, email, age, gender }, resolve))

/**
 * 删除用户
 * @param id
 * @param name
 * @returns {Promise}
 */
const deleteUser = ({ id }) =>
    new Promise(resolve => DbConn.deleteOne(DB_USERS, { id }, resolve))

/**
 * 更新用户
 * @param id
 * @param name
 * @returns {Promise}
 * @param email
 * @param age
 * @param gender
 */
const updateUser = ({ id, name, email, age, gender }) =>
    new Promise(resolve => DbConn.updateOne(DB_USERS, { id }, { $set: { id, name, email, age, gender } }, resolve))

module.exports = {
    users: findUsers,
    user: findUser,
    createUser,
    deleteUser,
    updateUser
}
