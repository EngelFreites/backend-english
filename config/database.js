const path = require("path");

module.exports = ({ env }) => {
  const connectionString = env("DATABASE_URL");

  // Si estamos en producción y no hay URL, lanzamos error
  if (env("NODE_ENV") === "production" && !connectionString) {
    throw new Error("DATABASE_URL is required in production");
  }

  // Si no hay URL, usamos configuración local para desarrollo
  if (!connectionString) {
    return {
      connection: {
        client: "postgres",
        connection: {
          host: env("DATABASE_HOST", "localhost"),
          port: env.int("DATABASE_PORT", 5432),
          database: env("DATABASE_NAME", "strapi"),
          user: env("DATABASE_USERNAME", "strapi"),
          password: env("DATABASE_PASSWORD", "strapi"),
          schema: "public",
        },
        pool: {
          min: env.int("DATABASE_POOL_MIN", 2),
          max: env.int("DATABASE_POOL_MAX", 10),
        },
        acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
      },
    };
  }

  // En producción, usamos la URL de conexión
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
