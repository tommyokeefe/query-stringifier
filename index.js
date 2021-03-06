'use strict';

// Create our constructor
const QueryString = function () {};

// Add the query stringify method
// Arguments:
//  @params - OBJECT - An object of parameters to be built into a query string
QueryString.prototype.stringify = function (params, options) {

    // If the options parameter was not defined then create it with some default values.
    if (options === undefined) {
        options = {
            prefix: ''
        };
    }

    // Create an array that will hold the stringified parameters
    // Each element will be key value pair like 'foo=bar'
    const queryStringArray = [];

    // Iterate through the parameters object that was passed to the method
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            // If the element is an array then loop through it
            if (Array.isArray(params[key]) === true) {
                queryStringArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key].join(',')));
            } else {
                // Add the URI encoded key and value to the array separated by an equals
                queryStringArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
            }
        }
    }

    // If the parameters object was blank for some reason then we return a blank string
    if (queryStringArray.length === 0) {
        return '';
    }

    // Otherwise return the query string prefixed with the options.prefix
    return options.prefix + queryStringArray.join('&');
};

// Arguments:
// @params - STRING - The query string to parse into an object
QueryString.prototype.parse = function (queryStr) {
    let obj = Object.create(null);

    if (typeof queryStr !== 'string') {
        return obj;
    }

    queryStr = queryStr.trim().replace(/^(\?|&|#)/, '');

    queryStr.split('&').forEach((param) => {
        const components = param.split('=');

        obj[decodeURIComponent(components[0])] = decodeURIComponent(components[1]);
    });

    return obj;
}

// Export the module
module.exports = new QueryString();