import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCdBESA_HKEen43ERg6zzoh65G6uijwNyM",
    authDomain: "uit-tool.firebaseapp.com",
    databaseURL: "https://uit-tool.firebaseio.com",
    projectId: "uit-tool",
    storageBucket: "uit-tool.appspot.com",
    messagingSenderId: "866669583679",
    appId: "1:866669583679:web:dc34979fba9eafa3fd478a",
    measurementId: "G-X15QTJTJ15"
};

class Firebase{
    constructor(){
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.database = firebase.firestore();
    }

    doCreateUserWithEmailAndPassword = (email, password)=>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => 
       this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();
    
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
    
    doUpdateProfile = ({displayName, photoURL}) => this.auth.currentUser.updateProfile({displayName, photoURL});

    getCurrentUserInfor = uid => {
        return this.database.collection("users").where("userID", "==", uid);
    }
}

export default Firebase;

  