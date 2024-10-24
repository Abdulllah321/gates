import dbConnect from "@/utils/dbConnect"; // Assuming you have a dbConnect function
import Order from "@/models/Orders";
import nodemailer from "nodemailer";
import { generateEmailTemplate } from "../route";

export async function GET(request, { params }) {
  await dbConnect();
  const order = await Order.findById(params.orderId); 
  console.log(order)
  if (!order) {
    return new Response("Order not found", { status: 404 });
  }
  return new Response(JSON.stringify(order), { status: 200 });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const body = await request.json();

  const updatedOrder = await Order.findByIdAndUpdate(params.orderId, body, {
    new: true,
  });

  // Send email notification for the updated order
  await sendOrderEmail(updatedOrder, "updated");

  return new Response(JSON.stringify(updatedOrder), { status: 200 });
}

export async function DELETE(request, { params }) {
  await dbConnect();

  const deletedOrder = await Order.findByIdAndDelete(params.orderId);
  if (!deletedOrder) {
    return new Response("Order not found", { status: 404 });
  }

  // Send email notification for the deleted order
  await sendOrderEmail(deletedOrder, "deleted");

  return new Response(JSON.stringify(deletedOrder), { status: 200 });
}

async function sendOrderEmail(order, action) {
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: order.customer.email,
    subject: `Order ${
      action.charAt(0).toUpperCase() + action.slice(1)
    } Notification`,
    html: generateEmailTemplate(order, action),

  };

  await transporter.sendMail(mailOptions);
}
