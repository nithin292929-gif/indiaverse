import { useEffect, useState } from 'react'
import API from '../api/axios'

export default function Admin() {
  const [tours, setTours] = useState([])
  const [bookings, setBookings] = useState([])
  const [tab, setTab] = useState('tours')
  const [form, setForm] = useState({ title:'', description:'', location:'', state:'', price:'', duration:'', category:'', image_url:'' })
  const [editId, setEditId] = useState(null)

  useEffect(() => { fetchTours(); fetchBookings() }, [])

  async function fetchTours() {
    const res = await API.get('/tours')
    setTours(res.data.data)
  }
  async function fetchBookings() {
    const res = await API.get('/bookings')
    setBookings(res.data.data)
  }
  async function handleSubmit(e) {
    e.preventDefault()
    if (editId) { await API.put(`/tours/${editId}`, form); setEditId(null) }
    else { await API.post('/tours', form) }
    setForm({ title:'', description:'', location:'', state:'', price:'', duration:'', category:'', image_url:'' })
    fetchTours()
  }
  async function handleDelete(id) {
    if (window.confirm('Delete this tour?')) { await API.delete(`/tours/${id}`); fetchTours() }
  }
  function handleEdit(tour) { setForm(tour); setEditId(tour.id); setTab('add') }

  const inp = { width:'100%', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'12px', padding:'12px 16px', color:'white', fontSize:'1rem', outline:'none', boxSizing:'border-box', marginBottom:'12px' }

  return (
    <div style={{ minHeight:'100vh', paddingTop:'100px', padding:'100px 32px 48px', background:'#050914' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <h1 style={{ color:'white', fontSize:'2.5rem', fontWeight:'bold', marginBottom:'32px' }}>
          🛠️ Admin <span style={{ color:'#f97316' }}>Dashboard</span>
        </h1>

        {/* Tabs */}
        <div style={{ display:'flex', gap:'12px', marginBottom:'32px' }}>
          {['tours', 'bookings', 'add'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding:'10px 24px', borderRadius:'999px', border:'none', fontWeight:600, cursor:'pointer', textTransform:'capitalize', background: tab===t ? '#f97316' : 'rgba(255,255,255,0.1)', color: tab===t ? 'white' : '#9ca3af' }}>
              {t === 'add' ? (editId ? '✏️ Edit Tour' : '➕ Add Tour') : t === 'tours' ? '📋 Tours' : '📅 Bookings'}
            </button>
          ))}
        </div>

        {/* Tours Tab */}
        {tab === 'tours' && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'20px' }}>
            {tours.map(tour => (
              <div key={tour.id} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'16px', overflow:'hidden' }}>
                <img src={tour.image_url} alt={tour.title} style={{ width:'100%', height:'160px', objectFit:'cover' }} />
                <div style={{ padding:'16px' }}>
                  <h3 style={{ color:'white', fontWeight:'bold', marginBottom:'4px' }}>{tour.title}</h3>
                  <p style={{ color:'#f97316', fontWeight:600, marginBottom:'4px' }}>₹{Number(tour.price).toLocaleString()}</p>
                  <p style={{ color:'#9ca3af', fontSize:'0.85rem', marginBottom:'16px' }}>📍 {tour.location}</p>
                  <div style={{ display:'flex', gap:'8px' }}>
                    <button onClick={() => handleEdit(tour)} style={{ flex:1, background:'rgba(59,130,246,0.2)', border:'1px solid rgba(59,130,246,0.4)', color:'#60a5fa', padding:'8px', borderRadius:'10px', cursor:'pointer' }}>✏️ Edit</button>
                    <button onClick={() => handleDelete(tour.id)} style={{ flex:1, background:'rgba(239,68,68,0.2)', border:'1px solid rgba(239,68,68,0.4)', color:'#f87171', padding:'8px', borderRadius:'10px', cursor:'pointer' }}>🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bookings Tab */}
        {tab === 'bookings' && (
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.1)' }}>
                  {['Tour','Customer','Email','Date','People','Total','Status'].map(h => (
                    <th key={h} style={{ color:'#9ca3af', padding:'12px 16px', textAlign:'left', fontWeight:500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ color:'white', padding:'12px 16px', fontWeight:500 }}>{b.tour_title}</td>
                    <td style={{ color:'#d1d5db', padding:'12px 16px' }}>{b.customer_name}</td>
                    <td style={{ color:'#9ca3af', padding:'12px 16px', fontSize:'0.85rem' }}>{b.customer_email}</td>
                    <td style={{ color:'#d1d5db', padding:'12px 16px' }}>{new Date(b.travel_date).toLocaleDateString()}</td>
                    <td style={{ color:'#d1d5db', padding:'12px 16px' }}>{b.num_people}</td>
                    <td style={{ color:'#f97316', padding:'12px 16px', fontWeight:600 }}>₹{Number(b.total_price).toLocaleString()}</td>
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{ background:'rgba(34,197,94,0.2)', color:'#4ade80', padding:'4px 12px', borderRadius:'999px', fontSize:'0.8rem' }}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add/Edit Tab */}
        {tab === 'add' && (
          <div style={{ maxWidth:'600px' }}>
            <form onSubmit={handleSubmit}>
              {[
                { key:'title', placeholder:'Tour Title' },
                { key:'location', placeholder:'Location' },
                { key:'state', placeholder:'State' },
                { key:'price', placeholder:'Price in ₹', type:'number' },
                { key:'duration', placeholder:'Duration (e.g. 5 Days)' },
                { key:'image_url', placeholder:'Image URL' },
              ].map(f => (
                <input key={f.key} required type={f.type||'text'} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({...form, [f.key]:e.target.value})} style={inp} />
              ))}
              <select value={form.category} onChange={e => setForm({...form, category:e.target.value})} style={inp}>
                <option value="">Select Category</option>
                {['Heritage','Nature','Beach','Adventure','Spiritual'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description:e.target.value})} rows={4} style={{ ...inp, resize:'vertical' }} />
              <button type="submit" style={{ width:'100%', background:'#f97316', color:'white', border:'none', padding:'16px', borderRadius:'12px', fontWeight:'bold', fontSize:'1.05rem', cursor:'pointer' }}>
                {editId ? '✏️ Update Tour' : '➕ Add Tour'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}