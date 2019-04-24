module.exports = {
    apps : [{
      name: "steem-marketplace-core-api",
      script: "./api.js",
      autorestart: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }
