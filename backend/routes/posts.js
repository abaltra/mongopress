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
    let id = req.params.id;
    let post = await Post.findById(id, { _id: 1 })
    if (!post)
    {
        return res.status(404).send();
    }

    await Post.findOneAndUpdate({ _id: id }, { $set: { body: req.body.body, updatedAt: Date.now() } });
    return res.status(201);
}

async function view (req, res, next)
{
    let id = req.params.id;
    await Post.updateOne({ _id: id }, { $inc: { "stats.views": 1 } }, { w: 0 });
    return res.status(201).send();
}

async function like (req, res, next)
{
    let id = req.params.id;
    await Post.updateOne({ _id: id }, { $inc: { "stats.likes": 1 } }, { w: 0 });
    return res.status(201).send();
}

async function dislike (req, res, next)
{
    let id = req.params.id;
    await Post.updateOne({ _id: id }, { $inc: { "stats.likes": -1 } }, { w: 0 });
    return res.status(201).send();
}

export default {
    get,
    list,
    add,
    remove,
    update,
    view,
    like,
    dislike
}