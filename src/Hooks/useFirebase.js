import initializeAuthentication from "../Pages/Login/firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, updateProfile, getIdToken } from "firebase/auth";
import { useEffect, useState } from "react";


initializeAuthentication();

const useFirebase = () => {

     const [user, setUser] = useState({});
     const [error, setError] = useState('');
     const [isLoading, setIsLoading] = useState(false);
     const [admin, setAdmin] = useState(false);
     const [token, setToken] = useState('');

     const auth = getAuth();
     const googleProvider = new GoogleAuthProvider();

     // register or create user
     const registerUser = (name, email, password, navigate) => {
          setIsLoading(true);
          createUserWithEmailAndPassword(auth, email, password)
               .then((userCredential) => {
                    const newUser = { email, displayName: name };
                    setUser(newUser);
                    setError('');
                    // saveUser
                    saveUser(name, email, 'POST');
                    // userName
                    updateProfile(auth.currentUser, {
                         displayName: name
                    }).then(() => {

                    }).catch((error) => {

                    });
                    navigate('/');

               })
               .catch((error) => {
                    setError(error.message);

               })
               .finally(() => setIsLoading(false));
     };
     // login or existing user
     const loginUser = (email, password, location, navigate) => {
          setIsLoading(true);
          signInWithEmailAndPassword(auth, email, password)
               .then((userCredential) => {
                    setError('');
                    const destination = location?.state?.from || '/';
                    navigate(destination)
               })
               .catch((error) => {
                    setError(error.message);
               })
               .finally(() => setIsLoading(false));
     };

     // sign in With Google
     const signInWithGoogle = (location, navigate) => {
          setIsLoading(true);
          signInWithPopup(auth, googleProvider)
               .then((result) => {
                    const user = result.user;
                    setError('');
                    // saveUser
                    saveUser(user.email, user.displayName, 'PUT')
                    const destination = location?.state?.from || '/';
                    navigate(destination)
               }).catch((error) => {

                    setError(error.message);
               })
               .finally(() => setIsLoading(false));
     }

     // observation
     useEffect(() => {
          const unsubscribed = onAuthStateChanged(auth, (user) => {
               if (user) {
                    setUser(user);
                    getIdToken(user)
                         .then(idToken => {
                              setToken(idToken);
                         })

               } else {
                    setUser({});
               }
               setIsLoading(false);
          });
          return () => unsubscribed;

     }, []);


     // logOut
     const logOut = () => {
          setIsLoading(true);
          signOut(auth)
               .then(() => {

               })
               .catch((error) => {

               })
               .finally(() => setIsLoading(false));
     }

     // for saveUser in database
     const saveUser = (name, email, method) => {
          const user = {
               displayName: name,
               email
          }
          const url = `http://localhost:5000/users`;
          fetch(url, {
               method: method,
               headers: {
                    'content-type': 'application/json'
               },
               body: JSON.stringify(user)
          })
               .then()
     };

     // for admin set
     useEffect(() => {
          const url = `http://localhost:5000/users/${user.email}`;
          fetch(url)
               .then(res => res.json())
               .then(data => {
                    console.log(data)
                    setAdmin(data.admin);
               });
     }, [user.email])


     return {
          user,
          error,
          isLoading,
          registerUser,
          loginUser,
          signInWithGoogle,
          logOut,
          admin,
          token
     }


}

export default useFirebase;