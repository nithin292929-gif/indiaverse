import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api/axios'

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
    <div style={{ color: 'white', textAlign: 'center', paddingTop: '160px', background: '#06080f', minHeight: '100vh', fontSize: '1.2rem' }}>
      Loading...
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
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 24px;
        }
        .detail-hero { height: 420px; }
        .detail-hero h1 { font-size: 2.2rem; }
        .stats-row { display: flex; gap: 12px; }
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr !important; gap: 24px !important; padding: 24px 16px !important; }
          .detail-hero { height: 260px !important; }
          .detail-hero h1 { font-size: 1.4rem !important; }
          .stats-row { flex-direction: column !important; }
        }
      `}</style>

      {/* Hero Image */}
      <div className="detail-hero" style={{ position: 'relative' }}>
        <img
          src={tour.image_url}
          alt={tour.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />

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

        <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
          <span style={{
            color: '#f47c3a', fontWeight: 600,
            textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em'
          }}>
            {tour.category}
          </span>
          <h1 className="detail-hero" style={{
            color: 'white', fontFamily: 'Playfair Display, serif',
            fontWeight: 700, margin: '6px 0 4px', lineHeight: 1.2
          }}>
            {tour.title}
          </h1>
          <p style={{ color: '#d1d5db', fontSize: '0.9rem' }}>
            📍 {tour.location}, {tour.state}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="detail-grid">

        {/* Info */}
        <div>
          {/* Stats Row */}
          <div className="stats-row" style={{ marginBottom: '28px' }}>
            {[
              { label: 'Price', value: `₹${Number(tour.price).toLocaleString()}`, sub: 'per person', highlight: true },
              { label: 'Duration', value: tour.duration, sub: '' },
              { label: 'Rating', value: `⭐ ${tour.rating}`, sub: '' },
            ].map(item => (
              <div key={item.label} style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '16px',
                textAlign: 'center'
              }}>
                <p style={{ color: '#8a8a9a', fontSize: '0.78rem', marginBottom: '6px' }}>{item.label}</p>
                <p style={{
                  color: item.highlight ? '#f47c3a' : 'white',
                  fontSize: '1.2rem', fontWeight: 700,
                  fontFamily: 'Playfair Display, serif'
                }}>
                  {item.value}
                </p>
                {item.sub && <p style={{ color: '#8a8a9a', fontSize: '0.72rem' }}>{item.sub}</p>}
              </div>
            ))}
          </div>

          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            color: 'white', fontSize: '1.4rem',
            fontWeight: 700, marginBottom: '14px'
          }}>
            About This Tour
          </h2>
          <p style={{ color: '#d1d5db', lineHeight: 1.8, fontSize: '1rem' }}>
            {tour.description}
          </p>

          {/* Tour details */}
          <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              { icon: '📍', label: 'Location', value: tour.location },
              { icon: '🏴', label: 'State', value: tour.state },
              { icon: '⏱', label: 'Duration', value: tour.duration },
              { icon: '🏷️', label: 'Category', value: tour.category },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}>
                <span style={{ color: '#8a8a9a', fontSize: '0.88rem' }}>{item.icon} {item.label}</span>
                <span style={{ color: 'white', fontSize: '0.88rem', fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px', padding: '28px',
          height: 'fit-content',
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🎉</div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                color: 'white', fontSize: '1.4rem',
                fontWeight: 700, marginBottom: '8px'
              }}>
                Booking Confirmed!
              </h3>
              <p style={{ color: '#8a8a9a', marginBottom: '24px', fontSize: '0.9rem' }}>
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
              {/* Top accent line */}
              <div style={{
                height: '3px', borderRadius: '999px',
                background: 'linear-gradient(90deg, #f47c3a, #c9a84c)',
                marginBottom: '24px'
              }} />

              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                color: 'white', fontSize: '1.3rem',
                fontWeight: 700, marginBottom: '20px'
              }}>
                Book This Tour
              </h2>

              <form onSubmit={handleBooking}>
                <input
                  required placeholder="Your Full Name"
                  value={booking.customer_name}
                  onChange={e => setBooking({ ...booking, customer_name: e.target.value })}
                  style={inp}
                />
                <input
                  required type="email" placeholder="Email Address"
                  value={booking.customer_email}
                  onChange={e => setBooking({ ...booking, customer_email: e.target.value })}
                  style={inp}
                />
                <input
                  placeholder="Phone Number"
                  value={booking.customer_phone}
                  onChange={e => setBooking({ ...booking, customer_phone: e.target.value })}
                  style={inp}
                />
                <input
                  required type="date"
                  value={booking.travel_date}
                  onChange={e => setBooking({ ...booking, travel_date: e.target.value })}
                  style={{ ...inp, colorScheme: 'dark' }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ color: '#8a8a9a', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                    Number of People:
                  </span>
                  <input
                    type="number" min="1" max="20"
                    value={booking.num_people}
                    onChange={e => setBooking({ ...booking, num_people: parseInt(e.target.value) })}
                    style={{ ...inp, width: '80px', marginBottom: 0, textAlign: 'center' }}
                  />
                </div>

                {/* Total price */}
                <div style={{
                  background: 'rgba(244,124,58,0.1)',
                  border: '1px solid rgba(244,124,58,0.2)',
                  borderRadius: '12px', padding: '14px 16px',
                  marginBottom: '16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ color: '#8a8a9a', fontSize: '0.9rem' }}>Total Amount</span>
                  <span style={{
                    fontFamily: 'Playfair Display, serif',
                    color: '#f47c3a', fontSize: '1.4rem', fontWeight: 800
                  }}>
                    ₹{(Number(tour.price) * booking.num_people).toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
                    color: 'white', border: 'none',
                    padding: '15px', borderRadius: '12px',
                    fontWeight: 700, fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(244,124,58,0.3)',
                  }}
                >
                  Confirm Booking 🎯
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}