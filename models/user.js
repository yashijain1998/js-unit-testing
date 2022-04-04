const bcrypt = require('bcrypt');
const User = require("./userSchema")

const addUser = async (user)=> {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        const newUser = new User({
            email: user.email,
            name : user.name,
            password: hashPassword
        });
        const data = await newUser.save();
        return data.email;
    } catch(err) {
        if (err.code === 11000) {
            throw new Error('email must be unique');
        }
        throw new Error(err.message);
    }
}

const getUser = async(userData) => {
    try{
        const data = await User.findOne({ email: userData.email });
        if(data == null) {
            throw new Error('user is not present');
        }
        const validPassword = await bcrypt.compare(userData.password, data.password);
        if (!validPassword) {
            throw new Error("Invalid Password");
        }
        return data.email;
    } catch(err) {
        throw new Error(err.message);
    }
}

module.exports = { addUser, getUser }