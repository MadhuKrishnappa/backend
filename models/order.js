const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    name : String
})

orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
orderSchema.set('toJSON', {
    virtuals : true
})

exports.Order = mongoose.model('order',orderSchema)