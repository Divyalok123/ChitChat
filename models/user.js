const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const multer = require('multer');
const path = require('path');

const AVATAR_PATH = '/uploads/avatars';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        unique: true
    },
    desc: {
        type: String
    }
}, { timestamps: true});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

userSchema.statics.multerUpload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000,
    },
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|svg|gif/;
        const extension = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        
        if(mimetype && extension) 
            cb(null, true);
        else
            cb("File type not supported");
    }
}).single('avatar');

userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);
module.exports = User;
