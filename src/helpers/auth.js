import { ref, firebaseAuth } from 'config/constants';

export default function auth(authType) {
  return firebaseAuth().signInWithPopup(authType === 'Facebook'
    ? new firebaseAuth.FacebookAuthProvider()
    : new firebaseAuth.GithubAuthProvider());
}

export function checkIfAuthed(store) {
  return store.getState().users.isAuthed === true;
}

export function logout() {
  return firebaseAuth().signOut();
}

export function saveUser(user) {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user);
}
