import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD2k_FpLxRf0EaZ1Xeu0A32uhTD2OV7wHc",
    authDomain: "business-interaction-68cbf.firebaseapp.com",
    projectId: "business-interaction-68cbf",
    storageBucket: "business-interaction-68cbf.appspot.com",
    messagingSenderId: "641607967730",
    appId: "1:641607967730:web:6fa94cca136b0beb0f816b"
}

const firebaseApp = initializeApp(firebaseConfig);

var firebaseStorage = getStorage(firebaseApp);

// var storageRef = ref(firebaseStorage);

const generateRef = (fileName = "unknown") => {
    console.log(fileName)
    return ref(firebaseStorage, `videos/${fileName}`);

}

const videoRef = ref(firebaseStorage, 'videos/')

export { generateRef, uploadBytes };