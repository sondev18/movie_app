import { Alert } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../../componets/LoadingScreen';
import CustomPagination from '../../componets/Pagination/CustomPagination';
import Genres from '../../componets/SingleContent/Genres';
import SingleContent from '../../componets/SingleContent/SingleContent';
import useGenre from '../../hooks/useGenres';
import apiService from '../../app/apiService';
import { API_KEY } from '../../app/config';

function Series() {
  const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [numOfPages, setNumOfPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL = useGenre(selectedGenres);


    useEffect(() => {
      const fetchMovies = async () => {
        setLoading(true);
        try{
          const { data } = await apiService.get(`discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
          setContent(data.results);
          setNumOfPages(data.total_pages);
          setError("");
        }catch(error)
        {
          setError(error.message);
        }
       
        setLoading(false);
      };
      
      fetchMovies()  
    }, [genreforURL, page ]);
  return (
    <div>
        <span className='pageTitle'>Discover Series</span>
        <Genres
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
        type="tv"
        />
        <Box >
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <div className='trending'>
                  {content && content.map((e)=> 
                  <SingleContent 
                  key={e.id} 
                  id={e.id}
                  poster={e.poster_path}
                  title={e.title || e.name}
                  date={e.first_air_date || e.release_date}
                  media_type="tv"
                  vote_average={e.vote_average}
                  />)}
                  
                </div>
              )}
            </>
          )}
        </Box>
        {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
        )}
        
    </div>
  )
}

export default Series