import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { createGoal } from '../use-cases/create-goal';
import z from 'zod';
import { getWeekPendingGoals } from '../use-cases/get-week-pending-goals';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.post(
  '/goals',
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async request => {
    const { title, desiredWeeklyFrequency } = request.body;

    await createGoal({
      title,
      desiredWeeklyFrequency,
    });
  }
);

app.get('/pending-goals', async request => {
  const { pendingGoals } = await getWeekPendingGoals();

  return { pendingGoals };
});

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('⭐ Server is running ⭐');
  });
