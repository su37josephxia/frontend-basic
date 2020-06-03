/**
 * 创建于 2019-03-07
 * 作者: SHERlocked93
 * 功能: 封装常用数据库操作
 */

const MongoClient = require('mongodb').MongoClient
const { DB_URL, DEFAULT_BASE } = require('./setting.js')

/**
 * 数据库连接
 * @param callback
 * @private
 */
function _connectDB(callback) {
    MongoClient.connect(DB_URL, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            console.log('😱 数据库连接出错 ！')
            callback(err, null)
            return
        }
        callback(err, db.db(DEFAULT_BASE))
        db.close()
    })
}

/**
 * 查询数据，如果成功则返回一个数组
 * @param collectionName
 * @param data
 * @param callback
 */
exports.find = function(collectionName, data, callback) {
    _connectDB((err, db) =>
        db.collection(collectionName)
            .find(data)
            .toArray((err, result) => {
                if (err) throw err
                callback(result)
            })
    )
}

/**
 * 查询数据，如果成功则返回一个数组
 * @param collectionName
 * @param data
 * @param callback
 */
exports.findOne = function(collectionName, data, callback) {
    _connectDB((err, db) =>
        db.collection(collectionName)
            .findOne(data, (err, result) => {
                if (err) throw err
                callback(result)
            })
    )
}

/**
 * 插入一条数据，如果成功就把插入的数据返回
 * @param collectionName
 * @param data
 * @param callback
 */
exports.insertOne = function(collectionName, data, callback) {
    _connectDB((err, db) =>
        db.collection(collectionName)
            .insertOne(data, (err, result) => {
                if (err) throw err
                callback(data)
            })
    )
}

/**
 * 删除单个用户，如果成功就把删除的用户返回
 * @param collectionName
 * @param data
 * @param callback
 */
exports.deleteOne = function(collectionName, data, callback) {
    _connectDB((err, db) =>
        db.collection(collectionName)
            .deleteOne(data, (err, results) => {
                    if (err) throw err
                    callback(data)
                }
            )
    )
}

/**
 * 更新单个用户，如果成功把更改之后的用户信息返回
 * @param collectionName
 * @param data
 * @param targ
 * @param callback
 */
exports.updateOne = function(collectionName, data, targ, callback) {
    _connectDB((err, db) =>
        db.collection(collectionName)
            .updateOne(data, targ, (err, results) => {
                if (err) throw err
                callback(targ['$set'])
            })
    )
}
