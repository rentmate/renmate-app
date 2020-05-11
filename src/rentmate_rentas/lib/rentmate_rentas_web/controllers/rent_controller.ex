defmodule RentmateRentasWeb.RentController do
  use RentmateRentasWeb, :controller

  alias RentmateRentas.Rents
  alias RentmateRentas.Rents.Rent

  action_fallback RentmateRentasWeb.FallbackController

  def index(conn, _params) do
    rents = Rents.list_rents()
    render(conn, "index.json", rents: rents)
  end

  def create(conn, rent_params) do
    with {:ok, %Rent{} = rent} <- Rents.create_rent(rent_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.rent_path(conn, :show, rent))
      |> render("show.json", rent: rent)
    end
  end

  def show(conn, %{"id" => id}) do
    rent = Rents.get_rent!(id)
    render(conn, "show.json", rent: rent)
  end

  def update(conn, %{"id" => id, "rent" => rent_params}) do
    rent = Rents.get_rent!(id)

    with {:ok, %Rent{} = rent} <- Rents.update_rent(rent, rent_params) do
      render(conn, "show.json", rent: rent)
    end
  end

  def delete(conn, %{"id" => id}) do
    rent = Rents.get_rent!(id)

    with {:ok, %Rent{}} <- Rents.delete_rent(rent) do
      send_resp(conn, :no_content, "")
    end
  end
end
