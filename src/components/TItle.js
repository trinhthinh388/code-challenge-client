import React from 'react';
import classNames from 'classnames';
import uniqId from 'uniqid';

export default function Title(props){
    function onNavClickHandle(e){
        if(e.target.className.includes("nav--disabled"))
            e.preventDefault();
    }
    return(
        <div id="title" className="title__container d-flex justify-content-center flex-column">
            <div className="container d-flex justify-content-center flex-column">
                <div className="title__navigation">
                    <a  onClick={onNavClickHandle} className={classNames("text-secondary", {"nav--disabled": props.currSec.subSec.length == 0})} href="#">{props.currSec.title}</a>
                    {
                        props.currSec.subSec.map((item) => {
                            return <a key={uniqId()} onClick={onNavClickHandle} className={classNames("text-secondary devider", {"nav--disabled": props.currSec.subSec[props.currSec.subSec.length - 1] === item})} href="#">{item}</a>
                        })
                    }
                </div>
                <div className="title__content">{props.currSec.title}</div>
            </div>
        </div>
    );
};