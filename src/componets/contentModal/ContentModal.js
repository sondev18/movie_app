import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import  {useEffect, useState  } from 'react';
import axios from 'axios';
import { img_300, img_500, unavailable, unavailableLandscape } from "../../config/config"
import Carousel from "../Carousel/Carousel";
import YouTubeIcon from '@mui/icons-material/YouTube';
import './ContentModal.css'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: "#39445a",
  boxShadow: 24,
  width: "90%",
    height: "80%",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    p: 4
};

export default function ContentModal({children, media_type, id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(1)
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
        
    const fetchData = async () => {
      setLoading(true);
      try{
        const API_KEY = `21a18fd40187d76bd381816c4a8949ea`
        const  {data}  = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
        );
        
        setContent(data);
        setError("");
      }catch(error)
      {
        setError(error.message);
      }
     
      setLoading(false);
    };

    const fetchVideo = async () => {
        setLoading(true);
        try{
          const API_KEY = `21a18fd40187d76bd381816c4a8949ea`
          const  {data}  = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
          );
          
            
          setVideo(data.results[0]?.key);
          setError("");
        }catch(error)
        {
          setError(error.message);
        }
       
        setLoading(false);
      };
    
      fetchVideo()
    fetchData()  
  }, [page]);

  return (
    <>
      <div type='button' className='media' onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            
            {content && (
            
                <div className="ContentModal">
                    <img
                    src={
                        content.poster_path
                        ? `${img_300}/${content.poster_path}`
                        : unavailable
                    }
                    alt={content.name || content.title}
                    className="ContentModal__portrait"
                    />
                    <img
                    src={
                        content.backdrop_path
                        ? `${img_500}/${content.backdrop_path}`
                        : unavailableLandscape
                    }
                    alt={content.name || content.title}
                    className="ContentModal__landscape"
                    />
                    <div className="ContentModal__about">
                        <span className="ContentModal__title">
                        {content.name || content.title} (
                        {(
                        content.first_air_date ||
                        content.release_date ||
                        "-----"
                        ).substring(0, 4)}
                        )
                    </span>
                    <span className="ContentModal__description">
                        {content.overview}
                    </span>

                    <div className='img-size'>
                        <Carousel id={id} media_type={media_type} />
                    </div>

                    <Button
                        variant="contained"
                        startIcon={<YouTubeIcon />}
                        color="secondary"
                        target="__blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                    >
                        Watch the Trailer
                    </Button>
                    </div>
                </div>
                
                )}
           
            
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
