import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const ContributionsTable=({data,success,error})=>{
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
                <th  className="top-movies-th">User Name</th>
                <th  className="top-movies-th">Likes</th>
                <th  className="top-movies-th">Liked Movies</th>
                <th  className="top-movies-th">Comments</th>
                <th  className="top-movies-th">Commented on</th>
            </thead>
            <tbody className="top-movies-body">
                {loading ? <tr className="top-movies-row">
                                    <td  className="table-cell " colSpan={6}>
                                       <div className="table-cell-loader">
                                            <TailSpin color="blue"/>
                                        </div>
                                    </td>
                                </tr> :
                    (
                        data?.movies?.length ?
                        data?.movies?.map((each,index)=>(
                            <tr className="top-movies-row">
                                <td className="table-cell">{index+1}</td>
                                <td className="table-cell">
                                    <p>{each?.username}</p>
                                </td>
                                <td className="table-cell">{each?.likesCount}</td>
                                <td className="table-cell table-images-cell">{each?.userLikes?.map((eachComment)=><img className="table-img" src={eachComment?.poster}/>)}</td>
                                <td className="table-cell">{each?.userComments?.map((eachLike)=>eachLike?.comment+" , ")}</td>
                                <td className="table-cell table-images-cell">{each?.userComments?.map((eachComment)=><img  className="table-img" src={eachComment?.poster}/>)}</td>
                            </tr>
                        )
                        ) :
                         <tr className="top-movies-row">
                                <td className="table-cell text-center" colSpan={6}> No Data Found</td>
                         </tr>
                    )
                }
                
            </tbody>
        </table>
    )
};

export default ContributionsTable;