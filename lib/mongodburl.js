// mongodburl.js (c) 2000-2018 Felipe Crescencio and other contributors
// For further details and documentation:
// https://github.com/felipecrescencio/mongodburl-node

/**
 * <p>Application Configurations</p>
 *
 * <p>
 * The MongoDB URL module exports a singleton object that helps getting 
 * a MongoDB URL based on some premises.
 * </p>
 *
 * @module mongodburl
 * @class MongoDBServerGetter
 */

/**
 * <p>Get the MongoDBServerGetter object.</p>
 *
 * @method constructor
 * @return MongoDBServerGetter {object} - The top level getter object
 */
var MongoDBServerGetter = function() {
    var t = this;
};

/**
 * <p>Get a MongoDB URL connection</p>
 *
 * <p>
 * This will return the a MongoDB URL connection based on options object.
 * </p>
 *
 * @method getUrl
 * @param opts {object} - Additional options to fill the connection URL.
 * Possible options are:
 * username: Username to connect on mongodb server
 * password: Password to connect on mongodb server
 * server: Mongo DB server:port. IF this value is null, the environment variable MONGODB_SERVER will be returned. IF this value is either null, the default server:port "localhost:27017" will be returned.
 * database: Database name
 * replicaset: Replicaset name. More information https://docs.mongodb.com/manual/replication/.
 * socketTimeoutMS: The socketTimeoutMS sets the number of milliseconds a socket will stay inactive after the driver has successfully connected before closing .More information http://mongodb.github.io/node-mongodb-native/2.0/reference/faq/.
 * IF opts is null, the default return will be: server:port, considering MONGODB_SERVER environment variable if it exists.
 * @return value {string} - The mongodb url connection.
 */
MongoDBServerGetter.prototype.getUrl = function(opts) {
    var mongourl = "mongodb://";

    if(typeof opts !== "undefined") {
        if(opts['username'] && opts['password']){
            mongourl = `mongodb://${opts['username']}:${opts['password']}@`;
        }

        mongourl += `${opts['server'] || process.env.MONGODB_SERVER || "localhost:27017"}/`;

        if(opts['database']) {
            mongourl += `${opts['database']}?`;
        }

        if(opts['replicaset']) {
            mongourl += `replicaSet=${opts['replicaset']}`;

            if(opts['socketTimeoutMS']){
                mongourl += '&';
            }
        }

        if(opts['socketTimeoutMS']) {
            mongourl += `socketTimeoutMS=${opts['socketTimeoutMS']}`;
        }
    } else {
        var mserver2 = process.env.MONGODB_SERVER || "localhost:27017";
        mongourl += mserver2 + "/";
    }

    return mongourl;
};

// Instantiate and export
var mongo = module.exports = new MongoDBServerGetter();
