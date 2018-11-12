# MongoDB URL
The MongoDB URL module exports a singleton object that helps getting  a MongoDB URL based on some premises.

## Get a MongoDB URL connection
This will return the a MongoDB URL connection based on options object.

### Quick Start
Consider set a MONGODB_SERVER environment variable and assign to it:
- The MongoDB server:port
- The MongoDB replicaset server1:port1,server2:port2,server3:port3,server4:port4

```shell
$ npm i @felipecrescencio/mongodburl
$ export MONGODB_SERVER=10.0.0.1:27017,10.0.0.2:27017
```

**Use mongodburl in your code:**
```js
var mongourl = require('@felipecrescencio/mongodburl');

console.log("Default: "+ mongourl.getUrl());
// Output: Default: mongodb://10.0.0.1:27017,10.0.0.2:27017/
console.log("User/pass params: "+ mongourl.getUrl({username: "user", password: "pass"}));
// Output: User/pass params: mongodb://user:pass@10.0.0.1:27017,10.0.0.2:27017/
console.log("Other params: "+ mongourl.getUrl({database: "customers", replicaset: "rs46", socketTimeoutMS: 600000}));
// Output: Other params: mongodb://10.0.0.1:27017,10.0.0.2:27017/customers?replicaSet=rs46&socketTimeoutMS=600000
mongodb.connect(mongourl);
//...
```

**Without MONGODB_SERVER environment variable**

If no MONGODB_SERVER environment variable was assigned, it will return the default value localhost:27017.

```shell
$ npm i @felipecrescencio/mongodburl
```

**In your code:**
```js
var mongourl = require('@felipecrescencio/mongodburl');

console.log("Default: "+ mongourl.getUrl());
// Output: Default: mongodb://localhost:27017/
console.log("User/pass params: "+ mongourl.getUrl({username: "user", password: "pass"}));
// Output: User/pass params: mongodb://user:pass@localhost:27017/
console.log("Other params: "+ mongourl.getUrl({database: "customers", replicaset: "rs46", socketTimeoutMS: 600000}));
// Output: Other params: mongodb://localhost:27017/customers?replicaSet=rs46&socketTimeoutMS=600000
mongodb.connect(mongourl);
//...
```
