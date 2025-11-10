const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true,
        },
        productCode: {
            type: String,
            required: true,
        },

        productCategory: {
            type: String,
            required: true,
        },
        productImage: {
            type: String,
            required: true,
        },
        imagePublicId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', productSchema);
