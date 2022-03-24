const User = require("./userSchema")

const addUser = async (user)=> {
    try {
        const newUser = new User({
            name : user.name,
            password: user.password
        });
        return await newUser.save();
    } catch(e) {
        throw new Error(e);
    }
}

module.exports = { addUser }