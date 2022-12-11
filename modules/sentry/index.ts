import api from "@serverless/cloud";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import express, {Router} from "express";

// or using CommonJS
// const api = require("@serverless/cloud");
// const Sentry = require('@sentry/node');
// const Tracing = require("@sentry/tracing");
export default  (app:express.Express)=>{
    Sentry.init({
        dsn: "https://0b3b7a98e8544e18af3f1bbe692ed967@o4504282191167488.ingest.sentry.io/4504282205388800",
        // or pull from params
        // dsn: params.SENTRY_DSN,
        environment: 'develop',
        integrations: [
            // enable HTTP calls tracing
            new Sentry.Integrations.Http({ tracing: true }),
            // enable Express.js middleware tracing
            new Tracing.Integrations.Express({ app }),
        ],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
        // or pull from params
        // tracesSampleRate: parseFloat(params.SENTRY_TRACES_SAMPLE_RATE),
    });
    app.use(Sentry.Handlers.requestHandler())
    app.use(Sentry.Handlers.tracingHandler())
    app.use(Sentry.Handlers.errorHandler())
}
