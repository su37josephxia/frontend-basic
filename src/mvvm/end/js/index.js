function Vue(options) {
    var self = this;
    this.data = options.data;
    this.methods = options.methods;

    Object.keys(this.data).forEach(function (key) {
        self.proxyKey(key); // 为每个属性添加代理
    })

    observe(this.data);
    new Compile(options.el, this);
    options.mounted.call(this)
}

Vue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            emumerable: false,
            configurable: true,
            get: function () {
                return self.data[key];
            },
            set: function (newVal) {
                self.data[key] = newVal;
            }
        })
    }
}