import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  
  const dark = useSelector((state)=>state.user.theme);

  const Loader=()=>{
    return (
      <div className="mainLoader">
        <div className="imageLogoContainer">
          <img
            src={
              dark
                ? "https://res.cloudinary.com/dub9ymu0j/image/upload/v1672503510/1672503437356_lmbm5i.png"
                : "https://res.cloudinary.com/dub9ymu0j/image/upload/v1672503516/1672503379370_hr9p4z.png"
            }
            alt="logo"
            className="LoginLogo"
          />
        </div>
      </div>
    )
  }

  useEffect(() => {
    const checkAuth = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      // Case: No user info
      if (!user?.accessToken) {
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }

      setIsAuthenticated(true);
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  if (isChecking) return Loader();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
