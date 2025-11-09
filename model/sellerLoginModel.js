const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true, // ✅ ensures no duplicate emails
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Middleware to limit to only one admin account
userSchema.pre('save', async function (next) {
  const Seller = mongoose.model('sellerLogin');
  
  // If it's a new document (not updating)
  if (this.isNew) {
    const existingAdmin = await Seller.countDocuments();
    if (existingAdmin > 0) {
      const err = new Error('Only one admin account is allowed.');
      return next(err);
    }
  }

  next();
});

module.exports = mongoose.model('sellerLogin', userSchema);
