export default () => {
  const dbUrl = process.env.DATABASE_URL ?? '';
  const jwtSecret = process.env.JWT_SECRET ?? '';
  const port = parseInt(process.env.PORT ?? '5000', 10);

  if (!dbUrl) throw new Error('DATABASE_URL is missing in .env');
  if (!jwtSecret) throw new Error('JWT_SECRET is missing in .env');

  return {
    database: { url: dbUrl },
    jwt: { secret: jwtSecret },
    port,
  };
};
