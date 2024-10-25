import React, { useState, useEffect } from 'react';
import Axios from "../../api/shared/instance";
import { Chart, registerables } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
Chart.register(...registerables);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await Axios.get('/api/admin/dashboard');
        setDashboardData(response.data.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>; // Add a loading spinner here if necessary
  }

  const {
    todaysOrders,
    thisMonthsDeliveredOrders,
    totalCustomersThisMonth,
    thisMonthsTotalRevenue,
    paymentMethods,
    monthlyOrderCountsCurrentYear,
    admin
  } = dashboardData;

  const paymentMethodData = {
    labels: ['Cash on Delivery', 'Razorpay'],
    datasets: [
      {
        data: [
          paymentMethods.cod || 0,
          paymentMethods.rzp || 0
        ],
        backgroundColor: ['#FF5733', '#5733FF']
      }
    ]
  };

  const monthlySalesData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Monthly Sales',
        data: monthlyOrderCountsCurrentYear,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="container mx-auto p-4">
      {/* Welcome Card */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h5 className="text-2xl font-bold text-primary">Welcome to Dashboard</h5>
        <p className="mt-4">
          <span className="font-bold">Name: </span>{admin.name}
        </p>
        <p>
          <span className="font-bold">Email: </span>{admin.email}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Today's Orders" value={todaysOrders} />
        <StatCard title="Delivered Monthly Orders" value={thisMonthsDeliveredOrders} />
        <StatCard title="Order Users of Month" value={totalCustomersThisMonth} />
        <StatCard title="Profit of this Month" value={`₹${thisMonthsTotalRevenue}`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        <div className="bg-white shadow-md rounded-lg p-6">
          <h4 className="text-xl font-bold mb-4">Monthly Sales</h4>
          <div className="h-64">
            <Line data={monthlySalesData} options={{ scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h4 className="text-xl font-bold mb-4">Payment Method Distribution</h4>
          <div className="h-64">
            <Pie data={paymentMethodData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// A simple reusable stat card component
const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <span className="font-semibold text-gray-500 block mb-2">{title}</span>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
};

export default AdminDashboard;
