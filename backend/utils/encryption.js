import { createHash } from "crypto";

function encryptPassword(password) {
    const salt = process.env.HASHING_SALT;

    return createHash('sha256').update(`${salt}${password}`).digest('base64');
}

export default {
    encryptPassword
}