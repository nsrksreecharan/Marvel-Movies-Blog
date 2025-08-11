import { useSelector } from "react-redux";
import { backgroundColorSelect, colors } from "./Header";
import { AiFillEdit } from "react-icons/ai";       
import { AiFillDelete,AiOutlineCheck ,AiOutlineClose  } from "react-icons/ai";
import { useState } from "react";
import { useDeleteCommentMutation, useEditCommentMutation } from "../redux/apis/moviesApi";

const CommentItem=({
    comment,
    editComment,
    setEditComment,
    refetchMovieDetails
})=>{
    const user=JSON.parse(localStorage.getItem("user"));
    const theme=useSelector((state)=>state.user.theme);
    const [commentVal,setCommentVal]=useState(comment?.comment);
    const dark=theme=="dark";
    const [editCommentApi]=useEditCommentMutation();
    const [deleteComment]=useDeleteCommentMutation();

    const handleEditComment=async()=>{
        const resp=await editCommentApi({
            id:comment?.commentId,
            payload:{comment:commentVal}
        });
        debugger
        if(resp?.data){
            setEditComment(false);
            setCommentVal("");
            refetchMovieDetails();
        }
    }
    const handleDeleteComment=async()=>{
        const resp=await deleteComment(comment?.commentId);
        if(resp?.data){
            setEditComment(false);
            setCommentVal("");
            refetchMovieDetails();
        }
    }
    return (
        <div className={`${dark ? "darkCommentContainer" : ""} commentContainer`}>
            <div className="commentSub">
                <p className={`${colors[backgroundColorSelect]} ${dark ? "darkCommentProfile" : ""} commentProfile`}>{comment?.username?.[0]}</p>
                <p className="commentName">{comment?.username} {user?.id==comment?.userId ? "(You)":""}</p>
            </div>
            {
                !editComment ?
                <p className="commentName">{comment?.comment}</p> :
                <input
                    autocomplete="off"
                    className="editComment"
                    value={commentVal}
                    onChange={(e)=>{
                        setCommentVal(e.target.value);
                    }}
                />
            }
            {user?.id==comment?.userId ?
                 <div className="commentSub2">
                    <button 
                        className= {`${(editComment && (!commentVal || commentVal==comment?.comment)) || editComment ? "disableCommentBtn" : ""} commentBtn`} onClick={(e)=>{
                            if(editComment){
                                handleEditComment()
                            }else{
                                setEditComment(true);
                            }
                               
                        }}
                        disabled={(editComment &&(!commentVal || commentVal==comment?.comment)) || editComment}
                    >
                        {editComment ? <AiOutlineCheck/>: <AiFillEdit/>}
                    </button>
                    {editComment ?
                        <button className="commentBtn" onClick={(e)=>{
                            setEditComment(false);
                        }}>
                            <AiOutlineClose/>
                        </button>
                    : <></>}
                    <button  className="commentBtn"  onClick={(e)=>{
                            handleDeleteComment();
                        }}><AiFillDelete/></button>
                </div> :
                <></>
            }
        </div>
    )
}

export default CommentItem;