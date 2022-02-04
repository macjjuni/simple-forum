import dbConnect from '../../../../../utils/dbConnect'
import Post from '../../../../../model/postSchema'

dbConnect();

export default async function handler(req, res) {

    const data = req.query;

    if(req.method === 'GET' && data ){

        const total = Number(await Post.countDocuments());
        const page = Number(data.page);
        const listNum = 10; // 페이지 당 보낼 개수
        const skip = page === 1 ? 0 : ( page - 1 ) * listNum;
        // 페이지 당 보낼 개수 보다 적을 경우;
        const limit = total > page*listNum ? 10 : total-( (page-1) * listNum);

        console.log(`total = ${total} | limit = ${limit} | skip = ${skip} | page = ${page}`)

        Post.find({}, { _id : true, title : true, author : true, tags : true, date : true, comments : true }).sort({ date : '-1'})
        .limit(limit).skip(skip).then((post, err)=>{ //모든 post 조회
            if(!err){
                //마지막 페이지 요청의 경우 true
                const end = post.length === 10 && total / (page * listNum) !== 1 ? false : true; 
                console.log(end + ' / ' + '보낸 데이터 개수 : ' + post.length)
                res.status(200).send({ list : post, total : total, end : end });
            }else{
                console.log(err);
                res.status(404).send({ error : 'NOT FOUND POST' });   
            }
        }).catch((err)=>{
            console.log(err);
            res.status(404).send({ error : 'DB ERROR' });
        });

    }else{
        res.status(404).send({ error : 'NOT FOUND POST' });
    }

}