import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { convert } from "../pages/Movies";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const YourContributionsTable=({data,isLoading,error,success})=>{
    const user=useSelector((state)=>state.user);

    const [loading,setLoading]=useState(true);
        
    useEffect(()=>{
        if(success || error){
            setLoading(false);
        }
    },[success,error])
    const dark=user.theme=="dark";
    return(
          <table className="top-movies-table">
            <thead className="top-movies-head">
                <th className="top-movies-th">S.No</th>
                <th className="top-movies-th">Film Name</th>
                <th className="top-movies-th">Liked</th>
                <th className="top-movies-th">Rating</th>
                <th className="top-movies-th">Comments</th>
                <th className="top-movies-th">Collections</th>
            </thead>
            <tbody className="top-movies-body">
                {loading ? 
                    <tr className="top-movies-row">
                        <td  className="table-cell " colSpan={6}>
                            <div className="table-cell-loader">
                                <TailSpin color="blue"/>
                            </div>
                        </td>
                    </tr> :
                    (data?.movies?.length ?
                        data?.movies?.map((each,index)=>{
                            const year=each?.date?.split(" ")[2];
                            return (
                                <tr className="top-movies-row">
                                    <td className="table-cell">{index+1}</td>
                                    <td className="table-cell  table-movie-cell">
                                        <img className="table-img" src={each?.poster}/>
                                        <p>{each?.film}</p>
                                    </td>
                                    <td className="table-cell">{!each?.liked ? <AiOutlineLike color={`${dark ? "white" : "black" }`}/> : <AiFillLike color="blue"/>}</td>
                                    <td className="table-cell">{each?.rating}</td>
                                    <td className="table-cell">{each?.userComments?.map((eachLike)=>eachLike?.comment+" , ")}</td>
                                    <td className="table-cell"><HiOutlineCurrencyRupee className="rupee" /> {convert(each?.movie_collection,year)} Crs</td>
                                </tr>
                            )
                        })
                        :
                         <tr className="top-movies-row">
                                <td className="table-cell text-center" colSpan={6}> No Data Found</td>
                         </tr>)
                    }
                
            </tbody>
        </table>
    )
}
export default YourContributionsTable;