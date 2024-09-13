import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createGoalRoute } from './routes/create-goal.routes';
import { createGoalCompletionRoute } from './routes/create-goal-completion.routes';
import { getPendingGoalRoute } from './routes/get-pending-goal..routes';
import { getWeeKSummaryRoute } from './routes/get-week-summary.routes';
import fastifyCors from '@fastify/cors';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: '*',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(createGoalCompletionRoute);
app.register(getPendingGoalRoute);
app.register(getWeeKSummaryRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('⭐ Server is running ⭐');
  });
