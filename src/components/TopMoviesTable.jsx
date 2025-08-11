import { GiMoneyStack } from "react-icons/gi";
import { convert } from "../pages/Movies";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { TailSpin } from "react-loader-spinner";
import { useEffect, useState } from "react";

const TopMoviesTable=({data,like=false,success,error,isLoading})=>{
    
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        if(success || error){
            setLoading(false);
        }
    },[success,error])
    return (
        <table className="top-movies-table">
            <thead className="top-movies-head">
                <th  className="top-movies-th">S.No</th>
                <th  className="top-movies-th">Movie Name</th>
                <th  className="top-movies-th">Year</th>
                {like ? <th  className="top-movies-th">Likes</th> : <></>}
                <th  className="top-movies-th">Rating</th>
                <th  className="top-movies-th">Phase</th>
                <th  className="top-movies-th">Collection</th>
                <th  className="top-movies-th">Budget</th>
            </thead>
            <tbody className="top-movies-body">
                {loading ? <tr className="top-movies-row">
                    <td  className="table-cell " colSpan={like ? 8 : 7}>
                       <div className="table-cell-loader">
                            <TailSpin color="blue"/>
                        </div>
                    </td>
                </tr> :
                    (
                        data?.movies?.length ?
                         data?.movies?.map((each,index)=>{
                            const year=each?.date?.split(" ")[2];
                            
                            return (
                                <tr className="top-movies-row">
                                    <td className="table-cell">{index+1}</td>
                                    <td className="table-cell table-movie-cell">
                                        <img className="table-img" src={each?.poster}/>
                                        <p>{each?.film}</p>
                                    </td>
                                    <td className="table-cell">{each?.date}</td>
                                    {like ? <td className="table-cell">{each?.likes}</td> : <></>}
                                    <td className="table-cell">{each?.rating}</td>
                                    <td className="table-cell">{each?.phase}</td>
                                    <td className="table-cell"><HiOutlineCurrencyRupee className="rupee" /> {convert(each?.movie_collection,year)} Crs</td>
                                    <td className="table-cell"><GiMoneyStack className="cash" /> {convert(each?.budget,year)} Crs</td>
                                </tr>
                            )
                         }) :
                         <tr className="top-movies-row">
                                <td className="table-cell text-center" colSpan={like ? 8 : 7}> No Data Found</td>
                         </tr>
                    )
                   
                }
                
            </tbody>
        </table>
    )
}
export default TopMoviesTable;