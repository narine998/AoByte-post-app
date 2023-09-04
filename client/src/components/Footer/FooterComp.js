import React from "react";
import { Link, useNavigate } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { HOME_PATH } from "../../constants";

import favicon from "../../assets/footerLogo.png";

import styles from "./Footer.module.scss";

function Footer(props) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(HOME_PATH);
    window.location.reload();
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span onClick={handleLogoClick} className={styles.favicon}>
          <img src={favicon} alt="logo" />
        </span>
      </div>
      <div className={styles.container}>
        <div className={styles.info}>
          <ul>
            <li>
              <Link to="https://www.facebook.com/">
                <FacebookIcon fontSize="large" /> Facebook
              </Link>
            </li>
            <li>
              <Link to="https://www.linkedin.com/">
                <LinkedInIcon fontSize="large" /> LinkedIn
              </Link>
            </li>
            <li>
              <Link to="https://mail.google.com/">
                <EmailIcon fontSize="large" /> Email
              </Link>
            </li>
            <li>
              <Link to="https://www.youtube.com/">
                <YouTubeIcon fontSize="large" /> YouTube
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.copyright}>
          <span className={styles.address}>
            Address: 3 Hakob Hakobyan St, Yerevan 0033
          </span>
          <span className={styles.copy}>
            Copyright © {new Date().getFullYear()} Post It Up
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
