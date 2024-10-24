const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      description: "Unique identifier for the order.",
    },
    customer: {
      first_name: {
        type: String,
        required: true,
        trim: true,
      },
      last_name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please enter a valid email address."],
      },
      phone: {
        type: String,
        trim: true,
      },
    },
    shipping_address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
      zip_code: {
        type: String,
        required: true,
        trim: true,
      },
    },
    billing_address: {
      same_as_shipping: {
        type: Boolean,
        default: true,
      },
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      zip_code: {
        type: String,
        trim: true,
      },
    },
    images: {
      type: [String],
      description: "Array of image URLs uploaded by the customer.",
    },
    requests: {
      type: String,
      trim: true,
    },
    upgrades: [
      {
        upgrade_type: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],
    shipping: {
      estimated_shipping_time: {
        type: String,
        trim: true,
      },
      shipping_cost: {
        type: Number,
        default: 0,
      },
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    total_amount: {
      type: Number,
      required: true,
      min: 0,
    },
    items: [
      {
        type: mongoose.Schema.Types.Mixed, 
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
