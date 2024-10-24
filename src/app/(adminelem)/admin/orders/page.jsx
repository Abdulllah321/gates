"use client";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { DotLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader"; // Ensure you've installed react-spinners

const Orders = () => {
  const { push } = useRouter();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null); // Track the order to delete
  const itemsPerPage = 3; // Adjust the number of orders per page

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filtered orders based on the search term
  const filteredOrders = orders.filter((order) =>
    `${order.customer.first_name} ${order.customer.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  // Handle status update on double click
  const handleStatusUpdate = async (order, newStatus) => {
    setUpdatingOrderId(order._id); // Set the order being updated
    try {
      // Make an API call to update the order status
      const response = await fetch(`/api/orders/${order._id}`, {
        method: "PUT", // Use PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        // Update the local orders state with the updated order
        setOrders((prevOrders) =>
          prevOrders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
        );
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setUpdatingOrderId(null); // Reset the updating order ID
    }
  };

  const handleDeleteOrder = async (order) => {
    try {
      const response = await fetch(`/api/orders/${order._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.filter((o) => o._id !== order._id)
        );
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-xl text-gray-300 my-10">
      <h1 className="text-4xl font-bold text-yellow-500 mb-4">Orders</h1>

      {/* Breadcrumbs */}
      <nav className="mb-4">
        <ol className="flex space-x-2 text-gray-400">
          <li className="hover:text-yellow-500 transition duration-200 cursor-pointer">
            Home
          </li>
          <li className="text-yellow-500"> / Orders</li>
        </ol>
      </nav>

      {/* Search Box */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-800 text-gray-300"
        />
        <button className="ml-2 p-2 bg-yellow-500 rounded-lg text-gray-900 hover:bg-yellow-400 transition flex items-center">
          <FaSearch />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center my-10">
          <ClipLoader color="#FBBF24" loading={loading} size={50} />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    #Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {currentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-700 transition duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      #{order.order_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.customer.first_name} {order.customer.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Editable status */}
                      <StatusSelector
                        order={order}
                        currentStatus={order.status}
                        onStatusUpdate={handleStatusUpdate}
                        loading={updatingOrderId === order._id} // Pass loading state
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${order.total_amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        className="text-yellow-400 hover:text-yellow-300 mx-1"
                        onClick={() => push(`/order/${order._id}`)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-yellow-400 hover:text-yellow-300 mx-1"
                        onClick={() => {
                          setOrderToDelete(order);
                          setDeleteModalOpen(true); // Open delete modal
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDeleteOrder}
            order={orderToDelete}
          />
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-400">
              Showing {indexOfFirstOrder + 1} to{" "}
              {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </span>
            <div>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-yellow-500 rounded-lg text-gray-900 hover:bg-yellow-400 transition mr-2 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 bg-yellow-500 rounded-lg text-gray-900 hover:bg-yellow-400 transition disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Component for Editable Status
const StatusSelector = ({ order, currentStatus, onStatusUpdate, loading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const handleBlur = () => {
    setIsEditing(false);
    onStatusUpdate(order, selectedStatus);
  };

  return isEditing ? (
    <select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      onBlur={handleBlur}
      className="bg-gray-800 text-gray-300 border border-gray-700 rounded-lg p-1"
    >
      <option value="Pending">Pending</option>
      <option value="Processing">Processing</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  ) : (
    <span
      className={`cursor-pointer ${getStatusClass(currentStatus)}`}
      onDoubleClick={() => setIsEditing(true)}
    >
      {currentStatus} {loading && <ClipLoader color="#ffff" size={15} />}
    </span>
  );
};

// Function to get the status class
const getStatusClass = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-500 text-white px-2 py-1 rounded";
    case "Processing":
      return "bg-blue-500 text-white px-2 py-1 rounded";
    case "Shipped":
      return "bg-green-500 text-white px-2 py-1 rounded";
    case "Delivered":
      return "bg-gray-500 text-white px-2 py-1 rounded";
    case "Cancelled":
      return "bg-red-500 text-white px-2 py-1 rounded";
    default:
      return "";
  }
};

export default Orders;
