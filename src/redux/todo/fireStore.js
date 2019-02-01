import React, {Component} from 'react';

import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyD0KAgs5hHW2gzk7S7viAspK6mWtHUdCBI",
    authDomain: "todoredux-93ab5.firebaseapp.com",
    databaseURL: "https://todoredux-93ab5.firebaseio.com",
    projectId: "todoredux-93ab5",
    storageBucket: "todoredux-93ab5.appspot.com",
    messagingSenderId: "350546454538"
};
var fireBase =  firebase.initializeApp(config);
export default fireBase;