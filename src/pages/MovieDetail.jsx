import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import ReactPlayer from "react-player/lazy";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import { useAddCommentMutation, useAddLikeMutation, useDisLikeMutation, useGetMovieByIdQuery } from "../redux/apis/moviesApi";
import { useSelector } from "react-redux";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import CommentItem from "../components/CommentItem";

const MovieDetail = () => {

  
  const myDivRef = useRef(null);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(true);
  const { movieId } = useParams();
  const user=useSelector((state)=> state.user);
  const dark=user.theme=="dark";
  const {
    data:movieDetails,
    error,
    isLoading:loading,
    isFetching,
    isSuccess,refetch:refetchMovieDetails}=useGetMovieByIdQuery(movieId);
  const [comment,setComment]=useState("");
  const [editComment,setEditComment]=useState(false);
  const handleComment=(e)=>{
    setComment(e.target.value);
  };

  const [addLike]=useAddLikeMutation();
  const [dislike]=useDisLikeMutation();
  const [addComment]=useAddCommentMutation();
  function extractYoutubeId(url) {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  useEffect(() => {
    if(movieDetails?.movie?.length){
      setData(movieDetails?.movie?.[0])
      setSuccess(true);
      setIsLoading(false);
    } else if(error){
      setSuccess(false);
      setIsLoading(false);
    }
  }, [movieId,movieDetails]);

  const handleAddLike=async(liked)=>{
    if(liked){
      const resp=await dislike(movieId);
      if(resp?.data?.message){
        refetchMovieDetails();
      }
    }else{
      const resp=await addLike(movieId);
      if(resp?.data?.message){
        refetchMovieDetails();
      }
    }
  }

  const handleAddComment=async()=>{
    const resp=await addComment({
      id:movieId,
      payload:{comment}
    });

    if(resp?.data){
      refetchMovieDetails();
      setComment("");
    }
  };

  const renderSuccessView = () => {
    const {
      about = [],
      cast = [],
      directors = "",
      film,
      poster,
      producers = [],
      screenwriters = [],
      trailer_url,
      plot = [],
      phase,
      movieComments=[],
      likes=[],
      liked
    } = data;

    return (
      <div className={`${dark ? "darkMovieDetails" : "" } MovieDetailsContainer`}>
        <div className="PosterAndTrailerContainer">
          <div className="PosterContainer">
            <img src={poster} className="filmPoster" alt="film poster" />
          </div>
          <div className="ReactPlayerContianer">
            <iframe
                width="700"
                height="400"
                src={`https://www.youtube.com/embed/${extractYoutubeId(trailer_url)}?autoplay=1&modestbranding=1&controls=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="FilmTitleAndLikeDisLikeContainer">
          <div className="filmTitleContainer">
            <h1>{film}</h1>
          </div>
          <div className="LikeDislikeContainer">
              <button type="button" className="likeButton" onClick={(e)=>{
                handleAddLike(liked,movieId)
              }}>
                {!liked ? <AiOutlineLike color={`${dark ? "white" : "black" }`}/> : <AiFillLike color="blue"/>}
              </button>
              <span>{likes}</span>
              <button 
                type="button" 
                className={`likeButton ${dark ? "likeButtonDark" : "" } `}
                onClick={(e)=>{
                  if (myDivRef.current) {
                    myDivRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Comments
              </button>
              <span>{movieComments?.length}</span>
          </div>
        </div>

        <hr className="HrLine" />
        <div className="movieDetailsContainer">
          <div className="movieDetails">
            <h2 className="castHeading">Movie Cast</h2>
            <div className="CastContainer">
              <div className="castBox">
                <h3>Actors</h3>
                <hr />
                {cast.map((i, idx) => (
                  <p key={idx}>{i}</p>
                ))}
              </div>
              <div className="castBox">
                <h3>Director</h3>
                <hr />
                <p>{directors}</p>
                <br />
                <br />
                <h3>{producers.length === 1 ? "Producer" : "Producers"}</h3>
                <hr />
                {producers.map((i, idx) => (
                  <p key={idx}>{i}</p>
                ))}
              </div>
              <div className="castBox">
                <h3>{screenwriters.length === 1 ? "Screen Writer" : "Screen Writers"}</h3>
                <hr />
                {screenwriters.map((i, idx) => (
                  <p key={idx}>{i}</p>
                ))}
              </div>
            </div>

            <div className="plotHeaderContainer">
              <h3>About</h3>
              <hr />
            </div>
            <div className="plotContainer">
              {about.map((i, idx) => (
                <p className="plot" key={idx}>
                  {i}
                </p>
              ))}
            </div>

            <div className="plotHeaderContainer">
              <h3>Plot</h3>
              <hr />
            </div>
            <div className="plotContainer">
              {plot.map((i, idx) => (
                <p className="plot" key={idx}>
                  {i}
                </p>
              ))}
            </div>
          </div>
          <div className="commentsSection" id="commentSection" ref={myDivRef}>
              <h2>Comments</h2>
              <div>
                {movieComments?.length ? <>
                  {movieComments?.map((eachComment)=><CommentItem key={eachComment?.id} comment={eachComment} setEditComment={setEditComment} editComment={editComment} refetchMovieDetails={refetchMovieDetails}/>)}
                </>:<p className="noComments">
                  No Comments Yet
                </p>}
              </div>
              <div className="addCommentContainer">
                <input 
                  autocomplete="off"
                  id="comment"
                  className="addCommentInput"
                  placeholder="Type Here..."
                  value={comment}
                  onChange={handleComment}
                />
                <button 
                  className="addCommentBtn" 
                  onClick={handleAddComment}
                  disabled={!comment}
                > + Add </button>
              </div>
          </div>
          
        </div>
        
      </div>
    );
  };

  const renderFailureView = () => (
    <div className={`${dark ? "darkMovieDetails" : "" } MovieDetailsContainer loadingContainer`}>
      <h1>Something went wrong</h1>
      <Link to="/">
        <button className="btn btn-primary">Home</button>
      </Link>
    </div>
  );

  const renderLoader = () => (
    <div className={`${dark ? "darkMovieDetails" : "" } MovieDetailsContainer loadingContainer`}>
      <TailSpin color="blue"/>
    </div>
  );

  if (isLoading) return renderLoader();
  return success ? renderSuccessView() : renderFailureView();
};

export default MovieDetail;
