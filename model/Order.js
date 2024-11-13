import mongoose, { mongo } from "mongoose";

const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNum = Math.floor(1000 + Math.random() * 9000);

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [
        {
            type: Object,
            required: true
        }
    ],
    shipppingAddress: {
        type: Object
    },
    orderNumber: {
        type: String,
        default: randomTxt + randomNum
    },
    paymentStatus: {
        type: String,
        default: "Not paid"
    },
    totalPrice: {
        type: Number,
        default: 0.0    
    },
    paymentMethod: {
        type: String,
        default: "Not specified"
    },
    currency: {
        type: String,
        default: "Not specified"
    },
    //for Admin
    status: {
        type: String,
        default: "pending",
        enum: ['pending', 'processing', 'shipped', 'delivered']
    }
})

const Order = mongoose.model('Order', OrderSchema);

export default Order;