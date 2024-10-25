"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Bar, Pie, Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Skeleton } from "antd";
import {
  FaBox,
  FaShoppingCart,
  FaCheckCircle,
  FaExclamationCircle,
  FaTrashAlt,
  FaDollarSign,
} from "react-icons/fa";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const StatCard = ({ title, value, icon, iconColor }) => (
  <motion.div
    className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-between"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div>
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <p className="text-3xl font-bold text-c-500">{value}</p>
    </div>
    <div className={`text-4xl ${iconColor}`}>{icon}</div>
  </motion.div>
);

const AdminPanel = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, ordersResponse] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/orders"),
        ]);

        if (!productsResponse.ok || !ordersResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const productsData = await productsResponse.json();
        const ordersData = await ordersResponse.json();

        setProducts(productsData);
        setOrders(ordersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} active className="rounded-lg shadow-lg" />
          ))}
        </div>
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  const totalProducts = products.length;
  const totalOrders = orders.length;

  const totalSales = orders.reduce((sum, order) => {
    const orderTotal = order.items.reduce(
      (acc, item) => acc + parseFloat(item.price),
      0
    );
    return sum + orderTotal;
  }, 0);

  // Initialize order statuses
  const orderStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const ordersByStatus = orderStatuses.reduce((acc, status) => {
    acc[status] = 0; // Initialize each status to 0
    return acc;
  }, {});

  // Count orders by status
  orders.forEach((order) => {
    ordersByStatus[order.status] = (ordersByStatus[order.status] || 0) + 1;
  });

  // Color mapping for order statuses
  const statusColors = {
    Pending: "rgba(255, 206, 86, 0.6)",
    Processing: "rgba(54, 162, 235, 0.6)",
    Shipped: "rgba(75, 192, 192, 0.6)",
    Delivered: "rgba(153, 102, 255, 0.6)",
    Cancelled: "rgba(255, 99, 132, 0.6)",
  };

  // Calculate daily earnings for the last 30 days including today
  const dailyEarnings = {};
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  // Reset dailyEarnings for the last 30 days
  for (let i = 0; i < 31; i++) {
    const date = new Date(thirtyDaysAgo);
    date.setDate(thirtyDaysAgo.getDate() + i);
    const dateString = date.toLocaleDateString();
    dailyEarnings[dateString] = 0; // Initialize with 0
  }

  // Include today's date in the calculation
  orders.forEach((order) => {
    const orderDate = new Date(order.createdAt);
    if (orderDate >= thirtyDaysAgo && orderDate <= today) {
      const date = orderDate.toLocaleDateString();
      const orderTotal = order.items.reduce((itemSum, item) => {
        const price = item.price ? Number(item.price) : 0; // Ensure price is a number
        return itemSum + price;
      }, 0);
      if (!isNaN(orderTotal)) {
        dailyEarnings[date] += orderTotal; // Sum the earnings for the day
      }
    }
  });

  const dailyEarningsData = {
    labels: Object.keys(dailyEarnings),
    datasets: [
      {
        label: "Daily Earnings (Last 30 Days)",
        data: Object.values(dailyEarnings),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  // Chart data for order status
  const chartData = {
    labels: orderStatuses,
    datasets: [
      {
        label: "Orders by Status",
        data: orderStatuses.map((status) => ordersByStatus[status]),
        backgroundColor: orderStatuses.map((status) => statusColors[status]),
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={<FaBox />}
          iconColor="text-c-prime"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={<FaShoppingCart />}
          iconColor="text-c-prime"
        />
        <StatCard
          title="Total Sales"
          value={`$${totalSales.toFixed(2)}`}
          icon={<FaDollarSign />}
          iconColor="text-green-500"
        />
        <StatCard
          title="Pending Orders"
          value={ordersByStatus["Pending"] || 0}
          icon={<FaExclamationCircle />}
          iconColor="text-yellow-500"
        />
        <StatCard
          title="Shipped Orders"
          value={ordersByStatus["Shipped"] || 0}
          icon={<FaCheckCircle />}
          iconColor="text-blue-500"
        />
        <StatCard
          title="Cancelled Orders"
          value={ordersByStatus["Cancelled"] || 0}
          icon={<FaTrashAlt />}
          iconColor="text-red-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-10">
        <div className="col-span-3">
          <h2 className="text-xl font-semibold mb-2 text-gray-700 ">
            Daily Earnings Line Chart
          </h2>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <Line data={dailyEarningsData} />
          </div>
        </div>
        <div className="col-span-3">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Orders Status Bar Chart
          </h2>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <Bar data={chartData} />
          </div>
        </div>
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Orders Status Pie Chart
          </h2>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <Pie data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
