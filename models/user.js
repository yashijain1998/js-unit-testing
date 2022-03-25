const User = require("./userSchema")

const addUser = async (user)=> {
    try {
        const newUser = new User({
            name : user.name,
            password: user.password
        });
        return await newUser.save();
    } catch(err) {
        throw new Error(err.message);
    }
}

const getUser = async(userData) => {
    try{
        const {_id} = await User.findOne({name:userData.name},'_id');
        if(_id == null) {
            throw new Error('user is not present');
        }    
        return _id;
    } catch(err) {
        throw new Error(err.message);
    }
}

module.exports = { addUser, getUser }