module.exports = {
  development: {
    buildEnv: 'development'
  },

  production: {
    store: {
      host: 'pub-redis-13799.us-east-1-4.2.ec2.garantiadata.com',
      port: 13799,
      password: process.env['EMSTAGRAM_REDIS_PASSWORD']
    },
    assets: {
      accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
      secretAccessKey: process.env['AWS_SECRET'],
      bucket: 'emstagram-production'
    }
  }
};
