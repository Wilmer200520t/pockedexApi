export const EnvConfigurations = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGO_URL,
  port: process.env.PORT || 3000,
  defaultLimit: +process.env.DEFAULT_LIMIT || 10,
});
