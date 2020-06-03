/**
 * 创建于 2019-03-10
 * 作者: SHERlocked93
 * 功能: resolvers 实现
 */

import merge from 'lodash/merge'

import Hello from './Hello.js'
import Query from './Query.js'
import Mutation from './Mutation.js'
import Subscription from './Subscription.js'

const PureObj = Object.create(null)

export default merge(PureObj, Hello, Query, Mutation, Subscription)
