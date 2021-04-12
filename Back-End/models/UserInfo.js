import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userInfoSchema = mongoose.Schema({

    FirstName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Mobile:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Role:{
        type: String,
        required: true
    },
    
    
    
    saltSecret: String

});

userInfoSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.Password, salt, (err, hash) => {
            this.Password = hash;
            this.saltSecret = salt;
              next();
        });
    });
});

export default mongoose.model('UserInfo', userInfoSchema);