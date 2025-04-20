const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      connectionString: env("DATABASE_URL"),
      ssl: env.bool("DATABASE_SSL", false),
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME"),
      user: env("DATABASE_USERNAME"),
      password: env("DATABASE_PASSWORD"),
      schema: "public",
    },
    pool: {
      min: env.int("DATABASE_POOL_MIN", 2),
      max: env.int("DATABASE_POOL_MAX", 10),
    },
    acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
  },
});
