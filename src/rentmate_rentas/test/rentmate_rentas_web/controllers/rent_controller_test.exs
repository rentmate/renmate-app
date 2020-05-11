defmodule RentmateRentasWeb.RentControllerTest do
  use RentmateRentasWeb.ConnCase

  alias RentmateRentas.Rents
  alias RentmateRentas.Rents.Rent

  @create_attrs %{
    client: "some client",
    endDate: "some endDate",
    idAdvertisement: "some idAdvertisement",
    owner: "some owner",
    startDate: "some startDate"
  }
  @update_attrs %{
    client: "some updated client",
    endDate: "some updated endDate",
    idAdvertisement: "some updated idAdvertisement",
    owner: "some updated owner",
    startDate: "some updated startDate"
  }
  @invalid_attrs %{client: nil, endDate: nil, idAdvertisement: nil, owner: nil, startDate: nil}

  def fixture(:rent) do
    {:ok, rent} = Rents.create_rent(@create_attrs)
    rent
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all rents", %{conn: conn} do
      conn = get(conn, Routes.rent_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create rent" do
    test "renders rent when data is valid", %{conn: conn} do
      conn = post(conn, Routes.rent_path(conn, :create), rent: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.rent_path(conn, :show, id))

      assert %{
               "id" => id,
               "client" => "some client",
               "endDate" => "some endDate",
               "idAdvertisement" => "some idAdvertisement",
               "owner" => "some owner",
               "startDate" => "some startDate"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.rent_path(conn, :create), rent: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update rent" do
    setup [:create_rent]

    test "renders rent when data is valid", %{conn: conn, rent: %Rent{id: id} = rent} do
      conn = put(conn, Routes.rent_path(conn, :update, rent), rent: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.rent_path(conn, :show, id))

      assert %{
               "id" => id,
               "client" => "some updated client",
               "endDate" => "some updated endDate",
               "idAdvertisement" => "some updated idAdvertisement",
               "owner" => "some updated owner",
               "startDate" => "some updated startDate"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, rent: rent} do
      conn = put(conn, Routes.rent_path(conn, :update, rent), rent: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete rent" do
    setup [:create_rent]

    test "deletes chosen rent", %{conn: conn, rent: rent} do
      conn = delete(conn, Routes.rent_path(conn, :delete, rent))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.rent_path(conn, :show, rent))
      end
    end
  end

  defp create_rent(_) do
    rent = fixture(:rent)
    {:ok, rent: rent}
  end
end
