import type { RequestHandler } from "express";
import { createMockMiddleware } from "./createMockMiddleware";
import { getMockData, IMockOptions } from "./getMockData";

export default function initMock(opts: IMockOptions): RequestHandler {
  // context for update mockData
  const context = {
    mockData: {},
  };
  try {
    context.mockData = getMockData(opts);
  } catch (e) {
    console.error(e);
  }
  return createMockMiddleware({
    context,
  });
}
