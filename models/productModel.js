const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    product_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: String,
        trim: true,
        required: true
    },
    old_price:{
        type: String,
        trim: true,
        required: false
    },
    description:{
        type: String,
        required: true
    },
    discount:{
        type: String,
        required: false
    },
    image01:{
        type: Object,
        required: true
    },
    image02:{
        type: Object,
        required: false
    },

    category:{
        type: String,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    },
    sold:{
        type: Number,
        default: 0
    },
    color:{
        type:Array,
        required: true,
    },
    size:{
        type:Array,
        required: true,
    },
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Products", productSchema)