import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import Itinerary from '../components/Itinerary'

export default function TourDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState({
    customer_name: '', customer_email: '',
    customer_phone: '', travel_date: '', num_people: 1
  })
  const [submitted, setSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    API.get(`/tours/${id}`)
      .then(res => setTour(res.data.data))
      .finally(() => setLoading(false))
  }, [id])

  async function handleBooking(e) {
    e.preventDefault()
    try {
      await API.post('/bookings', { ...booking, tour_id: id })
      setSubmitted(true)
    } catch {
      alert('Booking failed. Try again.')
    }
  }

  const inp = {
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px', padding: '12px 16px',
    color: 'white', fontSize: '0.95rem', outline: 'none',
    boxSizing: 'border-box', marginBottom: '12px',
  }

  if (loading) return (
    <div style={{
      color: 'white', textAlign: 'center',
      paddingTop: '160px', background: '#06080f',
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: '16px'
    }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        border: '3px solid rgba(244,124,58,0.15)',
        borderTopColor: '#f47c3a',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (!tour) return (
    <div style={{ color: 'white', textAlign: 'center', paddingTop: '160px', background: '#06080f', minHeight: '100vh' }}>
      Tour not found
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#06080f' }}>
      <style>{`
        .detail-layout { display: grid; grid-template-columns: 1fr 380px; gap: 40px; max-width: 1200px; margin: 0 auto; padding: 48px 24px; }
        .detail-hero-img { height: 480px; }
        @media (max-width: 900px) {
          .detail-layout { grid-template-columns: 1fr !important; padding: 24px 16px !important; }
          .detail-hero-img { height: 260px !important; }
        }
      `}</style>

      {/* Hero */}
      <div className="detail-hero-img" style={{ position: 'relative' }}>
        <img
          src={tour.image_url} alt={tour.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,8,15,1) 0%, rgba(6,8,15,0.3) 60%, transparent 100%)' }} />

        <button
          onClick={() => navigate('/tours')}
          style={{
            position: 'absolute', top: '84px', left: '24px',
            background: 'rgba(0,0,0,0.5)', color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '8px 18px', borderRadius: '999px',
            cursor: 'pointer', fontSize: '0.85rem',
            backdropFilter: 'blur(8px)',
          }}
        >
          ← Back
        </button>

        <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{
              background: 'rgba(244,124,58,0.2)',
              border: '1px solid rgba(244,124,58,0.3)',
              color: '#f47c3a', padding: '4px 14px',
              borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600
            }}>
              {tour.category}
            </span>
            <span style={{ color: '#c9a84c', fontSize: '0.85rem' }}>⭐ {tour.rating}</span>
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            color: 'white', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
            fontWeight: 800, marginBottom: '8px', lineHeight: 1.2,
          }}>
            {tour.title}
          </h1>
          <p style={{ color: '#9a9aaa', fontSize: '0.95rem' }}>
            📍 {tour.location}, {tour.state}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="detail-layout">

        {/* Left Side */}
        <div>
          {/* Quick stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px', marginBottom: '32px',
          }}>
            {[
              { label: 'Price', value: `₹${Number(tour.price).toLocaleString()}`, sub: 'per person', color: '#f47c3a' },
              { label: 'Duration', value: tour.duration, sub: '', color: '#c9a84c' },
              { label: 'Rating', value: `⭐ ${tour.rating}`, sub: '', color: '#34d399' },
            ].map(item => (
              <div key={item.label} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px', padding: '16px', textAlign: 'center'
              }}>
                <p style={{ color: '#6a6a7a', fontSize: '0.72rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</p>
                <p style={{ color: item.color, fontSize: '1.2rem', fontWeight: 800, fontFamily: 'Playfair Display, serif' }}>{item.value}</p>
                {item.sub && <p style={{ color: '#6a6a7a', fontSize: '0.7rem' }}>{item.sub}</p>}
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0' }}>
            {[
              { key: 'overview', label: '📋 Overview' },
              { key: 'itinerary', label: '🗓️ Itinerary' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '10px 24px',
                  background: 'transparent', border: 'none',
                  color: activeTab === tab.key ? '#f47c3a' : '#6a6a7a',
                  fontWeight: activeTab === tab.key ? 700 : 400,
                  cursor: 'pointer', fontSize: '0.9rem',
                  borderBottom: `2px solid ${activeTab === tab.key ? '#f47c3a' : 'transparent'}`,
                  transition: 'all 0.2s',
                  marginBottom: '-1px',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.4rem', fontWeight: 700, marginBottom: '14px' }}>
                About This Tour
              </h2>
              <p style={{ color: '#9a9aaa', lineHeight: 1.9, fontSize: '0.98rem', marginBottom: '28px' }}>
                {tour.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { icon: '📍', label: 'Location', value: tour.location },
                  { icon: '🏴', label: 'State', value: tour.state },
                  { icon: '⏱', label: 'Duration', value: tour.duration },
                  { icon: '🏷️', label: 'Category', value: tour.category },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <span style={{ color: '#6a6a7a', fontSize: '0.88rem' }}>{item.icon} {item.label}</span>
                    <span style={{ color: 'white', fontSize: '0.88rem', fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Itinerary Tab */}
          {activeTab === 'itinerary' && (
            <Itinerary tourId={id} />
          )}
        </div>

        {/* Right Side - Booking Form */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px', padding: '28px',
          height: 'fit-content',
          position: 'sticky', top: '90px',
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🎉</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>
                Booking Confirmed!
              </h3>
              <p style={{ color: '#6a6a7a', marginBottom: '24px', fontSize: '0.9rem' }}>
                We'll contact you at {booking.customer_email}
              </p>
              <button
                onClick={() => navigate('/tours')}
                style={{
                  background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
                  color: 'white', border: 'none',
                  padding: '12px 32px', borderRadius: '999px',
                  fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem'
                }}
              >
                Explore More Tours
              </button>
            </div>
          ) : (
            <>
              <div style={{ height: '3px', borderRadius: '999px', background: 'linear-gradient(90deg, #f47c3a, #c9a84c)', marginBottom: '24px' }} />
              <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px' }}>
                Book This Tour
              </h2>

              <form onSubmit={handleBooking}>
                <input required placeholder="Your Full Name" value={booking.customer_name}
                  onChange={e => setBooking({ ...booking, customer_name: e.target.value })} style={inp} />
                <input required type="email" placeholder="Email Address" value={booking.customer_email}
                  onChange={e => setBooking({ ...booking, customer_email: e.target.value })} style={inp} />
                <input placeholder="Phone Number" value={booking.customer_phone}
                  onChange={e => setBooking({ ...booking, customer_phone: e.target.value })} style={inp} />
                <input required type="date" value={booking.travel_date}
                  onChange={e => setBooking({ ...booking, travel_date: e.target.value })}
                  style={{ ...inp, colorScheme: 'dark' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ color: '#6a6a7a', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>People:</span>
                  <input type="number" min="1" max="20" value={booking.num_people}
                    onChange={e => setBooking({ ...booking, num_people: parseInt(e.target.value) })}
                    style={{ ...inp, width: '80px', marginBottom: 0, textAlign: 'center' }} />
                </div>

                <div style={{
                  background: 'rgba(244,124,58,0.08)',
                  border: '1px solid rgba(244,124,58,0.2)',
                  borderRadius: '14px', padding: '14px 16px', marginBottom: '16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ color: '#6a6a7a', fontSize: '0.88rem' }}>Total Amount</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', color: '#f47c3a', fontSize: '1.5rem', fontWeight: 800 }}>
                    ₹{(Number(tour.price) * booking.num_people).toLocaleString()}
                  </span>
                </div>

                <button type="submit" style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
                  color: 'white', border: 'none',
                  padding: '15px', borderRadius: '14px',
                  fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(244,124,58,0.3)',
                  letterSpacing: '0.02em',
                }}>
                  Confirm Booking ✈️
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}