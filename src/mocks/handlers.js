import { rest } from "msw";

export const handlers = [
  rest.post("/api/register", (req, res, ctx) => {
    console.log("Handling request: ", req.body);
    return res(
      ctx.status(201),
      ctx.json({
        id: "1",
      })
    );
  }),
];
