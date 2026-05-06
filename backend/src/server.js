import http from "node:http";
import { Server } from "socket.io";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/db.js";
import { registerInterviewSocket } from "./sockets/interviewSocket.js";

export async function startServer() {
  if (env.useMemoryStore) {
    console.warn("Using in-memory store. Data will reset when the server stops.");
  } else {
    await connectDatabase();
  }

  const app = createApp();
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: env.clientUrl,
      credentials: true,
    },
  });

  registerInterviewSocket(io);

  httpServer.listen(env.port, () => {
    console.log(`Server listening on http://localhost:${env.port}`);
  });
}
