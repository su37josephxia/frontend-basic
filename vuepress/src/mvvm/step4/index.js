function Vue(options) {
    var self = this;
    self.data = options.data;

    // 设置vm代理
    this.setproxy()

    observe(self.data)

    // 设置初始值
    Object.keys(self.data).forEach(function (key) {
        self[key] = self.data[key]
    })
}

Vue.prototype = {
    setproxy: function(){
        var self = this
        Object.keys(self.data).forEach(function (key) {
            Object.defineProperty(self, key, {
                emumerable: false,
                configurable: true,
                get: function () {
                    console.log('Do defineProperty getter')
                    return self.data[key];
                    // return document.getElementById(key).innerHTML;
                    
                },
                set: function (newVal) {
                    console.log('Do defineProperty setter',newVal)
                    self.data[key] = newVal;
                    // document.getElementById(key).innerHTML = newVal;
                }
            })
        })
    }
}