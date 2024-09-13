import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekSummaryUseCase } from '../../use-cases/get-week-summary';

export const getWeeKSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get('/summary', async () => {
    const { summary } = await getWeekSummaryUseCase();

    return { summary };
  });
};
