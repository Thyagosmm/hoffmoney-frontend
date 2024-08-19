import { Icon } from "semantic-ui-react";
import images from "../../../assets/images.js";
import { Link } from "react-router-dom";
import "./Info.css";
export default function FormLogin() {
  return (
    <div className="forgot-password-left">
      <img src={images.logo} alt="Marca" className="infoLogo" />
      <h2>"Gerenciando seu futuro financeiro!"</h2>
      <div className="social-links">
        <div className="social-link">
          <Icon name="instagram" size="big" />
          <div>
            <Link to="https://www.instagram.com">siga-nos</Link>
          </div>
        </div>
        <div className="social-link">
          <Icon name="mail" size="big" />
          <div>
            <Link to="mailto:contato@marca.com">contate-nos</Link>
          </div>
        </div>
        <div className="social-link">
          <Icon name="info circle" size="big" />
          <div>
            <Link to="/sobre">sobre nós</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
