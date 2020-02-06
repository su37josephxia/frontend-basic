const ErrorStackParser = require('error-stack-parser')

const e = new Error()
e.stack = `ReferenceError: abc is not defined
at a.mounted (http://127.0.0.1:8080/js/app.da6dfe65.js:1:4184)
at ne (http://127.0.0.1:8080/js/chunk-vendors.323a78cd.js:7:11677)
at Un (http://127.0.0.1:8080/js/chunk-vendors.323a78cd.js:7:29146)
at Object.insert (http://127.0.0.1:8080/js/chunk-vendors.323a78cd.js:7:20797)
at T (http://127.0.0.1:8080/js/chunk-vendors.323a78cd.js:7:47566)
at xr.__patch__ (http://127.0.0.1:8080/js/chunk-vendors.323a78cd.js:7:48882)
at xr.In.t._update (http://127.0.0.1:8080/js/chunk-vendors.323a78cd.js:7:27009)
at xr.r (http://127.0.0.1:8080/js/chunk-vendors.323a78cd.js:7:27815)
at nr.get (http://127.0.0.1:8080/js/chunk-vendors.323a78cd.js:7:30685)
at new nr (http://127.0.0.1:8080/js/chunk-vendors.323a78cd.js:7:30603)`

const a = ErrorStackParser.parse(e)

console.log(a)