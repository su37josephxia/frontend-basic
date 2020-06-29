function Observer(data) {
    this.data = data
    this.walk(data)

}
Observer.prototype = {
    walk: function (data) {
        var self = this
        console.log('Observer walk ....', data)
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data, key, data[key]);
        })

    },
    defineReactive: function (data, key, val) {
        var publisher = new Publisher()

        publisher.addOb(new Subscribe(key))

        Object.defineProperty(data, key, {
            emumerable: false,
            configurable: true,
            get: function getter() {
                console.log('*******sObserver definReactive get')
                // if (Dep.target) {
                //     dep.addSub(Dep.target);
                // }
                return val;
            },
            set: function (newVal) {
                console.log('Observer definReactive set', newVal, val)
                // if (newVal === val) {
                //     return;
                // }
                val = newVal;
                publisher.setState(newVal);
            }
        })
        console.log('Publisher:', publisher)
    }

}

//发布者
function Publisher(key) {
    
    this.observers = [];
    this.state = "";
}

Publisher.prototype.addOb = function (observer) {
    var flag = false;
    for (var i = this.observers.length - 1; i >= 0; i--) {
        if (this.observers[i] === observer) {
            flag = true;
        }
    };
    if (!flag) {
        this.observers.push(observer);
    }
    return this;
}

Publisher.prototype.removeOb = function (observer) {
    var observers = this.observers;
    for (var i = 0; i < observers.length; i++) {
        if (observers[i] === observer) {
            observers.splice(i, 1);
        }
    };
    return this;
}

Publisher.prototype.notice = function () {
    
    console.log('Publish notice',this.state)
    var observers = this.observers;
    for (var i = 0; i < observers.length; i++) {
        observers[i].update(this.key,this.state);
    };
}

Publisher.prototype.setState =function(value){
    this.state = value;
    this.notice();
}

//订阅者(也可以认为是Vue中的Watcher)
function Subscribe(key) {
    this.key = key
    var self = this
    this.update = function (key,data) {
        console.log('Subscribe update:', data);
        document.getElementById(self.key).innerHTML = data;
    };
}


function observe(value, vm) {
    if (!value || typeof value != 'object') {
        return;
    }
    return new Observer(value)
}