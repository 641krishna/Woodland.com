const { connect } = require('mongoose');

require('dotenv').config();

const connection = async () => {
    return await connect(process.env.MONGO_URL)
};

module.exports = connection;