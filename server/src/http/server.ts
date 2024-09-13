import fastify from 'fastify';

const app = fastify();

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(process.env.DATABASE_URL);
    console.log('⭐ Server is running ⭐');
  });
