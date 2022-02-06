import cron from 'node-cron'
import Post from '../../../../model/postSchema'
import { initializeApp } from "firebase/app"
import { getStorage, ref, listAll, deleteObject } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default async function(req, res){

    //모든 포스트 불러오기 
    const allPost = await Post.find({}, { content : true });
    //파이어베이스 레퍼런스 생성
    const listRef = ref(storage, 'profile_images');
    const imgs = [] //모든 이미지
    const useList = []; //사용중인 이미지

    const find = async() => {
        const listRef = ref(storage, 'post_images');
        try{
            const { items } = await listAll(listRef);
            items.forEach(i => imgs.push(i.name));

            //사용중인 이미지 구분
            allPost.forEach(post =>{
                items.forEach(img => {
                    const chk = post.content.includes(img.name);
                    if( chk === true ){
                        useList.push(img.name);
                    }else{
                        return false;
                    }    
                })
            })
            //전체 이미지 리스트 - 사용중인 리스트
            useList.forEach(li => {
                const idx = imgs.indexOf(li);
                if(idx !== -1) imgs.splice(idx, 1);
            })
            
            //사용하지 않는 이미지 삭제 처리
            imgs.forEach(target => {
                const desertRef = ref(storage, `/post_images/${target}`);
                deleteObject(desertRef).then(() => {
                    console.log('삭제 성공');
                }).catch((error) => {
                    console.log(error)
                });
            })

            
        }catch (err){
            console.log(err);
        }
    }


    // cron.schedule('*/3 * * * * *', ()=> {
    //     console.log('3초 마다 실행');
    // });
    res.status(404).send({ error : 'error' });
}


