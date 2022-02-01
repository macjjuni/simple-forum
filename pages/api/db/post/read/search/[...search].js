import Post from '../../../../../../model/postSchema'

export default async function handler(req, res) {

    const searchTxt = decodeURI(req.query.search[0]);
    if(req.method === 'POST' && searchTxt){

        Post.find({ title : new RegExp(searchTxt, 'i') }, { _id : true, title : true, author : true, tags : true, date : true, comments : true }).sort({ date : 'desc'}).then((post, err)=>{ //모든 post 조회

            if(!err){
                res.status(200).send(post);
            }else{
                console.log(err);
                res.status(400).send({ error : 'not found post'});
            }
        }); 
    }else{
        res.status(400).send({ error : 'NOT FOUND'});
    }

}