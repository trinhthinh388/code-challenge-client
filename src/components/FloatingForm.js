import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import {withFirebase} from '../firebase';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {CSSTransition} from 'react-transition-group';

function SignUpAndSignInForm(props){
    return(
        <FloatingForm {...props}/>
    );
}


function FloatingFormBase(props){

    const [logInTitle, setLogInTitle] = useState("Log in");

    const [signUpTitle, setSignUpTitle] = useState("Create an account");
    
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordTwo: '',
        email: ''
    });

    const {setAuthUser} = props;

    function onButtonClickHandle(e){
        if(e.target.getAttribute('data-target') === "sign-up"){
            props.setOption("sign up");
        }
        else{
            props.setOption("log in");
        }
    }

    function onOutterFormClickHandle(e){
        props.closeForm(false);
    }

    function onSignInOrSingUpSubmit(e) {
        const {email, password, name} = user;
        if(props.option === true){
            setSignUpTitle("Signing up ...");
            props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                props.firebase.doUpdateProfile({
                    displayName: name,
                    photoURL: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=Platinum&facialHairType=Blank&clotheType=Hoodie&clotheColor=PastelYellow&eyeType=Happy&eyebrowType=Default&mouthType=Default&skinColor=Pale"
                }).then(()=>{
                    setSignUpTitle("Welcome to CodeChallge!");
                    onOutterFormClickHandle();
                }).catch(error => {

                });
            })
            .catch(error => {
                error = error.message;
                setSignUpTitle("Create an account");
                setUser({
                    ...user,
                    error
                });
            });
        }
        else{
            setLogInTitle("Logging in ...");
            props.firebase
                .doSignInWithEmailAndPassword(email, password)
                .then(authUser => {
                    setLogInTitle("Welcome back!");
                    setAuthUser(authUser);
                    onOutterFormClickHandle();
                })
                .catch(error => {
                    error = "Wrong username or password";
                    setLogInTitle("Log in");
                    setUser({
                        ...user,
                        error
                    });
                })
        }
        e.preventDefault();
    }

    function isUserValid(){
        if(!user.email || user.email === "" || !user.password || user.password === "")
        {
            return false;
        }
        if(props.option === true){
            if(!user.passwordTwo || user.passwordTwo === "")
            {
                return false;
            }
            else if(user.password !== user.passwordTwo){
                return false;
            }
            else if(!user.name || user.name === "")
            {
                return false;
            }
        }

        return true;
    }

    function onLogInOrSignUpFormChangeHandle(e){
        let target = e.currentTarget.getAttribute("data-target");
        if(target === "email"){
            let email = e.currentTarget.value;
            setUser({
                ...user,
                email,
            });
        }
        else if(target === "password"){
            let password = e.currentTarget.value;
            setUser({
                ...user,
                password,
            });
        }
        else if(target === "name"){
            let name = e.currentTarget.value;
            setUser({
                ...user, 
                name,
            });
        }
        else if(target === "password2"){
            let passwordTwo = e.currentTarget.value;
            setUser({
                ...user,
                passwordTwo
            });
        }
    }




    return(
        
            <div id="floating-form">
                <div  className="ff__form mx-auto">
                <div className="ff__options d-flex justify-content-between">
                    <button data-target="sign-up" onClick={onButtonClickHandle} type="button" className={classNames("btn btn-light", {"active": props.option === true})}>Sign up</button>
                    <button data-target="log-in" onClick={onButtonClickHandle} type="button" className={classNames("btn btn-light", {"active": props.option === false})}>Log in</button>
                </div>
                <form onSubmit={onSignInOrSingUpSubmit}>
                    <div className="form__input d-flex justify-content-center align-items-center flex-row">
                        <FontAwesomeIcon className="input__icon" size="2x" icon={faEnvelope} color="#738f93"/>
                        <input onChange={onLogInOrSignUpFormChangeHandle} type="email" data-target="email" placeholder="Your email" value={user.email}/>
                    </div>
                    <div className="form__input d-flex justify-content-center align-items-center flex-row">
                        <FontAwesomeIcon className="input__icon" size="2x" icon={faLock} color="#738f93"/>
                        <input onChange={onLogInOrSignUpFormChangeHandle} type="password" data-target="password" placeholder="Your password" value={user.password}/>
                    </div>
                    {
                        props.option === true ? 
                        <div className="form__input d-flex justify-content-center align-items-center flex-row">
                            <FontAwesomeIcon className="input__icon" size="2x" icon={faLock} color="#738f93"/>
                            <input className={classNames({"border-danger": user.password !== user.passwordTwo && user.passwordTwo !== ""})} onChange={onLogInOrSignUpFormChangeHandle} type="password" data-target="password2" placeholder="Re-enter your password" value={user.passwordTwo}/>
                        </div> : null
                    }
                    {
                        props.option === true ? 
                        <div className="form__input d-flex justify-content-center align-items-center flex-row">
                            <FontAwesomeIcon className="input__icon" size="2x" icon={faUser} color="#738f93"/>
                            <input onChange={onLogInOrSignUpFormChangeHandle} type="text" data-target="name" placeholder="First & last name" value={user.name}/>
                        </div> : null
                    }

                {       
                        props.option === false ? 
                        <div className="text-right forgot-password">
                            <a>Forgot your password?</a>
                        </div> : null
                }
                {
                    user.error == "" ? null : <div className={classNames("form__error text-danger text-center mb-2")}>{user.error}</div>
                }
                {
                        props.option === true ? 
                        <button disabled={!isUserValid()} type="submit" className="form__btn btn btn-success">{signUpTitle}</button>
                        :
                        <button disabled={!isUserValid()} type="submit" className="form__btn btn btn-success">{logInTitle}</button>
                }
                <div onClick={onOutterFormClickHandle} className="close-button text-danger">Close</div>     
                </form>
                </div>
            </div>
       
    );
}

const FloatingForm = compose(
    withRouter,
    withFirebase,
)(FloatingFormBase);

export default SignUpAndSignInForm;

export { FloatingForm };