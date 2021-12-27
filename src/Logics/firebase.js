import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

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
    return ref(firebaseStorage, `videos/${fileName}`);
}

const uploadFirebase = async ({ fileName = new Date().getTime().toString(), uploadFile = undefined, setUploadProgress = () => { }, setMeetingInfo = () => { } }) => {

    const uploadTask = uploadBytesResumable(generateRef(fileName), uploadFile);

    uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress)

        switch (snapshot.state) {
            case 'pause':
                console.log("paused");
                break;

            case 'running':
                console.log("running");
                break;
        }
    },
        (err) => {
            console.log("unsuccessful Upload");
        },
        () => {
            getDownloadURL(generateRef(fileName)).then((dUrl) => {

                setMeetingInfo((prevState) => {
                    return {
                        ...prevState,
                        meeting_url: dUrl,
                    }
                });
            })
        }
    )
}

const deleteFile = ({ fileName = "" }) => {
    const fileRef = generateRef(fileName)

    deleteObject(fileRef).then(res => {
        console.log("File Successfully Deleted")
    }).catch(err => {
        console.log("File Not Deleted")
    })
}

export { uploadFirebase, deleteFile };