import Post from '../../../../../model/postSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){

    if(req.method === 'GET'){

        const newPost = new Post();
        newPost.no = await Post.countDocuments() + 1,
        newPost.author = '꾸생',
        newPost.title = '이것은 제목2입니다 :)',
        newPost.content = '이것은 내용2입니다. 123 ',
        newPost.tags = ['tag1', 'tag2', 'tag3', '변수다', '123'],
        newPost.comments = [{
            content : '이것은 댓글1입니다.',
            content : '이것은 댓글2입니다.',
            content : '이것은 댓글3입니다.'
        }]

        newPost.save().then( (post) => {
            console.log(post);
            res.status(200).send('success create post!');
        }).catch((err)=>{
            console.log(err);
            res.status(404).send('error');
        });


    }else{
        res.status(404).send('error');
    }

}