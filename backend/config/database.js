import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

let pool = null

export function getPool() {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      ssl: { rejectUnauthorized: false },  // Required for RDS
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    })

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err)
    })
  }

  return pool
}

export async function initDatabase() {
  const pool = getPool()

  try {
    await pool.query('SELECT NOW()')
    console.log('✅ Database connection established')

    // Create tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        brand VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL,
        type VARCHAR(50),
        seats INTEGER,
        pricePerDay DECIMAL(10,2) NOT NULL,
        image TEXT,
        available BOOLEAN DEFAULT true,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        carId INTEGER REFERENCES cars(id) ON DELETE CASCADE,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        customerName VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_bookings_carId
      ON bookings(carId)
    `)

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_bookings_dates
      ON bookings(startDate, endDate)
    `)

    // Insert sample data if table empty
    const carCount = await pool.query('SELECT COUNT(*) FROM cars')
    if (parseInt(carCount.rows[0].count, 10) === 0) {
      const sampleCars = [
        ['Toyota', 'Camry', 'Sedan', 5, 45.0],
        ['Honda', 'Accord', 'Sedan', 5, 48.0],
        ['Ford', 'Mustang', 'Sports', 4, 75.0],
        ['BMW', '3 Series', 'Luxury', 5, 95.0],
        ['Mercedes-Benz', 'C-Class', 'Luxury', 5, 100.0],
        ['Jeep', 'Wrangler', 'SUV', 5, 65.0],
        ['Toyota', 'RAV4', 'SUV', 5, 55.0],
        ['Nissan', 'Altima', 'Sedan', 5, 42.0],
        ['Chevrolet', 'Corvette', 'Sports', 2, 120.0],
        ['Audi', 'A4', 'Luxury', 5, 90.0]
      ]

      for (const [brand, model, type, seats, price] of sampleCars) {
        await pool.query(
          `INSERT INTO cars (brand, model, type, seats, pricePerDay)
           VALUES ($1, $2, $3, $4, $5)`,
          [brand, model, type, seats, price]
        )
      }

      console.log('🚀 Sample cars inserted')
    }
  } catch (error) {
    console.error('❌ Database initialization error:', error)
    throw error
  }
}
