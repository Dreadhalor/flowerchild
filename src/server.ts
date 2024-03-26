import express from 'express';
import { getPayloadClient } from './get-payload';
import { nextApp, nextHandler } from './next-utils';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc';

const app = express();
const port = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
      },
    },
  });

  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({ router: appRouter, createContext }),
  );

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload?.logger.info(`Starting server on port ${port}`);

    app.listen(port, () => {
      payload?.logger.info(`Server started on http://localhost:${port}`);
    });
  });
};

start();