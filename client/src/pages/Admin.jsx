import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

export default function Admin() {
  const [tours, setTours] = useState([])
  const [bookings, setBookings] = useState([])
  const [tab, setTab] = useState('tours')
  const [form, setForm] = useState({
    title: '', description: '', location: '',
    state: '', price: '', duration: '', category: '', image_url: ''
  })
  const [editId, setEditId] = useState(null)
  const navigate = useNavigate()

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
    setForm({ title: '', description: '', location: '', state: '', price: '', duration: '', category: '', image_url: '' })
    fetchTours()
    setTab('tours')
  }
  async function handleDelete(id) {
    if (window.confirm('Delete this tour?')) { await API.delete(`/tours/${id}`); fetchTours() }
  }
  function handleEdit(tour) { setForm(tour); setEditId(tour.id); setTab('add') }

  const inp = {
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px', padding: '12px 16px',
    color: 'white', fontSize: '0.95rem', outline: 'none',
    boxSizing: 'border-box', marginBottom: '12px',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#06080f', paddingTop: '68px' }}>
      <style>{`
        .admin-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .bookings-table { width: 100%; border-collapse: collapse; }
        @media (max-width: 640px) {
          .admin-tabs { flex-wrap: wrap !important; }
          .admin-container { padding: 24px 16px !important; }
        }
      `}</style>

      <div className="admin-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ color: '#f47c3a', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
            ✦ Management
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white' }}>
            Admin <span style={{ background: 'linear-gradient(135deg, #f47c3a, #c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dashboard</span>
          </h1>
        </div>

        {/* Tabs */}
        <div className="admin-tabs" style={{ display: 'flex', gap: '10px', marginBottom: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { key: 'tours', label: '📋 Tours' },
            { key: 'bookings', label: '📅 Bookings' },
            { key: 'add', label: editId ? '✏️ Edit Tour' : '➕ Add Tour' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: '10px 22px', borderRadius: '999px',
                border: '1px solid',
                borderColor: tab === t.key ? '#f47c3a' : 'rgba(255,255,255,0.1)',
                background: tab === t.key ? 'rgba(244,124,58,0.15)' : 'transparent',
                color: tab === t.key ? '#f47c3a' : '#8a8a9a',
                fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem',
              }}
            >
              {t.label}
            </button>
          ))}

          {/* Analytics button */}
          <button
            onClick={() => navigate('/analytics')}
            style={{
              padding: '10px 22px', borderRadius: '999px',
              border: '1px solid rgba(244,124,58,0.3)',
              background: 'linear-gradient(135deg, rgba(244,124,58,0.15), rgba(201,168,76,0.15))',
              color: '#f47c3a', fontWeight: 600,
              cursor: 'pointer', fontSize: '0.88rem',
              marginLeft: 'auto',
            }}
          >
            📊 View Analytics
          </button>
        </div>

        {/* Tours Tab */}
        {tab === 'tours' && (
          <div>
            <p style={{ color: '#8a8a9a', fontSize: '0.85rem', marginBottom: '20px' }}>
              Total: <span style={{ color: 'white', fontWeight: 600 }}>{tours.length}</span> tours
            </p>
            <div className="admin-grid">
              {tours.map(tour => (
                <div key={tour.id} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px', overflow: 'hidden',
                }}>
                  <div style={{ position: 'relative' }}>
                    <img src={tour.image_url} alt={tour.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                    <div style={{
                      position: 'absolute', top: '10px', left: '10px',
                      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                      color: 'white', padding: '3px 10px', borderRadius: '999px',
                      fontSize: '0.72rem', fontWeight: 600
                    }}>
                      {tour.category}
                    </div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '4px', fontSize: '0.95rem', fontFamily: 'Playfair Display, serif' }}>
                      {tour.title}
                    </h3>
                    <p style={{ color: '#f47c3a', fontWeight: 700, marginBottom: '4px', fontSize: '1rem' }}>
                      ₹{Number(tour.price).toLocaleString()}
                    </p>
                    <p style={{ color: '#8a8a9a', fontSize: '0.8rem', marginBottom: '16px' }}>
                      📍 {tour.location}
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(tour)}
                        style={{
                          flex: 1, background: 'rgba(59,130,246,0.15)',
                          border: '1px solid rgba(59,130,246,0.3)',
                          color: '#60a5fa', padding: '8px',
                          borderRadius: '10px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tour.id)}
                        style={{
                          flex: 1, background: 'rgba(239,68,68,0.15)',
                          border: '1px solid rgba(239,68,68,0.3)',
                          color: '#f87171', padding: '8px',
                          borderRadius: '10px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {tab === 'bookings' && (
          <div style={{ overflowX: 'auto' }}>
            <p style={{ color: '#8a8a9a', fontSize: '0.85rem', marginBottom: '20px' }}>
              Total: <span style={{ color: 'white', fontWeight: 600 }}>{bookings.length}</span> bookings
            </p>
            <table className="bookings-table">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {['Tour', 'Customer', 'Email', 'Date', 'People', 'Total', 'Status'].map(h => (
                    <th key={h} style={{ color: '#8a8a9a', padding: '12px 16px', textAlign: 'left', fontWeight: 500, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ color: 'white', padding: '14px 16px', fontWeight: 500, fontSize: '0.88rem', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {b.tour_title}
                    </td>
                    <td style={{ color: '#d1d5db', padding: '14px 16px', fontSize: '0.88rem' }}>{b.customer_name}</td>
                    <td style={{ color: '#8a8a9a', padding: '14px 16px', fontSize: '0.82rem' }}>{b.customer_email}</td>
                    <td style={{ color: '#d1d5db', padding: '14px 16px', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
                      {new Date(b.travel_date).toLocaleDateString()}
                    </td>
                    <td style={{ color: '#d1d5db', padding: '14px 16px', fontSize: '0.88rem', textAlign: 'center' }}>{b.num_people}</td>
                    <td style={{ color: '#f47c3a', padding: '14px 16px', fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                      ₹{Number(b.total_price).toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        background: 'rgba(52,211,153,0.15)',
                        color: '#4ade80', padding: '4px 12px',
                        borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600
                      }}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px', color: '#8a8a9a' }}>
                No bookings yet
              </div>
            )}
          </div>
        )}

        {/* Add/Edit Tour Tab */}
        {tab === 'add' && (
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.4rem', marginBottom: '24px' }}>
              {editId ? '✏️ Edit Tour' : '➕ Add New Tour'}
            </h2>
            <form onSubmit={handleSubmit}>
              {[
                { key: 'title', placeholder: 'Tour Title' },
                { key: 'location', placeholder: 'Location (e.g. Jaipur - Jodhpur)' },
                { key: 'state', placeholder: 'State' },
                { key: 'price', placeholder: 'Price in ₹', type: 'number' },
                { key: 'duration', placeholder: 'Duration (e.g. 5 Days)' },
                { key: 'image_url', placeholder: 'Image URL' },
              ].map(f => (
                <input
                  key={f.key} required
                  type={f.type || 'text'}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={inp}
                />
              ))}
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                style={{ ...inp, appearance: 'none' }}
              >
                <option value="">Select Category</option>
                {['Heritage', 'Nature', 'Beach', 'Adventure', 'Spiritual'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={4}
                style={{ ...inp, resize: 'vertical', marginBottom: '20px' }}
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1, background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
                    color: 'white', border: 'none', padding: '14px',
                    borderRadius: '12px', fontWeight: 700,
                    fontSize: '0.95rem', cursor: 'pointer',
                  }}
                >
                  {editId ? '✏️ Update Tour' : '➕ Add Tour'}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={() => { setEditId(null); setForm({ title: '', description: '', location: '', state: '', price: '', duration: '', category: '', image_url: '' }); setTab('tours') }}
                    style={{
                      padding: '14px 24px', borderRadius: '12px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#8a8a9a', cursor: 'pointer', fontWeight: 600
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}