const path = require("path");

module.exports = ({ env }) => {
  const connectionString = env("DATABASE_URL");

  if (!connectionString) {
    throw new Error("DATABASE_URL is required");
  }

  return {
    connection: {
      client: "postgres",
      connection: connectionString,
      ssl: env.bool("DATABASE_SSL", false),
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
