const path = require("path");

module.exports = ({ env }) => {
  const isProduction = env("NODE_ENV") === "production";
  const connectionString = env("DATABASE_URL");

  // Configuración base
  const baseConfig = {
    client: "postgres",
    pool: {
      min: env.int("DATABASE_POOL_MIN", 2),
      max: env.int("DATABASE_POOL_MAX", 10),
    },
    acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
  };

  // Si estamos en producción y no hay URL, lanzamos error
  if (isProduction && !connectionString) {
    throw new Error("DATABASE_URL is required in production");
  }

  // Si hay URL de conexión, la usamos
  if (connectionString) {
    return {
      connection: {
        ...baseConfig,
        connection: connectionString,
        ssl: env.bool("DATABASE_SSL", false),
      },
    };
  }

  // Configuración local para desarrollo/build
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
