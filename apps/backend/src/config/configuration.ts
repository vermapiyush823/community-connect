export default () => ({
  port: parseInt(process.env['PORT'] ?? '3000', 10),
  database: {
    uri: process.env['MONGODB_URI'] ?? 'mongodb://localhost:27017/community-connect',
  },
  environment: process.env['NODE_ENV'] ?? 'development',
});
