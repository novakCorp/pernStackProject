const { Pool } = require("pg");

// Pool automatically knows that it must look for the environments variables if it does not have
// any values on its body
const pool = new Pool();

module.exports = {
    query: (text, params) => pool.query(text, params)
}