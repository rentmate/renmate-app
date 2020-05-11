defmodule RentmateRentasWeb.Router do
  use RentmateRentasWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", RentmateRentasWeb do
    pipe_through :api

  resources "/rents", RentController, except: [:new, :edit]
  end
end
