import dbConnect from "@/utils/dbConnect";
import Order from "@/models/Orders";
import nodemailer from "nodemailer";

// Email Template Function
// Email Template Function
export function generateEmailTemplate(order, action) {
  const itemsHtml = order.items
    .map(item => {
      if (item.type === "product") {
        return `
          <tr>
            <td style="padding: 10px; text-align: left;">
              <img src="${item.imageUrl}" alt="${item.name}" style="width: 100px; height: auto; border-radius: 5px;" />
            </td>
            <td style="padding: 10px; text-align: left;">
              <strong>${item.name}</strong><br>
              <p style="margin: 5px 0; color: #555;">${item.description}</p>
              <p style="margin: 5px 0; font-weight: bold;">Price: $${parseFloat(item.price).toFixed(2)}</p>
            </td>
          </tr>`;
      } else if (["gate", "fence"].includes(item.type)) {
        const title = formatGateFenceTitle(item); // Use your formatting function
        return `
          <tr>
            <td colspan="2" style="padding: 10px; text-align: left;">
              <div style="background-color: #2d3748; padding: 10px; border-radius: 5px;">
                <h3 style="color: #ecc94b;">${item.type.charAt(0).toUpperCase() + item.type.slice(1)} Configuration</h3>
                <p style="margin: 5px 0; color: #fff;">${title}</p>
                <p style="margin: 5px 0; font-weight: bold; color: #ecc94b;">Price: $${parseFloat(item.price).toFixed(2)}</p>
              </div>
            </td>
          </tr>`;
      }
      return '';
    })
    .join('');

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Order Confirmation</title>
      <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
          h1 { color: #333; text-align: center; }
          .section { margin: 20px 0; }
          .section h2 { font-size: 18px; margin-bottom: 10px; color: #555; }
          .info { margin-bottom: 15px; }
          .info p { margin: 5px 0; line-height: 1.5; }
          .items { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
          .items th, .items td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .items th { background-color: #f2f2f2; }
          .total { font-size: 20px; font-weight: bold; margin-top: 10px; text-align: right; }
          .footer { text-align: center; font-size: 12px; color: #777; }
          @media (max-width: 600px) {
            .container { padding: 10px; }
            h1 { font-size: 24px; }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Order Confirmation</h1>
          <div class="section">
              <h2>Customer Information</h2>
              <div class="info">
                  <p><strong>Name:</strong> ${order.customer.first_name} ${order.customer.last_name}</p>
                  <p><strong>Email:</strong> ${order.customer.email}</p>
                  <p><strong>Phone:</strong> ${order.customer.phone}</p>
              </div>
          </div>
          <div class="section">
              <h2>Shipping Address</h2>
              <div class="info">
                  <p><strong>Street:</strong> ${order.shipping_address.street}</p>
                  <p><strong>City:</strong> ${order.shipping_address.city}</p>
                  <p><strong>State:</strong> ${order.shipping_address.state}</p>
                  <p><strong>Zip Code:</strong> ${order.shipping_address.zip_code}</p>
              </div>
          </div>
          <div class="section">
              <h2>Billing Address</h2>
              <div class="info">
                  <p><strong>Same as Shipping:</strong> ${order.billing_address.same_as_shipping ? "Yes" : "No"}</p>
                  ${!order.billing_address.same_as_shipping ? `
                  <p><strong>Street:</strong> ${order.billing_address.street}</p>
                  <p><strong>City:</strong> ${order.billing_address.city}</p>
                  <p><strong>State:</strong> ${order.billing_address.state}</p>
                  <p><strong>Zip Code:</strong> ${order.billing_address.zip_code}</p>
                  ` : ""}
              </div>
          </div>
          <div class="section">
              <h2>Order Summary</h2>
              <table class="items">
                  <thead>
                      <tr>
                          <th style="padding: 10px; text-align: left;">Item</th>
                          <th style="padding: 10px; text-align: left;">Details</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${itemsHtml}
                  </tbody>
              </table>
              <div class="total">
                  <p>Total Amount: $${order.total_amount.toFixed(2)}</p>
              </div>
          </div>
          <div class="footer">
              <p>Thank you for your order! Status: ${action.charAt(0).toUpperCase() + action.slice(1)}</p>
              <p>If you have any questions, feel free to contact us at <a href="mailto:support@standardgates.com">support@standardgates.com</a>.</p>
          </div>
      </div>
  </body>
  </html>
  `;
}

const formatGateFenceTitle = (item) => {
  const kitType = item.kitValue.selected === 1 ? "Swing" : "Slide";
  const panelType = item.panelValue.selected === 0 ? "Single" : "Dual";
  const styleType =
    item.selectedStyle.selected === 0
      ? "Rectangular"
      : item.selectedStyle.selected === 1
      ? "Arch"
      : item.selectedStyle.selected === 4
      ? "Center Peak"
      : item.selectedStyle.selected === 5
      ? "Sectional"
      : null;
  const picketType = {
    1: "Cedar Wood",
    2: "Treated Pine White",
    3: "Red Wood",
    4: "Hard Wood Southe",
  }[item.selectedPicket.selected];
  const accessType = {
    0: "New Post",
    1: "InHouse Post System",
    2: "Retrofit",
  }[item.selectedAccess.selected];
  const ironWood = {
    0: "Metal Frame",
    1: "Fill Material",
  }[item.selectedIronWood.selected];

  return `${item.ft}ft ${item.inch}in, ${kitType}, ${panelType} ${item.panelValue.selected === 0 ? item.panelValue.direction : ""} ${styleType} ${picketType}, ${ironWood}, ${item.selectedIronWood.selected == 0 ? item.selectedIronWood.subOption : null}, ${item.selectedIronWood.color || ""}, ${item.selectedIronWood.finish || ""}, ${accessType}`;
};



export async function GET(request) {
  await dbConnect();
  const orders = await Order.find();
  return new Response(JSON.stringify(orders), { status: 200 });
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();

  const newOrder = new Order(body);
  await newOrder.save();

  await sendOrderEmail(newOrder, "created");

  return new Response(JSON.stringify(newOrder), { status: 201 });
}

async function sendOrderEmail(order, action) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailHTML = generateEmailTemplate(order, action);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: order.customer.email,
    subject: `Order ${
      action.charAt(0).toUpperCase() + action.slice(1)
    } Notification`,
    html: emailHTML,
  };

  await transporter.sendMail(mailOptions);
}
