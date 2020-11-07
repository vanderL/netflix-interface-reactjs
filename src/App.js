import React, { useEffect, useState } from 'react'
import css from './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow/index'
import FeaturedMovie from './components/FeaturedMovie/index'
import Header from './components/Header/index'


export default () => {

  const [moviesList, setMoviesList] = useState([])
  const [featuredData, setFeaturedData] = useState([])

  useEffect(() =>{
    const loadAll = async () => {
      //Pegando a lista!
      let list = await Tmdb.getHomeList()
      setMoviesList(list)

      //Pegando o Featured
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)

      console.log(chosenInfo)
      
    }

    loadAll()
  }, [])


  return (
    <div className="page">
      <Header />

      {featuredData  &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {moviesList.map((item, key) => (
          
          <MovieRow key={key} title={item.title} items={item.items} />

        ))}
      </section>
    </div>
  )
}