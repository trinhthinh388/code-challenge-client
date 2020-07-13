import React, {useState, useEffect} from 'react';
import 'firebase/auth';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/route';
import classNames from 'classnames';
import Account from './Account';

function Settings(props){
    const {currSec, setCurrSec} = props;
    const [selectedMenu, setSelectedMenu] = useState("settings");
    useEffect(()=>{
        setCurrSec({
            title: "Settings",
            subSec: [],
        });
    }, []);

    function onNavClickHandle(e){
        let target = e.currentTarget.getAttribute("data-target");
        setSelectedMenu(target);
    }

    return(
        <div id="settings" className="container">
            <div className="row">
                <div className="settings__menu col-lg-3">
                    <div className="menu__account">
                        <h3>Account</h3>
                        <ul>
                            <li>
                                <Link onClick={onNavClickHandle} data-target="settings" className={classNames({"active": selectedMenu === "settings"})} to={ROUTES.ACCOUNT_SETTING}>Settings</Link>
                            </li>
                            <li>
                                <Link onClick={onNavClickHandle} data-target="teams" className={classNames({"active": selectedMenu === "teams"})} to={ROUTES.TEAMS_SETTING}>Teams</Link>
                            </li>
                            <li>
                                <Link onClick={onNavClickHandle} data-target="password" className={classNames({"active": selectedMenu === "password"})} to={ROUTES.PASSWORD_SETTING}>Password</Link>
                            </li>
                            <li>
                                <Link onClick={onNavClickHandle} data-target="phone" className={classNames({"active": selectedMenu === "phone"})} to={ROUTES.PHONE_SETTING}>Phone</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="settings__content col-lg-9">
                    <Account uid={props.currUID}/>
                </div>
            </div>
        </div>
    );
}

export default Settings;