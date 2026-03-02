import express from 'express'
import pool from '../db.js'

const router = express.Router()

// Create a booking
router.post('/', async (req, res) => {
  try {
    const { tour_id, customer_name, customer_email, customer_phone, travel_date, num_people } = req.body

    const tourResult = await pool.query('SELECT price FROM tours WHERE id = $1', [tour_id])
    if (tourResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Tour not found' })
    }

    const price = tourResult.rows[0].price
    const total_price = price * num_people

    const result = await pool.query(
      `INSERT INTO bookings (tour_id, customer_name, customer_email, customer_phone, travel_date, num_people, total_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [tour_id, customer_name, customer_email, customer_phone, travel_date, num_people, total_price]
    )

    res.json({ success: true, data: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: err.message })
  }
})

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, t.title as tour_title, t.category
      FROM bookings b
      JOIN tours t ON b.tour_id = t.id
      ORDER BY b.created_at DESC
    `)
    res.json({ success: true, data: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: err.message })
  }
})

// Analytics endpoint
router.get('/analytics', async (req, res) => {
  try {
    const revenueResult = await pool.query(
      `SELECT COALESCE(SUM(total_price), 0) as total_revenue FROM bookings WHERE status != 'cancelled'`
    )
    const bookingsResult = await pool.query(
      `SELECT COUNT(*) as total_bookings FROM bookings`
    )
    const toursResult = await pool.query(
      `SELECT COUNT(*) as total_tours FROM tours`
    )
    const customersResult = await pool.query(
      `SELECT COUNT(DISTINCT customer_email) as total_customers FROM bookings`
    )
    const monthlyResult = await pool.query(`
      SELECT 
        TO_CHAR(created_at, 'Mon') as month,
        TO_CHAR(created_at, 'YYYY-MM') as month_key,
        COUNT(*) as bookings,
        COALESCE(SUM(total_price), 0) as revenue
      FROM bookings
      WHERE created_at >= NOW() - INTERVAL '6 months'
      GROUP BY month, month_key
      ORDER BY month_key ASC
    `)
    const topToursResult = await pool.query(`
      SELECT 
        t.title, t.category, t.price,
        COUNT(b.id) as booking_count,
        COALESCE(SUM(b.total_price), 0) as revenue
      FROM tours t
      LEFT JOIN bookings b ON t.id = b.tour_id
      GROUP BY t.id, t.title, t.category, t.price
      ORDER BY booking_count DESC
      LIMIT 5
    `)
    const categoryResult = await pool.query(`
      SELECT 
        t.category,
        COUNT(b.id) as bookings,
        COALESCE(SUM(b.total_price), 0) as revenue
      FROM tours t
      LEFT JOIN bookings b ON t.id = b.tour_id
      GROUP BY t.category
      ORDER BY bookings DESC
    `)
    const recentResult = await pool.query(`
      SELECT b.*, t.title as tour_title, t.category
      FROM bookings b
      JOIN tours t ON b.tour_id = t.id
      ORDER BY b.created_at DESC
      LIMIT 5
    `)
    const statusResult = await pool.query(`
      SELECT status, COUNT(*) as count FROM bookings GROUP BY status
    `)

    res.json({
      success: true,
      data: {
        stats: {
          total_revenue: Number(revenueResult.rows[0].total_revenue),
          total_bookings: Number(bookingsResult.rows[0].total_bookings),
          total_tours: Number(toursResult.rows[0].total_tours),
          total_customers: Number(customersResult.rows[0].total_customers),
        },
        monthly: monthlyResult.rows,
        topTours: topToursResult.rows,
        categories: categoryResult.rows,
        recentBookings: recentResult.rows,
        statusBreakdown: statusResult.rows,
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: err.message })
  }
})

export default router