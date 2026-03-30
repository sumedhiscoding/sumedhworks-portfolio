const envOrDev = (env, key, devValue) => {
  const v = env(key);
  return v != null && String(v).trim() !== '' ? v : devValue;
};

module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: envOrDev(env, 'JWT_SECRET', 'dev-only-replace-jwt-secret-for-users-permissions'),
    },
  },
});
