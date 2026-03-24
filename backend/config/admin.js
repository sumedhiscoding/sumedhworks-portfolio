const envOrDev = (env, key, devValue) => {
  const v = env(key);
  return v != null && String(v).trim() !== '' ? v : devValue;
};

module.exports = ({ env }) => ({
  auth: {
    secret: envOrDev(env, 'ADMIN_JWT_SECRET', 'dev-only-replace-admin-jwt-secret'),
  },
  apiToken: {
    salt: envOrDev(env, 'API_TOKEN_SALT', 'dev-only-replace-api-token-salt'),
  },
  transfer: {
    token: {
      salt: envOrDev(env, 'TRANSFER_TOKEN_SALT', 'dev-only-replace-transfer-salt'),
    },
  },
  secrets: {
    encryptionKey: envOrDev(env, 'ENCRYPTION_KEY', '12345678901234567890123456789012'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
