import { Post } from '../models';

async function get (req, res, next) {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (!post)
        {
            return res.status(404).send();
        }
        
        return res.send(post);
    } catch (error) {
        switch (error.name) {
            case 'CastError':
                return res.status(400).send('Invalid Id');
                break;
            default:
                return res.status(503).send(error);
        }
    }
}

async function list (req, res, next) {
    const posts = await Post.find({});
    return res.send(posts);
}

async function add (req, res, next) {
    console.log(req.body);
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.send(savedPost);
    } catch (error) {
        return res.status(503).send(error);
    }
}

async function remove (req, res, next) {
    const postId = req.params.id;
    try {
        const post = await Post.deleteOne({ _id: postId });
        if (!post)
        {
            return res.status(404).send();
        }
        
        return res.send(post);
    } catch (error) {
        switch (error.name) {
            case 'CastError':
                return res.status(400).send('Invalid Id');
                break;
            default:
                return res.status(503).send(error);
        }
    }
}

async function update (req, res, next) {
    return res.send("updating post");
}

export default {
    get,
    list,
    add,
    remove,
    update
}