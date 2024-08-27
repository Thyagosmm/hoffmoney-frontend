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
          <Link className="social-link" to="https://www.instagram.com">
            <Icon name="instagram" size="big" />
            <span>Siga-nos</span>
          </Link>
        </div>
        <div className="social-link">
          <Link className="social-link" to="mailto:contato@marca.com">
            <Icon name="mail" size="big" />
            <span>Contate-nos</span>
          </Link>
        </div>
        <div className="social-link">
          <Link className="social-link" to="/sobre">
            <Icon name="info circle" size="big" />
            <span>Sobre nós</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
