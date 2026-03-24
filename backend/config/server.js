module.exports = ({ env }) => {
  const appKeys = env.array('APP_KEYS');
  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys:
        Array.isArray(appKeys) && appKeys.length > 0
          ? appKeys
          : ['localDevOnlyKey1', 'localDevOnlyKey2'],
    },
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
  };
};
