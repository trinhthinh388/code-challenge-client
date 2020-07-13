import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookSquare, faInstagramSquare, faGoogle, faLinkedin} from '@fortawesome/free-brands-svg-icons';

export default function Footer(props){
    return(
        <footer id="footer" className="bg-dark container d-flex justify-content-between">
            <h2>CodeChallenge<span>improve your coding skill.</span></h2>
            <div className="footer__social-links">
                <FontAwesomeIcon className="ml-3" icon={faFacebookSquare} color="#ffffff"/>
                <FontAwesomeIcon className="ml-3" icon={faInstagramSquare} color="#ffffff"/>
                <FontAwesomeIcon className="ml-3" icon={faGoogle} color="#ffffff"/>
                <FontAwesomeIcon className="ml-3" icon={faLinkedin} color="#ffffff"/>
            </div>
        </footer>
    );
}