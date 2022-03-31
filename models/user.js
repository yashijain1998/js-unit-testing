const User = require("./userSchema")

const addUser = async (user)=> {
    try {
        const newUser = new User({
            name : user.name,
            password: user.password
        });
        return await newUser.save();
    } catch(err) {
        if (err.code === 11000) {
            throw new Error('name must be unique');
        }
        throw new Error(err.message);
    }
}

const getUser = async(userData) => {
    try{
        const data = await User.findOne({name:userData.name},'_id');
        if(data == null) {
            throw new Error('user is not present');
        }
        return data._id;
    } catch(err) {
        throw new Error(err.message);
    }
}

module.exports = { addUser, getUser }