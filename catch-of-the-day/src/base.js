import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAqPE62ish4tx_WSRaYBeTiXLk9OoG-DS4",
    authDomain: "catch-of-the-day-rko.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-rko.firebaseio.com",

});

const base = Rebase.createClass(firebaseApp.database());

//named export
export { firebaseApp };

//Default export
export default base;