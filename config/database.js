const parse = require("pg-connection-string").parse;

module.exports = ({ env }) => {
  const isProduction = env("NODE_ENV") === "production";
  const connectionString = env("DATABASE_URL");

  const baseConfig = {
    client: "postgres",
    pool: {
      min: env.int("DATABASE_POOL_MIN", 2),
      max: env.int("DATABASE_POOL_MAX", 10),
    },
    acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
  };

  if (isProduction && !connectionString) {
    throw new Error("DATABASE_URL is required in production");
  }

  if (connectionString) {
    const parsed = parse(connectionString);
    return {
      connection: {
        ...baseConfig,
        connection: {
          host: parsed.host,
          port: parsed.port,
          database: parsed.database,
          user: parsed.user,
          password: parsed.password,
          ssl: env.bool("DATABASE_SSL", false),
        },
      },
    };
  }

  // Config local
  return {
    connection: {
      ...baseConfig,
      connection: {
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "strapi"),
        user: env("DATABASE_USERNAME", "strapi"),
        password: env("DATABASE_PASSWORD", "strapi"),
        schema: "public",
      },
    },
  };
};
