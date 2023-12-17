// Login with Google
import {db} from './firebase-config.js';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
window.addEventListener('load', bindEvents);
function bindEvents(){
    document.querySelector('#login').addEventListener('click', doLogin);
}

function storeUserInfo(userInfo){
    if(localStorage){
       
        localStorage.userInfo = JSON.stringify({email: userInfo.email, name: userInfo.displayName , photo: userInfo.photoURL});
        location.href = 'dashboard.html';
    }
    else{
        alert('Browser is outdated not having localStorage....');
    }
}

async function doLogin(){
    // Login with Google
    const auth = getAuth(); // FireBase Auth
    // Need to Specify the Provider
    const provider = new GoogleAuthProvider(); // Google Authentication Provider
    try{
    const result = await signInWithPopup(auth, provider);
    storeUserInfo(result.user);
    console.log('Result is ', result); // result contains the authenticated user info
    }
    catch(err){
        console.log('GOogle Auth Fails ', err);
    }
}