import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useHistory } from 'react-router-dom'; 
import * as ROUTES from '../constants/route';
import {withFirebase} from '../firebase';

function NavBar(props){
    const history = useHistory();
    const {authUser} = props;

    const [signOut, setSignOut] = useState(false);

    function onNavClickHandle(e){
        let title = e.target.getAttribute("data-title");
        props.setCurrSec({
            title: title,
            subSec: []
        });
    }

    function onLogInClickHandle(e){
        if(e.currentTarget.getAttribute("data-target") === "log-in")
            props.setOption("log in");
        else
            props.setOption("sign up");
        props.activeForm();
    }

    function onSignOutClickHandle(e){
        props.firebase.doSignOut()
            .then(()=>{
                window.location.replace('/');
            })
            .catch(error => {
                alert(error.message);
            })
    }

    return(
        <header id="navigation" className="container">
                <nav className="navbar row navbar-expand-lg navbar-dark bg-dark">
                    <Link to={ROUTES.LANDING} className="navbar-brand" href="#">CodeChallenge</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className={classNames("nav-item", {"active": props.currSec.title === "Practice"})}>
                                <Link to={ROUTES.LANDING} onClick={onNavClickHandle} data-title="Practice" className="nav-link" href="#">Practice</Link>
                            </li>
                            <li className={classNames("nav-item", {"active": props.currSec.title === "Contest"})}>
                                <Link to={ROUTES.CONTEST} onClick={onNavClickHandle} data-title="Contest" className="nav-link" href="#">Contest</Link>
                            </li>
                            <li className={classNames("nav-item", {"active": props.currSec.title === "Leaderboard"})}>
                                <Link to={ROUTES.LEADERBOARD} onClick={onNavClickHandle} data-title="Leaderboard" className="nav-link" href="#">Leaderboard</Link>
                            </li>
                            <li className={classNames("nav-item", {"active": props.currSec.title === "Complier"})}>
                                <Link to={ROUTES.COMPLIER} onClick={onNavClickHandle} data-title="Complier" className="nav-link" href="#">Complier</Link>
                            </li>
                        </ul>
                        {
                            authUser 
                            ? 
                            <div className="navbar__user d-flex flex-row justify-content-center align-items-center">
                                <div className="user__photo">
                                    <img alt="user photo" src={authUser.photoURL}></img>
                                </div>
                                <div className="user__email ml-3 mb-0">
                                    {authUser.displayName}
                                    <span onMouseLeave={() => {
                                        setTimeout(()=>{
                                            setSignOut(false);
                                        }, 500);
                                    }} className="user__expand_nav bg-dark">
                                        <ul>
                                            <li>
                                                <Link to={ROUTES.USER_SETTING}>Settings</Link>
                                            </li>
                                            <li>
                                                {
                                                    signOut 
                                                    ? 
                                                    <div className="user__signout-confirm">
                                                        <button onClick={onSignOutClickHandle} className="btn btn-success">
                                                            <Link to={ROUTES.SIGN_OUT}>Confirm</Link>
                                                        </button>
                                                    </div>
                                                    : <a onClick={() => setSignOut(true)} to={ROUTES.SIGN_OUT}>Sign out</a>
                                                }
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>
                            : 
                            <div>
                                <button onClick={onLogInClickHandle} data-target="log-in" type="button" className="btn btn-secondary">Log in</button>
                                <button onClick={onLogInClickHandle} data-target="sign-up" type="button" className="btn btn-success ml-3">Sign up</button>
                            </div>
                        }
                    </div>
                </nav>
        </header>
    );
}

export default withFirebase(NavBar);