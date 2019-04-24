module.exports = {

    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,

    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,

    JWT_EXPIRY: process.env.JWT_EXPIRY,
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY,

    AES_ENCRYPTION_KEY: process.env.AES_ENCRYPTION_KEY,
    JWT_ENCRYPTION_KEY: process.env.JWT_ENCRYPTION_KEY,
    STEEM_PRIVATE_KEY: process.env.STEEM_PRIVATE_KEY,
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,

    AIRDROP_FEE: process.env.AIRDROP_FEE,
    AIRDROP_SYMBOL: process.env.AIRDROP_SYMBOL,
    AIRDROP_ACCOUNT: process.env.AIRDROP_ACCOUNT,
    AIRDROP_MEMO: process.env.AIRDROP_MEMO

};
