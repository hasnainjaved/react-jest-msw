import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { server } from "./mocks/server"
import { rest } from "msw"

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test("successfull registration", () => {
  render( <App />, { wrapper: MemoryRouter } );

  userEvent.type(screen.getByRole("textbox", { name: /username/i }), "ok_test")
  userEvent.click(screen.getByRole("button", { name: /submit/i }))

  expect(screen.getByText(/registration successfully. id: 1/i)).toBeInTheDocument()
});

test("internal server error", () => {
  server.use(
    rest.post("/api/register", async (req, res, ctx) => {
      console.log("Handling 500: ", req.body)
      return res.once(
        ctx.status(500),
        ctx.json({
          message: "Internal Server Error"
        })
      )
    })
  )

  render( <App />, { wrapper: MemoryRouter } );
  
  userEvent.type(screen.getByRole("textbox", { name: /username/i }), "server_error_test")
  userEvent.click(screen.getByRole("button", { name: /submit/i }))

  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
})