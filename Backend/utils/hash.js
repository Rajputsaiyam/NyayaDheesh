const crypto = require('crypto');


/**
 * @function hash
 * @param {string} data 
 * @param {string} salt
 * @param {string} algorithm
 * @returns {string} 
 */
function hash(data,salt, algorithm='sha256'){
    console.log("In hash ");
    console.log(crypto.createHmac(algorithm,salt).update(data).digest('hex'));

    return crypto.createHmac(algorithm,salt).update(data).digest('hex');
}

module.exports = hash;