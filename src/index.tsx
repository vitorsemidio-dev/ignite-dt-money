import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createServer, Model } from "miragejs";
import { App } from "./App";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance de website",
          amount: 8000,
          category: "Dev",
          type: "deposit",
          createdAt: new Date("2022-04-01 09:00:00"),
        },
        {
          id: 2,
          title: "Aluguel",
          amount: 1800,
          category: "Casa",
          type: "withdraw",
          createdAt: new Date("2022-04-08 09:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
