import { FaTimes,FaSignOutAlt } from "react-icons/fa";
import { backgroundColorSelect, colors } from "./Header";

const Profile=({close,url,logoutUser,dark=""})=>{
    const user=JSON.parse(localStorage.getItem("user"));
    const username=user?.name;
    return (
        <>
            <div className={`${dark ? "darkProfile" : "" } ProfileSection`}>
                
                <div className="closeBtnContainer">
                    <button type="button" className={`btn ${dark ? "darkCloseBtn" : "" } closeBtn`} onClick={() => close()}>
                        <FaTimes/>
                    </button>
                </div>
                <div className="ProfileSectionInnerBox">
                    {url ? 
                        <img src={url} alt="profile" className="ProfilePicture" />
                        :
                        <div className={`${colors[backgroundColorSelect]} UserProfile`}>
                            <p className="userLetter">{username !== "" ? username[0].toUpperCase() : ""}</p>
                        </div>
                    }
                    
                    <div className="LogoutContainer">
                        <p>Username : {user?.name}</p>
                        <button type="button" onClick={logoutUser} className="LogoutButton">
                            Logout <FaSignOutAlt/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;