defmodule RentmateRentasWeb.RentView do
  use RentmateRentasWeb, :view
  alias RentmateRentasWeb.RentView

  def render("index.json", %{rents: rents}) do
    %{data: render_many(rents, RentView, "rent.json")}
  end

  def render("show.json", %{rent: rent}) do
    %{data: render_one(rent, RentView, "rent.json")}
  end

  def render("rent.json", %{rent: rent}) do
    %{id: rent.id,
      owner: rent.owner,
      client: rent.client,
      idAdvertisement: rent.idAdvertisement,
      startDate: rent.startDate,
      endDate: rent.endDate}
  end
end
