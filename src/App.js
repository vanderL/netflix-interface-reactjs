import React, { useEffect, useState } from 'react'
import css from './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow/index'

export default () => {

  const [moviesList, setMoviesList] = useState([])

  useEffect(() =>{
    const loadAll = async () => {
      //Pegando a lista!
      let list = await Tmdb.getHomeList()
      setMoviesList(list)
    }

    loadAll()
  }, [])


  return (
    <div className="page">
      <section className="lists">
        {moviesList.map((item, key) => (
          
          <MovieRow key={key} title={item.title} items={item.items} />

        ))}
      </section>
    </div>
  )
}