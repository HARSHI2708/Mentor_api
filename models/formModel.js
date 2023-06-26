const mongoose = require('mongoose')

const schoolSchema = mongoose.Schema(
    {
        school_name: {
            type: String,
            required: true,
        },
        rating: {
            type: String,
            required: true, 
        },
        address: {
            type: String,
            required: true,
            
        },
        email: {
            type: String,
            required: true,
        },
        phone_no: {
            type: String,
            required: true,
        }
    },
    
)


const School = mongoose.model('School', schoolSchema);

module.exports = School;