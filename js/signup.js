import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase-config';
import { doc } from "firebase/firestore";

function registerUser(name, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log(cred.user);
            return updateProfile(cred.user, { displayName: name });
        })
        .then(() => {
            console.log('redirectinog...')
            // window.location.href = 'https://xavierstechbytesociety.github.io/spacegunner/';
        })
        .catch((err) => {
            console.error(err.message);
        })
}

checkAuth()
function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        console.log('User state Changed', user);
    })
}

window.addEventListener('load', () => {
    const signUpForm = document.querySelector('#sign-up');
    signUpForm.addEventListener('submit', (e) => {
        const name = signUpForm.name.value;
        const email = signUpForm.email.value;
        const password = signUpForm.password.value;
        e.preventDefault();
        console.log(email)
        registerUser(name, email, password);
        signUpForm.reset();
    })


})
