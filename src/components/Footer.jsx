import { AiOutlineCopyright } from "react-icons/ai";
import { useSelector } from "react-redux";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md"

const Footer = () => {
  const user=useSelector((state)=>state.user);
  const dark=user.theme=="dark";
  return (
      <footer className={`Footer ${dark ? "darkFooter" : ""}`}>
        <div className="CopyRight">
          <AiOutlineCopyright />
          <p>N S R K Sree Charan (2022)</p>
        </div>
       <div className="socialLinksContainer">
          <a className="socialProfile" href="https://github.com/nsrksreecharan" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} />
          </a>
          <a className="socialProfile" href="https://www.linkedin.com/in/nsrksreecharan/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
          <a className="socialProfile" href="mailto:nsrksreecharan104@gmail.com" target="_blank" rel="noopener noreferrer">
            <MdEmail size={24} />
          </a>
          <a className="socialProfile" href="https://docs.google.com/document/d/11FwphnzOsmRwis8fTmtoDroFHl8l2V4W/edit" target="_blank" rel="noopener noreferrer">
            <FaFileAlt size={24} />
          </a>
      </div>
      </footer>
  )
};

export default Footer;
