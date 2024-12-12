import React,{useEffect,useState}from 'react';
import {useLocation,useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {GoArrowLeft} from "react-icons/go";
import './Section.scss';
import { SlPlus } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { SlControlPlay } from "react-icons/sl";
const topRated="top_rated";
const apiKey="4ea1782d24fd5d86475cff463738e2db";
const imgUrl="https://image.tmdb.org/t/p/original";
const url="https://api.themoviedb.org/3";
const Card=({img})=>(
    <img className='card' src={img} alt="cover"/>
)
const Row=({title,arr=[]})=>{
    return(
        <div className='Section-row'>
            <h2>{title}</h2>
            <div>{
                arr.map((item,index)=>(
                    <Link key={index} to={`/section/${item.id}`} state={{ movie: item }}>
                        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
                    </Link>
                ))}
            </div>
        </div>
    );
};
function Section(){
    const {state}=useLocation();
    const {id}=useParams();
    const navigate=useNavigate();
    const [movie,setMovie]=useState(state?.movie||null);
    const [topRatedMovies,setTopRated]=useState([]);
    useEffect(()=>{
        if (!movie&&id){
            const fetchMovie=async()=>{
                try{
                    const {data}=await axios.get(`${url}/movie/${id}?api_key=${apiKey}&language=en-US`);
                    setMovie(data);
                    console.log("Fetched movie data:", data);
                }catch(error){
                    console.error("Error fetching movie data:", error);
                }
            };
            fetchMovie();
        }
    },[id,movie]);
    useEffect(()=>{
        const fetchToprated=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}&language=en-US&page=5`);
            setTopRated(results);
            console.log(data);
        };       
        fetchToprated();
    },[]);
    if(!movie){
        return <div>Loading movie details...</div>;
    }
    return(
        <div className="container">
            <button onClick={()=>navigate(-1)}><GoArrowLeft/> Back</button>
            <h2 className='title'>{movie.original_title}</h2>
            <h2 className='ratings'>Ratings: {movie.vote_average} / {movie.vote_count}</h2>
            <h2 className='release-date'>{movie.release_date}</h2>
            <p className='description'>{movie.overview}</p>
            <button className='btn1'>Play <SlControlPlay/></button>
            <button className='btn2'>Add to List <SlPlus/></button>
            <div className="banner-section">
                {movie.backdrop_path?(
                    <img src={`${imgUrl}/${movie.backdrop_path}`} alt="banner" />
                ):(
                    <div>No banner available</div>
                )}
            </div>
            <Row title={"Similar Movies"} arr={topRatedMovies}/>
        </div>
    );
}
export default Section;