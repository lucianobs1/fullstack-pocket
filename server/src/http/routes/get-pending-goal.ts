import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekPendingGoalsUseCase } from '../../use-cases/get-week-pending-goals';

export const getPendingGoalRoute: FastifyPluginAsyncZod = async app => {
  app.get('/pending-goals', async () => {
    const { pendingGoals } = await getWeekPendingGoalsUseCase();

    return { pendingGoals };
  });
};
