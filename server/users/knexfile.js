const dbConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

module.exports = {
  development: dbConfig,
  staging: dbConfig,
  production: dbConfig
};
