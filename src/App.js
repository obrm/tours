import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tours, setTours] = useState([])

  const fetchTours = async () => {
    setLoading(true)
    try {
      const res = await fetch(url)
      const tours = await res.json()
      setLoading(false)
      setTours(tours)
    } catch (error) {
      setLoading(false)
      setError('Error occurred. Please try again later.')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  return (
    <main>
      {loading ? (
        <Loading />
      ) : error ? (
        <h3>{error}</h3>
      ) : tours.length === 0 ? (
        <div className='title'>
          <h2>no tours left</h2>
          <button onClick={fetchTours} className='btn'>
            refresh
          </button>
        </div>
      ) : (
        tours.length > 0 && <Tours tours={tours} removeTour={removeTour} />
      )}
    </main>
  )
}

export default App
