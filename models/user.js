const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    passwordHash : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true,
    },
    isAdmin : {
        type: Boolean,
        default: false
    },
    email: {
        type : String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

userSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
userSchema.set('toJSON', {
    virtuals : true
})
exports.User = mongoose.model('user',userSchema);
exports.userSchema = userSchema;