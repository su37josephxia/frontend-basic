function Compile(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {

    init: function () {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        } else {
            console.log('Dom元素不存在')
        }
    },

    nodeToFragment: function (el) {
        // 建立代码片段
        var fragment = document.createDocumentFragment()
        var child = el.firstChild;
        while (child) {
            // 将Dom元素移入fragment中
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment
    },
    
    compileElement: function (el) {
        var childNodes = el.childNodes;
        var self = this;
        [].slice.call(childNodes).forEach(function (node) {
            // 是否为指令即{{}}
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;
            if (self.isElementNode(node)) {
                self.compile(node);
            }
            // else if (self.isTextNode(node) && reg.test(text)) {
            //     self.compileText(node, reg.exec(text)[1]);
            // }
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node)
            }
        })
    },
    compile: function (node) {

        var publisher = new Publisher()

        console.log('compile:', node, node.attributes)
        var nodeAttrs = node.attributes;
        var self = this;
        Array.prototype.forEach.call(nodeAttrs, function (attr) {
            var attrName = attr.name;
            if (attr.name === 'id') {
                var key = node.getAttribute(attr.name)

                console.log('Compile:', key, self.vm,self.vm[key])
                self.vm[key] = self.vm.data[key]

            }
        })
    },
    isElementNode: function (node) {
        // console.log('nodetype', node.nodeType)
        return node.nodeType === 1
    },
    // input便签 v-mode
    // compileModel: function (node, vm, exp, dir) {
    //     var self = this;
    //     var val = this.vm[exp]
    //     this.modelUpdater(nade, val);
    //     newWatcher(this.vm, exp, function () {
    //         self.modelUpdater(node, value)
    //     });
    //     node.addEventListener('input', function (e) {
    //         var newValue = e.target.value;
    //         if (val == newValue) {
    //             return
    //         }
    //         self.vm[exp] = newValue;
    //         val = newValue;
    //     })
    // },
    // compileText: function (node, exp) {
    //     var self = this;
    //     var initText = this.vm[exp]
    //     this.updateText(node, initText);
    //     new Watcher(this.vm, exp, function (value) {
    //         self.updateText(node, value)
    //     })
    // },
    // compileEvent:function(node,vm,exp,dir){
    //     var eventType = dir.split(':')[1];
    //     // ...
    // }
    // ,


}