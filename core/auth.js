const Crypto = require('crypto-js');
const steem = require('steem');
const JWT = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

const Config = require('../config');

class Auth {
    // Generate a unique AES encryptedmemo string
    static async generateMemo(username) {
        const encryptedMessage = Crypto.AES.encrypt(`${username}::${uuidv4()}`, Config.AES_ENCRYPTION_KEY).toString();

        try {
            const res = await steem.api.getAccountsAsync([username]);

            const encryptedMemo = steem.memo.encode(Config.STEEM_PRIVATE_KEY, res[0].posting.key_auths[0][0], `#${encryptedMessage}`);

            return encryptedMemo;
        } catch (e) {
            throw new Error(e);
        }
    }

    // AES decrypt the memo string
    static decryptAes(string) {
        return Crypto.AES.decrypt(string, Config.AES_ENCRYPTION_KEY).toString(Crypto.enc.Utf8).split('::');
    }

    // Create a JSON web token
    static async generateJWT(user) {
        let timeNow = Date.now();

        const tokenPayload = { user: user, app: 'steem-marketplace', iat: timeNow / 1000};

        // Token expiry 15 minutes
        const token = JWT.sign(tokenPayload, Config.JWT_ENCRYPTION_KEY, { expiresIn:  900 });

        // Refresh token
        const refreshToken = JWT.sign(tokenPayload, Config.REFRESH_TOKEN_KEY, { expiresIn: 86400 });

        return {
            token,
            refreshToken
        };
    }

    // Verify the user provided access token
    static verifyAuthToken(accessToken) {
        return new Promise((resolve, reject) => {
            if (!accessToken) {
                return reject(new Error('No access token provided'));
            }
    
            JWT.verify(accessToken, Config.JWT_ENCRYPTION_KEY, (err, result) => {
                if (err) {
                    return reject(new Error(`Verify error: ${err}`));
                }
    
                return resolve(result);
            });
        });
    }

    static verifyRefreshToken(refreshToken) {
        return new Promise((resolve, reject) => {
            if (!refreshToken) {
                return reject(new Error('No refresh token provided'));
            }
    
            JWT.verify(refreshToken, Config.REFRESH_TOKEN_KEY, (err, result) => {
                if (err) {
                    return reject(new Error(`Verify error: ${err}`));
                }
    
                return resolve(result);
            });
        });
    }
}

module.exports = Auth;
