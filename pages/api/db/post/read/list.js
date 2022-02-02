import dbConnect from '../../../../../utils/dbConnect'
import Post from '../../../../../model/postSchema'

dbConnect();

export default async function handler(req, res) {

    const data = req.query;

    if(req.method === 'GET' && data ){

        const total = Number(await Post.countDocuments());
        const limit = Number(data.limit);
        const skip = Number(data.skip);        
        

        console.log(`total : ${total}, limit : ${limit}, skip : ${skip}`)

        // 38  >   10 + 30
        if( total > (limit+skip) ){ // 로드될 글이 10개 이상 남았을 경우

            Post.find({}, { _id : true, title : true, author : true, tags : true, date : true, comments : true }).sort({ date : '-1'})
            .limit(limit).skip(skip).then((post, err)=>{ //모든 post 조회
                if(!err){
                    res.status(200).send({ list : post, total : total });
                }else{
                    console.log(err);
                    res.status(404).send({ error : 'NOT FOUND POST' });   
                }
            }).catch((err)=>{
                console.log(err);
                res.status(404).send({ error : 'DB ERROR' });
            });

        }else{  8
            const _limit = total-skip;
            
            Post.find({}, { _id : true, title : true, author : true, tags : true, date : true, comments : true }).sort({ date : '-1'})
            .skip(skip).limit(_limit).then((post, err)=>{ //모든 post 조회
                if(!err){
                    res.status(200).send({ list : post, total : total });
                }else{
                    console.log(err);
                    res.status(404).send({ error : 'NOT FOUND POST' });   
                }
            }).catch((err)=>{
                console.log(err);
                res.status(404).send({ error : 'DB ERROR' });
            });

        }
        
    }else{
        res.status(404).send({ error : 'NOT FOUND POST' });
    }

}