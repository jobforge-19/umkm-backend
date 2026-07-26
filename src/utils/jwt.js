import jwt from "jsonwebtoken";
import "dotenv/config";


/**
 * @typedef {Object} PayloadToken
 * @property {string} fullName
 * @property {string} username
 * @property {string} role
 * @param {PayloadToken} payload 
 * @returns {string}
 */
function createRefreshToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRETKEY, {
        algorithm: "HS256",
        expiresIn: "7d"
    });

    return token;
}


/**
 * 
 * @param {PayloadToken} payload 
 */
function createAccesToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRETKEY, {
        algorithm: "HS256",
        expiresIn: "10m",
    });
}


export default {
    createRefreshToken,
    createAccesToken
};