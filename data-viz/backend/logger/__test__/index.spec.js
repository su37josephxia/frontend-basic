test('writeLine ',() => {
    const {writeLine} = require('../index')
    writeLine(__dirname + '/abc.log',JSON.stringify({data:new Date()}))
    writeLine(__dirname + '/abc.log',JSON.stringify({data:new Date()}))
})