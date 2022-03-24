const mongoose = require('mongoose');

const isValidId = (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Id ${id} is not valid`);
    }
}

module.exports = isValidId;