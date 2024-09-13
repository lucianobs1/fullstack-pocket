import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { createGoal } from '../use-cases/create-goal';
import { createGoalCompletion } from '../use-cases/create-goal-completion';

import z from 'zod';
import { getWeekPendingGoals } from '../use-cases/get-week-pending-goals';
import { createGoalRoute } from './routes/create-goal';
import { createGoalCompletionRoute } from './routes/create-goal-completion';
import { getPendingGoalRoute } from './routes/get-pending-goal';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(createGoalCompletionRoute);
app.register(getPendingGoalRoute);

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('⭐ Server is running ⭐');
  });
