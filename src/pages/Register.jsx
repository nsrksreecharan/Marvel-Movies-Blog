import { useState, useRef, useContext } from "react";
import ReactCrop from "react-image-crop";
// import { Buffer } from "buffer";
import { Navigate, Link, useNavigate } from "react-router-dom";
import "react-image-crop/dist/ReactCrop.css";
import "reactjs-popup/dist/index.css";
import { ImCrop } from "react-icons/im";
import { AiOutlineUserAdd, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TailSpin } from "react-loader-spinner";
import ThemeContext from "../context/ThemeContext";
import {BASE_URL} from "../redux/apiSlice"
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const user=useSelector((state)=>state.user);
  const dark=user.theme=="dark";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reenter, setReenter] = useState("");
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [fileErrorMsg, setFileErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showEenter, setShowEenter] = useState(false);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [showCrop, setShowCrop] = useState(false);
  const [changedCrop, setChangedCrop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const imagePreviewCanvas = useRef(null);
  const fileInput = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg" ||
        selectedFile.type === "image/png")
    ) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setSrc(reader.result);
      reader.readAsDataURL(selectedFile);
      setFileError(false);
    } else {
      setFileError(true);
      setFileErrorMsg("Your selection is not an image.");
    }
  };

  const image64toCanvasRef = (canvasRef, image64, pixelCrop) => {
    const canvas = canvasRef;
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = image64;
    image.onload = () => {
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
    };
  };

  const handleCropComplete = (crop, pixelCrop) => {
    if (src && crop.width && crop.height) {
      const canvasRef = imagePreviewCanvas.current;
      image64toCanvasRef(canvasRef, src, pixelCrop);
    }
  };

  const loadCropImage = () => {
    if (changedCrop) {
      const canvas = imagePreviewCanvas.current;
      const url = canvas.toDataURL("image/jpeg");
      const base64=url.replace("data:image/jpeg;base64,", "");
      const byteString = atob(base64.split(',')[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const intArray = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
         intArray[i] = byteString.charCodeAt(i);
      }
    //   const buffer = Buffer.from(base64, "base64");
      const croppedFile = new File([intArray], "image.jpg", { type: "image/jpeg" });
      selectCroppedFile(croppedFile);
    } else {
      setShowCrop(false);
    }
  };

  const selectCroppedFile = (file) => {
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png")
    ) {
      setFile(file);
      setShowCrop(false);
      const reader = new FileReader();
      reader.onload = () => {
        setSrc(reader.result);
        setCrop({ aspect: 1 / 1 });
        setChangedCrop(false);
      };
      reader.readAsDataURL(file);
    } else {
      setFileError(true);
      setFileErrorMsg("Your selection is not an image.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append("profile_image", file);
    }
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch(`${BASE_URL}user/register`, {
        method: "POST",
        body: formData,
        credentials: "include", // If you want to send cookies
      });

      if (response.ok) {
        navigate("/login", { replace: true });
      } else {
        const text = await response.text();
        setShowError(true);
        setErrorMsg(text);
      }
    } catch (err) {
      setShowError(true);
      setErrorMsg("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const dontSubmit = (event) => {
    event.preventDefault();
    if (username === "" && password !== "" && reenter !== "") {
      setShowError(true);
      setErrorMsg("Username Required");
    } else if (username !== "" && password === "" && reenter !== "") {
      setShowError(true);
      setErrorMsg("Password Required");
    } else if (username !== "" && password !== "" && reenter === "") {
      setShowError(true);
      setErrorMsg("Reenter Required");
    } else {
      setShowError(true);
      setErrorMsg("Can't Register With Empty Fields");
    }
  };

  return (
    <div className={`${dark ? "blackBackground" : "whiteBackground"} RegisterPage`}>
      <div className={`${dark ? "blackLogin" : "whiteLogin"} RegisterPageBox`}>
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

        {!showCrop ? (
          <form 
            
            autocomplete="off"
            className="RegisterForm"
            onSubmit={
              username === "" || password === "" || reenter === "" || password !== reenter
                ? dontSubmit
                : handleSubmit
            }
          >
            <div className="FormItemsContainer">
              <div className="RegistrantProfileBox">
                <input
                  type="file"
                  ref={fileInput}
                  onChange={handleFileChange}
                  className="fileInput"
                />
                {!src ? (
                  <button
                    type="button"
                    className={`${dark ? "blackProfile" : ""} ProfileAdd`}
                    onClick={(e) => {
                      e.preventDefault();
                      fileInput.current.click();
                    }}
                  >
                    <AiOutlineUserAdd className="Face1" />
                  </button>
                ) : null}
                {src ? (
                  <div className="ProfilePictureContainer">
                    <img src={src} alt="selected" className="profileImageRegister" />
                    <div className="editButtonsContainer">
                      <button
                        type="button"
                        className={`${dark ? "darkCrop" : "whiteCrop"} CropButton`}
                        onClick={() => setShowCrop(true)}
                      >
                        <ImCrop />
                      </button>
                      <button
                        type="button"
                        className={`${dark ? "darkCrop" : "whiteCrop"} CropButton`}
                        onClick={() => {
                          setFile(null);
                          setSrc(null);
                        }}
                      >
                        <RiDeleteBin6Line />
                      </button>
                      <button
                        type="button"
                        className="changeButton"
                        onClick={() => fileInput.current.click()}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>{fileError ? fileErrorMsg : ""}</p>
                )}
              </div>

              <div className="InputBoxesContainer">
                <div className="inputBox">
                  <label htmlFor="username" className={`${dark ? "white" : ""} label`}>
                    Username
                  </label>
                  <input
                    autoComplete="off"
                    id="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setShowError(false);
                    }}
                    className={`${dark ? "darkInput" : ""} input`}
                    type="text"
                    placeholder="Enter Username"
                  />
                </div>

                <div className="inputBox">
                  <label htmlFor="password" className={`${dark ? "white" : ""} label`}>
                    Password
                  </label>
                  <div className={`${dark ? "darkInput" : ""} input InputBox`}>
                    <input
                      autocomplete="new-password"
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setShowError(false);
                      }}
                      className={`${dark ? "darkInput" : ""} Input`}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                    />
                    {password && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="Eye"
                      >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </button>
                    )}
                  </div>
                </div>

                <div className="inputBox">
                  <label htmlFor="reenter" className={`${dark ? "white" : ""} label`}>
                    Confirm Password
                  </label>
                  <div className={`${dark ? "darkInput" : ""} input InputBox`}>
                    <input
                      autoComplete="off"
                      id="reenter"
                      value={reenter}
                      onChange={(e) => {
                        setReenter(e.target.value);
                        setShowError(false);
                      }}
                      className={`${dark ? "darkInput" : ""} Input`}
                      type={showEenter ? "text" : "password"}
                      placeholder="Confirm Password"
                    />
                    {reenter && (
                      <button
                        type="button"
                        onClick={() => setShowEenter((p) => !p)}
                        className="Eye"
                      >
                        {showEenter ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="loginButton">
              {isLoading ? (
                <TailSpin wrapperClass="tailLoader" color="white" radius={1} height={30} />
              ) : (
                "Register Me"
              )}
            </button>
            {showError && <p className="error">*{errorMsg}</p>}
            <div className="RegisterLinkBox">
              <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                <p className="RegisterPageLink">Already Registered! SignIn</p>
              </Link>
            </div>
          </form>
        ) : (
          <div className="cropBox">
            <div className="CropContainer">
              <div className="cropPreview">
                <canvas ref={imagePreviewCanvas} id="canvas" className="PreviewImage"></canvas>
              </div>
              <div>
                <ReactCrop
                  crop={crop}
                  minHeight={50}
                  minWidth={50}
                  onChange={(newCrop) => {
                    setCrop(newCrop);
                    setChangedCrop(true);
                  }}
                  onComplete={handleCropComplete}
                  className="cropTheImage"
                >
                  <img src={src} className="ImagePreviewCrop" />
                </ReactCrop>
              </div>
            </div>
            <button type="button" className="loginButton" onClick={loadCropImage}>
              Done
            </button>
            <button type="button" className="loginButton" onClick={() => setShowCrop(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
