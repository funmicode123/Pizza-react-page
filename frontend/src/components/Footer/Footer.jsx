import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../Footer/Footer.css';


function Footer() {
  return (
    <div className='footer_side'>
      <div className="social_media">
        <FontAwesomeIcon className="facebook" icon={faFacebook} />
        <FontAwesomeIcon className="twitter" icon={faXTwitter} />
        <FontAwesomeIcon className="instagram" icon={faInstagram} />
        <FontAwesomeIcon className="linkedin" icon={faLinkedin} />
      </div>
      <div className="note">
        <p>Copyright &copy; Dominion Development Team. All rights reserved. 2025</p>
      </div>
    </div>
  );
}

export default Footer;
