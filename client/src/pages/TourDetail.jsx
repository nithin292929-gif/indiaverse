import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api/axios'

export default function TourDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState({
    customer_name:'', customer_email:'',
    customer_phone:'', travel_date:'', num_people:1
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

  const inp = { width:'100%', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'12px', padding:'12px 16px', color:'white', fontSize:'1rem', outline:'none', boxSizing:'border-box' }

  if (loading) return <div style={{ color:'white', textAlign:'center', paddingTop:'160px', fontSize:'1.5rem', background:'#050914', minHeight:'100vh' }}>Loading...</div>
  if (!tour) return <div style={{ color:'white', textAlign:'center', paddingTop:'160px', background:'#050914', minHeight:'100vh' }}>Tour not found</div>

  return (
    <div style={{ minHeight:'100vh', background:'#050914' }}>
      {/* Hero */}
      <div style={{ position:'relative', height:'400px' }}>
        <img src={tour.image_url} alt={tour.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.55)' }} />
        <button onClick={() => navigate('/tours')} style={{ position:'absolute', top:'90px', left:'32px', background:'rgba(0,0,0,0.5)', color:'white', border:'none', padding:'10px 20px', borderRadius:'999px', cursor:'pointer' }}>
          ← Back
        </button>
        <div style={{ position:'absolute', bottom:'32px', left:'32px' }}>
          <span style={{ color:'#f97316', fontWeight:600, textTransform:'uppercase', fontSize:'0.8rem' }}>{tour.category}</span>
          <h1 style={{ color:'white', fontSize:'2.5rem', fontWeight:'bold', margin:'8px 0 4px' }}>{tour.title}</h1>
          <p style={{ color:'#d1d5db' }}>📍 {tour.location}, {tour.state}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'48px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px' }}>
        {/* Info */}
        <div>
          <div style={{ display:'flex', gap:'16px', marginBottom:'32px' }}>
            {[
              { label:'Price', value:`₹${Number(tour.price).toLocaleString()}`, sub:'per person' },
              { label:'Duration', value:tour.duration, sub:'' },
              { label:'Rating', value:`⭐ ${tour.rating}`, sub:'' },
            ].map(item => (
              <div key={item.label} style={{ flex:1, background:'rgba(255,255,255,0.05)', borderRadius:'16px', padding:'20px', textAlign:'center' }}>
                <p style={{ color:'#9ca3af', fontSize:'0.85rem', marginBottom:'8px' }}>{item.label}</p>
                <p style={{ color: item.label==='Price' ? '#f97316' : 'white', fontSize:'1.4rem', fontWeight:'bold' }}>{item.value}</p>
                {item.sub && <p style={{ color:'#9ca3af', fontSize:'0.75rem' }}>{item.sub}</p>}
              </div>
            ))}
          </div>
          <h2 style={{ color:'white', fontSize:'1.5rem', fontWeight:'bold', marginBottom:'16px' }}>About This Tour</h2>
          <p style={{ color:'#d1d5db', lineHeight:1.8, fontSize:'1.05rem' }}>{tour.description}</p>
        </div>

        {/* Booking Form */}
        <div style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'20px', padding:'32px' }}>
          {submitted ? (
            <div style={{ textAlign:'center', paddingTop:'40px' }}>
              <div style={{ fontSize:'4rem', marginBottom:'16px' }}>🎉</div>
              <h3 style={{ color:'white', fontSize:'1.5rem', fontWeight:'bold', marginBottom:'8px' }}>Booking Confirmed!</h3>
              <p style={{ color:'#9ca3af' }}>We'll contact you at {booking.customer_email}</p>
              <button onClick={() => navigate('/tours')} style={{ marginTop:'24px', background:'#f97316', color:'white', border:'none', padding:'12px 32px', borderRadius:'999px', fontWeight:'bold', cursor:'pointer' }}>
                Explore More
              </button>
            </div>
          ) : (
            <>
              <h2 style={{ color:'white', fontSize:'1.4rem', fontWeight:'bold', marginBottom:'24px' }}>Book This Tour</h2>
              <form onSubmit={handleBooking} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                <input required placeholder="Your Name" value={booking.customer_name} onChange={e => setBooking({...booking, customer_name:e.target.value})} style={inp} />
                <input required type="email" placeholder="Email Address" value={booking.customer_email} onChange={e => setBooking({...booking, customer_email:e.target.value})} style={inp} />
                <input placeholder="Phone Number" value={booking.customer_phone} onChange={e => setBooking({...booking, customer_phone:e.target.value})} style={inp} />
                <input required type="date" value={booking.travel_date} onChange={e => setBooking({...booking, travel_date:e.target.value})} style={inp} />
                <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
                  <label style={{ color:'#9ca3af' }}>People:</label>
                  <input type="number" min="1" max="20" value={booking.num_people} onChange={e => setBooking({...booking, num_people:parseInt(e.target.value)})} style={{ ...inp, width:'80px' }} />
                </div>
                <div style={{ background:'rgba(249,115,22,0.15)', borderRadius:'12px', padding:'16px' }}>
                  <p style={{ color:'#f97316', fontWeight:'bold', fontSize:'1.1rem' }}>
                    Total: ₹{(Number(tour.price) * booking.num_people).toLocaleString()}
                  </p>
                </div>
                <button type="submit" style={{ background:'#f97316', color:'white', border:'none', padding:'16px', borderRadius:'12px', fontWeight:'bold', fontSize:'1.05rem', cursor:'pointer' }}>
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