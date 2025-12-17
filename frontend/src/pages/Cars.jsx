import { useEffect, useState } from 'react'
import CarCard from '../components/CarCard'
import { getCars } from '../services/api'
import '../styles/Cars.css'

const filterOptions = ['all', 'sedan', 'suv', 'sports', 'luxury']

function Cars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadCars()
  }, [])

  const loadCars = async () => {
    try {
      setLoading(true)
      const data = await getCars()
      setCars(data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Failed to load cars. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const filteredCars =
    filter === 'all'
      ? cars
      : cars.filter(
          (car) => car.type && car.type.toLowerCase() === filter.toLowerCase()
        )

  if (loading) {
    return (
      <div className="cars-page">
        <div className="container">
          <div className="loading-state">
            <p>Loading cars...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="cars-page">
        <div className="container">
          <div className="error-state">
            <p>{error}</p>
            <button onClick={loadCars} className="btn btn-primary">
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cars-page">
      <div className="container">
        <div className="page-header">
          <p className="eyebrow">Aditya Rental fleet</p>
          <h1>Available Right Now</h1>
          <p className="page-subtitle">
            Choose from {cars.length} curated vehicles refreshed every 60 seconds
          </p>
        </div>

        <div className="filter-section">
          {filterOptions.map((option) => (
            <button
              key={option}
              className={`filter-btn ${filter === option ? 'active' : ''}`}
              onClick={() => setFilter(option)}
              type="button"
            >
              {option === 'all' ? 'All cars' : option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>

        <div className="cars-grid">
          {filteredCars.length ? (
            filteredCars.map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <div className="no-cars">
              <p>No cars found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cars

