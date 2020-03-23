import firebase from "../firebase";

const signInWith = (provider: firebase.auth.AuthProvider) =>
  new Promise<firebase.auth.UserCredential>((resolve, reject) => {
    firebase.auth().useDeviceLanguage();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(resolve)
      .catch(reject);
  });

export const signInWithGoogle = () =>
  signInWith(new firebase.auth.GoogleAuthProvider());

export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    display: "popup"
  });
  return signInWith(provider);
};

export const checkIfAlreadyLoggedIn = () =>
  new Promise<firebase.User>(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) resolve(user);
    });
  });

export const logout = () => firebase.auth().signOut();

export const getIdToken = () => firebase.auth().currentUser?.getIdToken(true);

export function fetchAuthenticated(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  return new Promise(
    (resolve, reject) =>
      getIdToken()
        ?.then((idToken: string) => {
          fetch(input, {
            ...(init ?? {}),
            headers: new Headers({
              ...(init?.headers ?? {}),
              Authorization: "Bearer " + idToken
            })
          })
            .then(resolve)
            .catch(reject);
        })
        .catch(reject) ?? reject(new Error("Failed to get user's ID token."))
  );
}
