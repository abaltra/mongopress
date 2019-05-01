import { encryption } from "../utils"
import { User } from "../models"

async function get (req, res, next) {
    const username = req.params.id;

    const user = await User.findOne({ username: username }, { _id: 0, hash: 0, pastHashes: 0, accessToken: 0 });

    if (!user)
    {
        return res.status(404).send();
    }

    return res.json(user);
}

async function add (req, res, next) {
    const password = req.body.password;
    const email = req.body.email;
    const username = req.body.username;

    console.log(req.body);

    if (!email || !password || !username)
    {
        return res.status(400).send();
    }

    const hashedPassword = encryption.encryptPassword(password);
    let user = await User.findOne({ email: email }, { email: 1 });

    if (user != null)
    {
        return res.status(400).send();
    }

    user = new User({
        email: email,
        username: username,
        hash: hashedPassword,
        pastHashes: [ hashedPassword ]
    });

    await user.save();

    res.status(201).send();
}

function list (req, res, next) {
    res.send("listing users");
}

function remove (req, res, next) {
    res.send("removing user");
}

function update (req, res, next) {
    res.send("updating user");
}

export default {
    get,
    add,
    list,
    remove, 
    update
}
