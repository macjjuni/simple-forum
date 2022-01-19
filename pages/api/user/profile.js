import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import formidable from 'formidable';


const firebaseConfig = {
    apiKey: "AIzaSyA7z0AiRRJvdwNPfPZBEPtJD7wmIW94jtM",
    authDomain: "simple-forum-f9e1c.firebaseapp.com",
    projectId: "simple-forum-f9e1c",
    storageBucket: "simple-forum-f9e1c.appspot.com",
    messagingSenderId: "554382113994",
    appId: "1:554382113994:web:c479c6688a162b231c0833",
    measurementId: "G-5FJ0JGB3GP"
};


//<-------------- File Roles -------------->
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/data'); //파일 저장 경로
    },
    filename: (req, file, cb) => {
        const fileType = file.mimetype.split('/')[1];
        cb(null, `${Date.now()}.${fileType}`); //파일 이름
    }
});

const fileFilter = (req, file, cb) => {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];

    if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'webp') {
        req.fileValidationError = null;
        cb(null, true);
    } else {
        req.fileValidationError = "jpg, jpeg, png, gif, webp 파일만 업로드 가능합니다.";
        cb(null, false)
    }
}
//<-------------- File Roles -------------->

const upload = multer({
    storage : storage,
    fileFilter : fileFilter,
    limits: { 
        fileSize: 10 * 1024 * 1024 //크기 제한 : 10MB
    }
});  



export default async function handler (req, res) {
    
    // const firebaseApp = initializeApp(firebaseConfig);
    // const storage = getStorage(firebaseApp, 'gs://simple-forum-f9e1c.appspot.com');
    // const storageRef = ref(storage, 'profile/profile.png')

    const form = new formidable.IncomingForm();
    form.parse(req, async(err, fields, files) => {
        console.log(files);
    });  
    
    res.status(200).json({ name: 'John Doe' })
}

export const config = {
    api: {
        bodyParser: false,
    },
}
