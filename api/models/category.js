const mongoose = require('mongoose');

const cagegorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model('Category', cagegorySchema);