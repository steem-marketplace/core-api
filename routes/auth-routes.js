const Auth = require('../core/auth');

module.exports = function (app) {

    // Gets an upload request token
    app.route('/getUserAuthMemo/:username')
        .get(async (req, res) => {
            const username = req.params.username;

            try {
                const memo = await Auth.generateMemo(username);

                res.status(201).json({ success: true, memo });
            } catch (e) {
                console.log(e);
                res.status(500).json({ success: false, message: 'Could not load account' });
            }
        });

    app.route('/verifyUserAuthMemo')
        .post(async (req, res) => {
            const username = req.body.username;
            const signedKey = req.body.signedKey;

            const decoded = Auth.decryptAes(signedKey);

            if (decoded[0] === username) {
                try {
                    const token = await Auth.generateJWT(decoded[0]);
                    res.status(200).json({ success: true, access_token: token.token, refresh_token: token.refreshToken });
                } catch (e) {
                    return res.status(500).json({ success: false, message: e });
                }
            }
        });

    app.route('/verifyAuthToken')
        .post(async (req, res) => {
            const username = req.body.username;
            const accessToken = req.body.accessToken;

            try {
                const verify = await Auth.verifyAuthToken(accessToken);

                if (verify.user === username && verify.app === 'steem-marketplace') {
                    res.status(201);
                }
            } catch (e) {
                res.status(401).json({ success: false, message: 'Invalid JWT token' });
            }
        });

    app.route('/newAuthToken')
        .post(async (req, res) => {
            const username = req.body.username;
            const refreshToken = req.body.refreshToken;

            try {
                const verify = await Auth.verifyRefreshToken(refreshToken);

                if (verify.user === username && verify.app === 'steem-marketplace') {
                    const token = await Auth.generateJWT(username);

                    res.status(200).json({ success: true, access_token: token.token });
                }
            } catch (e) {
                res.status(401).json({ success: false, message: 'Invalid JWT token' });
            }
        });

};
