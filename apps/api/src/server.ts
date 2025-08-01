import bodyParser from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import initMock from "@repo/mock";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    });

  if (process.env.MOCK_MODE === "true") {
    app.use(
      initMock({
        cwd: process.cwd(),
        mockConfig: {
          include: ["./mock/**/*", "../web/app/**/_mock.ts"],
        },
      })
    );
  }

  return app;
};
