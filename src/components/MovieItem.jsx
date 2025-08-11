import {AiFillStar,AiFillLike} from "react-icons/ai";
import 'reactjs-popup/dist/index.css'

const MovieItem=props=>{
    const {itemDetails}=props;
    const {poster,film,likes,rating}=itemDetails;
    return(
        <div className="MovieItemContainer">
            <img src={poster} alt="poster" className="poster"/>
            <p className="movieName">{film}</p>
            <div className="bottomLine">
                <div className="Star">
                    <AiFillStar className="bottomLineLogo1"/>
                    <p className="Rate">{rating}</p>
                </div>
                <div className="Star">
                    <AiFillLike className="bottomLineLogo2"/>
                    <p className="Rate">{likes}</p>
                </div>
                
            </div>
        </div>
    )
}
export default MovieItem