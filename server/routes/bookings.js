import express from 'express'
import pool from '../db.js'

const router = express.Router()

// POST create booking
router.post('/', async (req, res) => {
  try {
    const { tour_id, customer_name, customer_email, customer_phone, travel_date, num_people } = req.body

    const tour = await pool.query('SELECT price FROM tours WHERE id = $1', [tour_id])
    if (tour.rows.length === 0)
      return res.status(404).json({ success: false, message: 'Tour not found' })

    const total_price = tour.rows[0].price * num_people

    const result = await pool.query(
      `INSERT INTO bookings (tour_id, customer_name, customer_email, customer_phone, travel_date, num_people, total_price)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [tour_id, customer_name, customer_email, customer_phone, travel_date, num_people, total_price]
    )
    res.status(201).json({ success: true, data: result.rows[0], message: '🎉 Booking confirmed!' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET all bookings for admin
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, t.title as tour_title, t.location
      FROM bookings b
      JOIN tours t ON b.tour_id = t.id
      ORDER BY b.created_at DESC
    `)
    res.json({ success: true, data: result.rows })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

export default router