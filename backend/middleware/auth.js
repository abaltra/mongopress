import { User } from "../models";

async function ensureLoggedIn (req, res, next) {
    console.log(process.env.ACCESS_TOKEN_HEADER_KEY)
    const accessToken = req.get(process.env.ACCESS_TOKEN_HEADER_KEY);

    console.log(accessToken)
    var user = await User.findOne({ accessToken: accessToken });

    if (!user)
    {
        return res.status(403).send();
    }

    req.user = user;
    return next();
}

export default {
    ensureLoggedIn
}