import React, { useState, useEffect } from 'react';
import {withFirebase} from '../firebase';

const dataPrototype = {
    address : {provinceOrCity: "Ho Chi Minh", ward: "Hiep Binh Chanh", street: "17th", houseNumber: "80/42", district: "Thu Duc"},
    desc: "Just a handsome guy.",
    phone: {number: "947533432", code: "+84"},
    role: "admin",
    school: {expectedYearOfGraduation: 2022, major: "Software Engineering", name: "University of Information Technology"},
    sex: "Male",
}

function Account(props){
    const {uid} = props;
    const [userInfor, setUserInfor] = useState({});

    useEffect(()=>{
        props.firebase.database.collection("users").where("UID", "==", uid)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                setUserInfor({
                    ...doc.data(),
                    "displayName": props.firebase.auth.currentUser.displayName,
                    "photoURL": props.firebase.auth.currentUser.photoURL
                });
            })
        })
        .catch(error => console.log(error));
    }, []);
    return(
        <div id="account">
            <div className="account__information">
                <div className="information__display-name">
                    <h6>Your name</h6>
                    <input className="" value={userInfor.displayName}></input>
                </div>
            </div>
        </div>
    );
}

export default withFirebase(Account);