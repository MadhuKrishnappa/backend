const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : ''
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
        required : true
    },
    countInStock : Number,
    isFeatured : {
        type : Boolean,
        default : true
    },
    dateCreated : {
        type : Date,
        default : Date.now
    }
})

productSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
productSchema.set('toJSON', {
    virtuals : true
})

exports.Product = mongoose.model('products',productSchema)