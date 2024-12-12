import {React,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import "./Home.scss";
import axios from 'axios';
import {BiPlay} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai';

const apiKey="4ea1782d24fd5d86475cff463738e2db";
const url="https://api.themoviedb.org/3";
const imgUrl="https://image.tmdb.org/t/p/original";
const upcoming="upcoming";
const now_playing="now_playing";
const popular="popular";
const topRated="top_rated";

const Card=({img})=>(
    <img className='card' src={img} alt="cover"/>
)
const Row=({title,arr=[]})=>{
    return(
        <div className='row'>
            <h2>{title}</h2>
            <div>{
                arr.map((item,index)=>(
                    <Link key={index} to={`/section/${item.id}`} state={{movie:item}}>
                        <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
                    </Link>
                ))}
            </div>
        </div>
    );
};
const Home=()=>{
    const [upcomingMovies,setupcoming]=useState([]);
    const [NowPlayingMovies,setnowplaying]=useState([]);
    const [PopularMovies,setpopular]=useState([]);
    const [topRatedMovies,setTopRated]=useState([]);
    const [genre,setGenre]=useState([]);
    const [currentBannerIndex,setCurrentBannerIndex]=useState(0);
    useEffect(()=>{
        const fetchUpcoming=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&language=en-US&page=2`);
            setupcoming(results);
        };
        const fetchNowplaying=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${now_playing}?api_key=${apiKey}&language=en-US&page=2`);
            setnowplaying(results);
        };
        const fetchPopular=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${popular}?api_key=${apiKey}&language=en-US&page=1`);
            setpopular(results);
        };
        const fetchToprated=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}&language=en-US&page=1`);
            setTopRated(results);
        };
        const GetAllGenre=async()=>{
            const {data:{genres}}=await axios.get(`${url}/genre/movie/list?api_key=${apiKey}&language=en-US&page=1`);
            setGenre(genres);
        };
        GetAllGenre();
        fetchUpcoming();
        fetchNowplaying();
        fetchPopular();
        fetchToprated();
    },[]);
    useEffect(()=>{
        const interval=setInterval(()=>{
            setCurrentBannerIndex((prevIndex)=>(prevIndex+1)%PopularMovies.length);
        },9000);
        return()=>clearInterval(interval);
    },[PopularMovies.length]);
    return(
        <section className="home">
            <div className="banner">
                {PopularMovies.map((movie,index)=>(
                    <img key={index} src={`${imgUrl}/${movie.backdrop_path}`} alt="banner" className={
                            index===currentBannerIndex?'active': 
                            index===(currentBannerIndex-1+PopularMovies.length)%PopularMovies.length
                            ?'fade-out'
                            :''
                        }
                    />
                ))}
                <h2 className='movie-name'>{PopularMovies[currentBannerIndex]?.original_title}</h2>
                <p className='desciption'>{PopularMovies[currentBannerIndex]?.overview}</p>
                <button className='play'>Play <BiPlay/></button>
                <button className='addlist'>Add to List <AiOutlinePlus/></button>
            </div>
                <Row title={"Recently Viewed"} arr={PopularMovies}/>
                <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
                <Row title={"Movies"} arr={NowPlayingMovies}/>
                <Row title={"Popular on Netflix"} arr={topRatedMovies}/>
            <div className="genreBox">
                {genre.map((item)=>(
                    <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
                ))}
            </div>
        </section>
    );
};
export default Home;