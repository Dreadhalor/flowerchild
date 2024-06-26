import express from 'express';
import { getPayloadClient } from './get-payload';
import { nextApp, nextHandler } from './next-utils';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc';
import { inferAsyncReturnType } from '@trpc/server';
import bodyParser from 'body-parser';
import { IncomingMessage } from 'http';
import { stripeWebhookHandler } from './webhooks';

const app = express();
const port = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

export type ExpressContext = inferAsyncReturnType<typeof createContext>;
export type WebhookRequest = IncomingMessage & { rawBody: Buffer };

const start = async () => {
  const webhookMiddleware = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer;
    },
  });

  app.post('/api/webhooks/stripe', webhookMiddleware, stripeWebhookHandler);

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
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  if (process.env.NODE_ENV === 'production') {
    // Serve the built Next.js app in production
    const nextStaticDir = './.next/server/pages';
    app.use(express.static(nextStaticDir));
    app.get('*', (req, res) => nextHandler(req, res));
  } else {
    // Use Next.js development server in development
    app.use((req, res) => nextHandler(req, res));
  }

  await nextApp.prepare();
  payload?.logger.info(`Starting server on port ${port}`);

  app.listen(port, () => {
    payload?.logger.info(`Server started on http://localhost:${port}`);
  });
};

start();
