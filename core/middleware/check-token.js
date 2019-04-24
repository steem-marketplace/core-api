const Auth = require('../auth');

async function checkToken(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        // Decode the sent JWT token, is it valid?
        const decodedToken = await Auth.verifyAuthToken(token);

        // We have a token and it is a valid JWT with the steem-marketplace descriptor
        if (decodedToken && decodedToken.app === 'steem-marketplace') {
            req.decodedToken = decodedToken;

            next();
        } else {
            return res.json({
                success: false,
                message: 'Token is not valid'
            });
        }
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
}

module.exports = {
    checkToken: checkToken
}
