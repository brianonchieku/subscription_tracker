import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'price must be greater than 0'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'KES'],
        default: 'KES',
    },
    frequency: {
        type: String,
        enum: ['daily', 'monthly', 'yearly', 'weekly'],
    },
    catergory: {
        type: String,
        enum: ['entertainment', 'education', 'productivity', 'health', 'sports', 'news', 'lifestyle', 'technology', 'other'],
        required: true,
    }, 
    paymentMethod: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'canceled'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past'
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
    
}, { timestamps: true });

//auto calculate renewal date if missing and before  document is saved
subscriptionSchema.pre('save', function (next) {

    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //auto update status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;  