// Utility function to get car images based on car type and brand
export const getCarImage = (car) => {
  const { type, id } = car || {}

  const imageMap = {
    sedan: [
      '1493238792000-8113da705763',
      '1519583239408-0d7c27c22e94',
      '1503736073573-2753cb25828b',
      '1469474968028-56623f02e42e'
    ],
    suv: [
      '1469990332815-af997d62bc4b',
      '1503736334956-4c8f8e92946d',
      '1549923746-c502d488b3ea',
      '1472214103451-9374bd1c798e'
    ],
    sports: [
      '1523983300246-4f1cbf2b793a',
      '1503736316720-e590b17c8f19',
      '1483721310020-03333e577078',
      '1503736155890-bf2d21fc9e4b'
    ],
    luxury: [
      '1523980439446-f48f55227ef8',
      '1525609004556-c46c7d6cf023',
      '1502872364588-894d7d6ddfab',
      '1503736334956-4c8f8e92946d'
    ]
  }

  const typeImages = imageMap[type?.toLowerCase()] || imageMap.sedan
  const index = id ? (id - 1) % typeImages.length : 0
  const imageId = typeImages[index]

  return `https://images.unsplash.com/photo-${imageId}?w=900&h=600&fit=crop&crop=entropy&auto=format&q=80`
}

export const getDefaultCarImage = () => {
  return 'https://images.unsplash.com/photo-1503736316720-e590b17c8f19?w=900&h=600&fit=crop&auto=format&q=80'
}

export const getHeroImage = () => {
  return 'https://images.unsplash.com/photo-1503736073573-2753cb25828b?w=1920&h=1080&fit=crop&auto=format&q=80&sat=-5'
}

