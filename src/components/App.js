import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import FloatingForm from "./FloatingForm";
import classNames from "classnames";
import Title from "./TItle";
import Practice from "./Practice";
import Footer from "./Footer";
import Settings from "./Settings";
import LoadingPage from "./LoadingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "../constants/route";
import { CSSTransition } from "react-transition-group";
import { withFirebase } from "../firebase";

function App(props) {
  const [currSection, setCurrSec] = useState({
    title: "Practice",
    subSec: [],
  });
  const [formActive, setFormActive] = useState(false);

  const [authUser, setAuthUser] = useState(null);

  const [loadDone, setLoadDone] = useState(false);

  const [progress, setProgress] = useState(0);

  const [option, setOption] = useState(true);

  useEffect(() => {
    props.firebase.auth.onAuthStateChanged((_authUser) => {
      setAuthUser(_authUser);
    });
  });

  function setOptionWithValue(value) {
    if (value === "sign up") setOption(true);
    else setOption(false);
  }

  function setCurrentSection(obj) {
    setCurrSec(obj);
  }

  function startProgress(callback) {
    setProgress(1);
    setProgress(20);
    setTimeout(() => {
      setProgress(50);
    }, 1000);
    setTimeout(() => {
      setProgress(1000);
    }, 2000);
    setTimeout(() => {
      callback();
      setProgress(0);
    }, 2500);
  }

  function activeForm(value) {
    if (value) {
      setFormActive(value);
      return;
    }
    setFormActive(!formActive);
  }

  return (
    <Router>
      <div id="app" className="App bg-dark">
        <CSSTransition
          in={!authUser}
          timeout={1000}
          classNames="loading-transition"
          unmountOnExit
          onExiting={() => {setLoadDone(true)}}
        >
          <LoadingPage />
        </CSSTransition>
        {loadDone ? (
          <React.Fragment>
            <CSSTransition
              in={formActive}
              timeout={700}
              classNames="form-transition"
              unmountOnExit
              appear
            >
              <FloatingForm
                setAuthUser={setAuthUser}
                closeForm={activeForm}
                option={option}
                setOption={setOptionWithValue}
              />
            </CSSTransition>
            <div
              className={classNames("progress", { "d-none": progress === 0 })}
            >
              <div
                className={classNames(
                  "progress-bar progress-bar-striped progress-bar-animated",
                  { "d-none": progress === 0 }
                )}
                role="progressbar"
                aria-valuenow={progress}
                style={{ width: `${progress}%` }}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <NavBar
              authUser={authUser}
              option={option}
              setOption={setOptionWithValue}
              activeForm={activeForm}
              currSec={currSection}
              setCurrSec={setCurrentSection}
            />
            <div className="app__container bg-light">
              <Title currSec={currSection} />
              <Switch>
                <Route
                  exact
                  path={ROUTES.LANDING}
                  render={(props) => (
                    <Practice
                      {...props}
                      startProgress={startProgress}
                      currSec={currSection}
                      setCurrSec={setCurrentSection}
                    />
                  )}
                />
                <Route
                  path={ROUTES.USER_SETTING}
                  render={(props) => (
                    <Settings
                      {...props}
                      currUID={authUser.uid}
                      currSec={currSection}
                      setCurrSec={setCurrentSection}
                    />
                  )}
                />
              </Switch>
            </div>
            <Footer />
          </React.Fragment>
        ) : null}
      </div>
    </Router>
  );
}

export default withFirebase(App);
