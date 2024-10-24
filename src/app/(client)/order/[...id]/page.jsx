"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkedAlt,
  FaCreditCard,
} from "react-icons/fa";

const OrderDetail = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();
      setOrder(data);
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner className="text-yellow-400" />
      </div>
    );
  }

  const totalAmount = order.items.reduce(
    (acc, item) => acc + parseFloat(item.price),
    0
  );

  const renderOrderItem = (item) => (
    <div
      key={item._id}
      className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg shadow-md mb-4 transition duration-300 ease-in-out hover:shadow-lg"
    >
      <div className="flex items-center">
        {item.type === "product" && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            className="object-cover w-24 h-24 rounded-md border border-yellow-500"
            width={80}
            height={80}
          />
        )}
        <div className="ml-4">
          {item.type === "product" && (
            <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
          )}
          {item.type === "gate" || item.type === "fence" ? (
            <h3 className="text-lg font-semibold text-yellow-700">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}{" "}
              Configuration
            </h3>
          ) : null}
          <p className="text-sm text-yellow-600 font-bold">
            ${parseFloat(item.price).toFixed(2)}
          </p>
          {item.description && (
            <p className="text-xs text-gray-500">{item.description}</p>
          )}
          {item.type === "gate" || item.type === "fence" ? (
            <p className="text-xs text-gray-600">
              {formatGateFenceTitle(item)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );

  const formatGateFenceTitle = (item) => {
    const kitType = item.kitValue.selected === 1 ? "Swing" : "Slide";
    const panelType = item.panelValue.selected === 0 ? "Single" : "Dual";
    const styleType =
      ["Rectangular", "Arch", null, null, "Center Peak", "Sectional"][
        item.selectedStyle.selected
      ] || "Unknown";
    const picketType = [
      null,
      "Cedar Wood",
      "Treated Pine White",
      "Red Wood",
      "Hard Wood South",
    ][item.selectedPicket.selected];
    const accessType = ["New Post", "InHouse Post System", "Retrofit"][
      item.selectedAccess.selected
    ];
    const ironWood = ["Metal Frame", "Fill Material"][
      item.selectedIronWood.selected
    ];

    return `${item.ft}ft ${item.inch}in, ${kitType}, ${panelType} ${
      item.panelValue.selected === 0 ? item.panelValue.direction : ""
    } ${styleType} ${picketType}, ${ironWood}, ${
      item.selectedIronWood.selected === 0
        ? item.selectedIronWood.subOption
        : ""
    }, ${item.selectedIronWood.color || ""}, ${
      item.selectedIronWood.finish || ""
    }, ${accessType}`;
  };

  return (
    <div className="container p-6 mx-auto bg-yellow-50 rounded-lg shadow-lg text-gray-800 my-10">
      <h1 className="my-8 text-4xl font-bold text-yellow-700 text-center">
        Order Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="my-6 p-4 bg-yellow-50 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-yellow-600">
            <FaUser className="inline mr-2" /> Customer Information
          </h2>
          <p>
            <strong>Name:</strong> {order.customer.first_name}{" "}
            {order.customer.last_name}
          </p>
          <p>
            <strong>Email:</strong> <FaEnvelope className="inline mr-1" />{" "}
            {order.customer.email}
          </p>
          <p>
            <strong>Phone:</strong> <FaPhone className="inline mr-1" />{" "}
            {order.customer.phone}
          </p>
        </div>

        <div className="my-6 p-4 bg-yellow-50 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-yellow-600">
            <FaMapMarkedAlt className="inline mr-2" /> Shipping Address
          </h2>
          <p>
            <strong>Street:</strong> {order.shipping_address.street}
          </p>
          <p>
            <strong>City:</strong> {order.shipping_address.city}
          </p>
          <p>
            <strong>State:</strong> {order.shipping_address.state}
          </p>
          <p>
            <strong>Zip Code:</strong> {order.shipping_address.zip_code}
          </p>
        </div>

        <div className="my-6 p-4 bg-yellow-50 rounded-lg shadow md:col-span-2">
          <h2 className="text-2xl font-semibold text-yellow-600">
            <FaCreditCard className="inline mr-2" /> Billing Address
          </h2>
          <p>
            <strong>Same as Shipping:</strong>{" "}
            {order.billing_address.same_as_shipping ? "Yes" : "No"}
          </p>
          {!order.billing_address.same_as_shipping && (
            <>
              <p>
                <strong>Street:</strong> {order.billing_address.street}
              </p>
              <p>
                <strong>City:</strong> {order.billing_address.city}
              </p>
              <p>
                <strong>State:</strong> {order.billing_address.state}
              </p>
              <p>
                <strong>Zip Code:</strong> {order.billing_address.zip_code}
              </p>
            </>
          )}
        </div>

        <div className="my-6 p-4 bg-yellow-50 rounded-lg shadow md:col-span-2">
          <h2 className="text-2xl font-semibold text-yellow-600">
            Ordered Items
          </h2>
          {order.items.map(renderOrderItem)}
        </div>
      </div>

      <div className="mt-4 text-3xl font-bold text-yellow-700 text-center">
        Total Amount:{" "}
        <span className="text-yellow-600">${totalAmount.toFixed(2)}</span>
      </div>

      <div className="footer mt-8 text-center">
        <p className="text-sm text-gray-600">
          Thank you for your order! If you have any questions, feel free to
          contact us.
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;
