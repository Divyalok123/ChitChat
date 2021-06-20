const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
    let allusers = await User.find({});
    
    res.render('chatroom', {
        title: 'Chatroom | Chitchat',
        users: allusers
    });
}

module.exports.getDetails = async (req, res) => {
    let thisuser = await User.findOne({_id: req.query.userid});
    return res.status(200).json(thisuser);
}