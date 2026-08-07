import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  PackageSearch, 
  Users, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    revenueData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from /api/admin/stats
    // For now, we'll simulate the fetch with mock data to build the UI
    setTimeout(() => {
      setStats({
        totalProducts: 156,
        totalUsers: 1240,
        totalOrders: 890,
        totalRevenue: 45230,
        pendingOrders: 12,
        lowStockProducts: 5,
        revenueData: [
          { name: 'Jan', revenue: 4000, orders: 120 },
          { name: 'Feb', revenue: 3000, orders: 98 },
          { name: 'Mar', revenue: 5000, orders: 150 },
          { name: 'Apr', revenue: 4500, orders: 135 },
          { name: 'May', revenue: 6000, orders: 180 },
          { name: 'Jun', revenue: 5500, orders: 165 },
          { name: 'Jul', revenue: 7500, orders: 210 },
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="admin-loading">Loading Dashboard...</div>;
  }

  const statCards = [
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'primary' },
    { title: 'Total Orders', value: stats.totalOrders.toLocaleString(), icon: ShoppingBag, color: 'success' },
    { title: 'Total Products', value: stats.totalProducts.toLocaleString(), icon: PackageSearch, color: 'purple' },
    { title: 'Total Customers', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'pink' },
    { title: 'Pending Orders', value: stats.pendingOrders, icon: Clock, color: 'warning' },
    { title: 'Low Stock Items', value: stats.lowStockProducts, icon: AlertTriangle, color: 'danger' },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="dashboard-stats-grid">
        {statCards.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className={`stat-icon ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Revenue Overview</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h3>Orders Summary</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                  cursor={{fill: '#334155'}}
                />
                <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
