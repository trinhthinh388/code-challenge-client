import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import algorithmLogo from '../img/algorithm.svg';
import databaseLogo from '../img/database.svg';
import patternLogo from '../img/pattern.svg';
import structureLogo from '../img/structure.svg';
import cLogo from '../img/C.svg';
import cppLogo from '../img/cpp.svg';
import pythonLogo from '../img/python.svg';
import jsLogo from '../img/javascript.svg';

export default function Practice(props){

    useEffect(()=>{
        props.setCurrSec({
            title: "Practice",
            subSec: [],
        });
    },[])

    function onCategoryButtonClick(e){
        let title = e.currentTarget.getAttribute("data-title");
        props.startProgress(()=>{
            props.setCurrSec({
                title: props.currSec.title,
                subSec: [title],
            });})
    }

    return (
        <div id="practice" className="container">
            <h5>Get Your Skills</h5>
            <div className="practice__category d-flex justify-content-between flex-wrap">
                <button onClick={onCategoryButtonClick} data-title="Algorithms" id="category__button--1" type="button" style={{backgroundImage: `url(${algorithmLogo})`}} className="btn btn-light category__button d-flex flex-column">
                    <h4 className="button__title">Algorithms
                        <FontAwesomeIcon className="ml-2 d-inline" icon={faInfoCircle}/>
                    </h4>
                    <p>Start Coding</p>
                </button>
                <button onClick={onCategoryButtonClick} data-title="Data structures" id="category__button--2" type="button" style={{backgroundImage: `url(${structureLogo})`}} className="btn btn-light category__button d-flex flex-column">
                    <h4 className="button__title">Data Structures
                        <FontAwesomeIcon className="ml-2 d-inline" icon={faInfoCircle}/>
                    </h4>
                    <p>Start Coding</p>
                </button>
                <button onClick={onCategoryButtonClick} data-title="Databases" id="category__button--3" type="button" style={{backgroundImage: `url(${databaseLogo})`}} className="btn btn-light category__button d-flex flex-column">
                    <h4 className="button__title">Databases
                        <FontAwesomeIcon className="ml-2 d-inline" icon={faInfoCircle}/>
                    </h4>
                    <p>Start Coding</p>
                </button>
                <button onClick={onCategoryButtonClick} data-title="Regex" id="category__button--4" type="button" style={{backgroundImage: `url(${patternLogo})`}} className="btn btn-light category__button d-flex flex-column">
                    <h4 className="button__title">Regex
                        <FontAwesomeIcon className="ml-2 d-inline" icon={faInfoCircle}/>
                    </h4>
                    <p>Start Coding</p>
                </button>
            </div>
            <h5>Supported Languages</h5>
            <div className="language__category d-flex justify-content-center">
                <img className="language__logo" src={cLogo} alt="C logo"></img>
                <img className="language__logo ml-4" src={cppLogo} alt="C++ logo"></img>
                <img className="language__logo ml-4" src={pythonLogo} alt="Python logo"></img>
                <img className="language__logo ml-4" src={jsLogo} alt="Javascript logo"></img>
            </div>
        </div>
    );
}