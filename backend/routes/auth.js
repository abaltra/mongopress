import { v4 } from 'uuid';
import { User } from '../models';
import { encryption } from "../utils";

async function login (req, res) {
    const usernameOrEmail = req.body.usernameOrEmail;
    const password = req.body.password;
    
    if (!usernameOrEmail || !password)
    {
        return res.status(401).send();
    }

    const encryptedPassword = encryption.encryptPassword(password);

    var user = await User.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]}, { __v: 0, pastHashes: 0, isAdmin: 0, createdAt: 0 });

    if (!user || user.hash != encryptedPassword)
    {
        return res.status(401).send();
    }

    const accessToken = v4().replace(/-/gi, '').toLowerCase()
    
    user.accessToken = accessToken;
    user.lastLogin = Date.now();

    await user.save();
    user = user.toObject();

    return res.json({ accessToken: user.accessToken });
}

export default {
    login
}