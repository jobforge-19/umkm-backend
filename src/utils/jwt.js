import jwt from "jsonwebtoken";
import "dotenv/config";
import { ResponseError } from "../app/error.js";


/**
 * @typedef {Object} PayloadToken
 * @property {string} fullName
 * @property {string} username
 * @property {string} role
 * @param {PayloadToken} payload 
 * @returns {string}
 */
function createRefreshToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_PRIVATEKEY, {
        algorithm: "HS256",
        expiresIn: "7d"
    });

    return token;
}


/**
 * 
 * @param {PayloadToken} payload 
 * @returns {string}
 */
function createAccesToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_PUBLICKEY, {
        algorithm: "HS256",
        expiresIn: "10m",
    });

    return token;
}


/**
 * 
 * @param {*} token 
 * @param {*} secretKey 
 * @param {import("jsonwebtoken").VerifyOptions & { complete: true }} options 
 * @returns 
 */
function verifyJwtToken(token, secretKey, options) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, options,  (err, decoded) => {
            if(err) {
                reject(new ResponseError(400, "Token Invalid"));
                return;
            }
            resolve(decoded);
        });
    });
}




export default {
    createRefreshToken,
    createAccesToken,
    verifyJwtToken
};