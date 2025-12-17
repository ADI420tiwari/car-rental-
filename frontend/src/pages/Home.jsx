import { Link } from 'react-router-dom'
import { getHeroImage } from '../utils/carImages'
import '../styles/Home.css'

const featureCards = [
  {
    icon: '💎',
    title: 'Curated fleet',
    copy: 'Every vehicle is handpicked, detailed, and inspected before each trip.'
  },
  {
    icon: '⚡',
    title: 'Instant booking',
    copy: 'Reserve your car in under 60 seconds with transparent, all-in pricing.'
  },
  {
    icon: '🛡️',
    title: 'Total peace of mind',
    copy: 'Full insurance, 24/7 roadside support, and door-to-door delivery.'
  },
  {
    icon: '🕑',
    title: 'Concierge service',
    copy: 'Dedicated trip managers who coordinate every hand-off and return.'
  }
]

const collectionCards = [
  {
    title: 'City breaks',
    tag: 'Sedans',
    copy: 'Compact luxury sedans with panoramic roofs and wireless CarPlay.'
  },
  {
    title: 'Adventure ready',
    tag: 'SUVs',
    copy: 'AWD SUVs with roof rails, ventilated seats, and extra cargo room.'
  },
  {
    title: 'Headline arrivals',
    tag: 'Sports',
    copy: 'Statement-making coupes tuned for thrill seekers and weekend escapes.'
  }
]

const heroShowcase = {
  image:
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1100&q=80',
  model: '2024 Porsche Taycan',
  specs: 'Electric • 4 seats',
  price: '₹18,500 / day'
}

function Home() {
  const heroBackground = getHeroImage()

  return (
    <div className="home-page">
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(6, 11, 25, 0.92), rgba(9, 20, 40, 0.8)), url(${heroBackground})`
        }}
      >
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">Aditya Rental • Premium mobility</p>
            <h1>Drive statement-making cars without the ownership stress</h1>
            <p className="hero-copy">
              From city runabouts to grand tourers, Aditya Rental keeps a curated fleet ready
              for business trips, weddings, and spontaneous escapes. Reserve in minutes and
              we deliver to your door.
            </p>
            <div className="hero-actions">
              <Link to="/cars" className="btn btn-primary">
                Browse cars
              </Link>
              <Link to="/cars" className="btn btn-ghost">
                View current deals
              </Link>
            </div>
            <div className="hero-metrics">
              <div className="metric-card">
                <span className="metric-value">250+</span>
                <span className="metric-label">Cars available now</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">98%</span>
                <span className="metric-label">On-time drop-offs</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">45 mins</span>
                <span className="metric-label">Average delivery</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-card">
              <span className="hero-pill">Featured arrival</span>
              <img src={heroShowcase.image} alt={heroShowcase.model} loading="lazy" />
              <div className="hero-visual-details">
                <h3>{heroShowcase.model}</h3>
                <p>{heroShowcase.specs}</p>
                <span>{heroShowcase.price}</span>
              </div>
            </div>
            <div className="hero-visual-badge">
              <span>24/7</span>
              <p>Concierge support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="experience-section">
        <div className="container">
          <div className="experience-header">
            <p className="eyebrow">Why drive with us</p>
            <h2>Luxury that feels personal</h2>
            <p>
              Every trip is handled end-to-end by Aditya Rental specialists so you can focus on
              the journey. Expect spotless cars, thoughtful touches, and lightning-fast support.
            </p>
          </div>
          <div className="experience-grid">
            {featureCards.map(({ icon, title, copy }) => (
              <article key={title} className="experience-card">
                <div className="experience-icon">{icon}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="collection-section">
        <div className="container collection-grid">
          <article className="collection-card collection-highlight">
            <p className="eyebrow">Signature collection</p>
            <h3>Reserve the exact car you fall in love with.</h3>
            <p>
              Swap vehicles anytime, enjoy complimentary detailing, and get priority access to
              limited releases across Mumbai, Pune, and Bengaluru.
            </p>
            <Link to="/cars" className="btn btn-primary">
              Explore the fleet
            </Link>
          </article>
          {collectionCards.map(({ title, tag, copy }) => (
            <article key={title} className="collection-card">
              <span className="collection-tag">{tag}</span>
              <h4>{title}</h4>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home

