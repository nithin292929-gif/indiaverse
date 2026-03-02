import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import API from '../api/axios'

// Stat card component
function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px', padding: '24px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '80px', height: '80px',
        background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
      }} />

      <div style={{
        width: '44px', height: '44px', borderRadius: '12px',
        background: `${color}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.3rem', marginBottom: '16px',
        border: `1px solid ${color}44`,
      }}>
        {icon}
      </div>

      <p style={{ color: '#8a8a9a', fontSize: '0.82rem', marginBottom: '6px', fontWeight: 500 }}>
        {label}
      </p>
      <p style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '1.8rem', fontWeight: 800, color: 'white',
        marginBottom: '4px',
      }}>
        {value}
      </p>
      {sub && <p style={{ color: color, fontSize: '0.78rem', fontWeight: 500 }}>{sub}</p>}
    </div>
  )
}

// Custom tooltip for charts
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(10,14,28,0.95)',
      border: '1px solid rgba(244,124,58,0.3)',
      borderRadius: '10px', padding: '12px 16px',
    }}>
      <p style={{ color: '#8a8a9a', fontSize: '0.78rem', marginBottom: '6px' }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontWeight: 600, fontSize: '0.9rem' }}>
          {p.name}: {p.name === 'revenue' ? `₹${Number(p.value).toLocaleString()}` : p.value}
        </p>
      ))}
    </div>
  )
}

const CATEGORY_COLORS = {
  Heritage: '#f47c3a',
  Nature: '#34d399',
  Beach: '#4af0ff',
  Adventure: '#f472b6',
  Spiritual: '#a78bfa',
  default: '#c9a84c'
}

export default function Analytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    API.get('/bookings/analytics')
      .then(res => setData(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{
      minHeight: '100vh', background: '#06080f',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '16px'
    }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        border: '3px solid rgba(244,124,58,0.2)',
        borderTopColor: '#f47c3a',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ color: '#8a8a9a' }}>Loading analytics...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  const { stats, monthly, topTours, categories, recentBookings } = data || {}

  // Prepare pie chart data
  const pieData = categories?.map(cat => ({
    name: cat.category,
    value: Number(cat.bookings),
    color: CATEGORY_COLORS[cat.category] || CATEGORY_COLORS.default
  })) || []

  return (
    <div style={{ minHeight: '100vh', background: '#06080f', paddingTop: '68px' }}>
      <style>{`
        .analytics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .charts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 1024px) {
          .analytics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .charts-grid { grid-template-columns: 1fr !important; }
          .bottom-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .analytics-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(24px, 4vw, 48px) clamp(16px, 3vw, 32px)' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ color: '#f47c3a', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
              ✦ Admin Panel
            </p>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white' }}>
              Analytics <span style={{ background: 'linear-gradient(135deg, #f47c3a, #c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dashboard</span>
            </h1>
          </div>
          <button
            onClick={() => navigate('/admin')}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white', padding: '10px 24px',
              borderRadius: '999px', cursor: 'pointer',
              fontSize: '0.88rem', fontWeight: 500,
            }}
          >
            ← Back to Admin
          </button>
        </div>

        {/* Stat Cards */}
        <div className="analytics-grid" style={{ marginBottom: '24px' }}>
          <StatCard
            icon="💰" label="Total Revenue"
            value={`₹${(stats?.total_revenue || 0).toLocaleString()}`}
            sub="All time earnings"
            color="#f47c3a"
          />
          <StatCard
            icon="📅" label="Total Bookings"
            value={stats?.total_bookings || 0}
            sub="Confirmed trips"
            color="#c9a84c"
          />
          <StatCard
            icon="🏖️" label="Total Tours"
            value={stats?.total_tours || 0}
            sub="Available packages"
            color="#34d399"
          />
          <StatCard
            icon="👥" label="Customers"
            value={stats?.total_customers || 0}
            sub="Unique travelers"
            color="#a78bfa"
          />
        </div>

        {/* Charts Row */}
        <div className="charts-grid" style={{ marginBottom: '24px' }}>

          {/* Monthly bookings area chart */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px', padding: '24px',
          }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.1rem', marginBottom: '4px' }}>
              Monthly Bookings
            </h3>
            <p style={{ color: '#8a8a9a', fontSize: '0.8rem', marginBottom: '20px' }}>Last 6 months</p>
            {monthly?.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthly}>
                  <defs>
                    <linearGradient id="bookingGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f47c3a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f47c3a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#8a8a9a" fontSize={12} />
                  <YAxis stroke="#8a8a9a" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone" dataKey="bookings" name="bookings"
                    stroke="#f47c3a" strokeWidth={2}
                    fill="url(#bookingGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#8a8a9a' }}>No booking data yet</p>
              </div>
            )}
          </div>

          {/* Category pie chart */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px', padding: '24px',
          }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.1rem', marginBottom: '4px' }}>
              Bookings by Category
            </h3>
            <p style={{ color: '#8a8a9a', fontSize: '0.8rem', marginBottom: '20px' }}>Tour type breakdown</p>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%" cy="50%"
                    innerRadius={55} outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [value, name]}
                    contentStyle={{
                      background: 'rgba(10,14,28,0.95)',
                      border: '1px solid rgba(244,124,58,0.3)',
                      borderRadius: '10px',
                    }}
                    labelStyle={{ color: 'white' }}
                    itemStyle={{ color: '#8a8a9a' }}
                  />
                  <Legend
                    formatter={(value) => <span style={{ color: '#8a8a9a', fontSize: '0.78rem' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#8a8a9a' }}>No category data yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="bottom-grid">

          {/* Top Tours bar chart */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px', padding: '24px',
          }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.1rem', marginBottom: '4px' }}>
              Top Tours
            </h3>
            <p style={{ color: '#8a8a9a', fontSize: '0.8rem', marginBottom: '20px' }}>By number of bookings</p>
            {topTours?.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={topTours} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" stroke="#8a8a9a" fontSize={11} />
                  <YAxis
                    type="category" dataKey="title"
                    stroke="#8a8a9a" fontSize={10}
                    width={120}
                    tickFormatter={val => val.length > 15 ? val.slice(0, 15) + '...' : val}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="booking_count" name="bookings" radius={[0, 6, 6, 0]}>
                    {topTours.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? '#f47c3a' : i === 1 ? '#c9a84c' : 'rgba(244,124,58,0.4)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#8a8a9a' }}>No tour data yet</p>
              </div>
            )}
          </div>

          {/* Recent Bookings */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px', padding: '24px',
            overflowX: 'auto',
          }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.1rem', marginBottom: '4px' }}>
              Recent Bookings
            </h3>
            <p style={{ color: '#8a8a9a', fontSize: '0.8rem', marginBottom: '20px' }}>Latest 5 bookings</p>
            {recentBookings?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentBookings.map(b => (
                  <div key={b.id} style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    gap: '12px',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: 'white', fontWeight: 600, fontSize: '0.88rem', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {b.customer_name}
                      </p>
                      <p style={{ color: '#8a8a9a', fontSize: '0.78rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {b.tour_title}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ color: '#f47c3a', fontWeight: 700, fontSize: '0.9rem' }}>
                        ₹{Number(b.total_price).toLocaleString()}
                      </p>
                      <span style={{
                        background: 'rgba(52,211,153,0.15)',
                        color: '#34d399', padding: '2px 10px',
                        borderRadius: '999px', fontSize: '0.72rem', fontWeight: 600
                      }}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#8a8a9a' }}>No bookings yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}