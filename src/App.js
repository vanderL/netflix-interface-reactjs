import React, { useEffect, useState } from 'react'
import css from './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow/index'
import FeaturedMovie from './components/FeaturedMovie/index'
import Header from './components/Header/index'


export default () => {

  const [moviesList, setMoviesList] = useState([])
  const [featuredData, setFeaturedData] = useState([])
  const [blackHeader, setBlackHeader] = useState(false)

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

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 80) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])


  return (
    <div className="page">
      <Header black={blackHeader}/>

      {featuredData  &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {moviesList.map((item, key) => (
          
          <MovieRow key={key} title={item.title} items={item.items} />

        ))}
      </section>

      <footer>
        feito com <span role="img" aria-label="heart">♥</span> <br />
        Direitos de imagem para netflix <br />
        Dados do site Themoviedb.org
      </footer>

      {moviesList.length <= 0 &&
        <div className="loading">
          <img src="https://media1.tenor.com/images/9c33f1f5aababce10ab11da844a6cc7e/tenor.gif" alt="loading"></img>
        </div>
      }
    </div>
  )
}