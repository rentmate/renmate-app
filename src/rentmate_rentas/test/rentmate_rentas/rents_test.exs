defmodule RentmateRentas.RentsTest do
  use RentmateRentas.DataCase

  alias RentmateRentas.Rents

  describe "rents" do
    alias RentmateRentas.Rents.Rent

    @valid_attrs %{client: "some client", endDate: "some endDate", idAdvertisement: "some idAdvertisement", owner: "some owner", startDate: "some startDate"}
    @update_attrs %{client: "some updated client", endDate: "some updated endDate", idAdvertisement: "some updated idAdvertisement", owner: "some updated owner", startDate: "some updated startDate"}
    @invalid_attrs %{client: nil, endDate: nil, idAdvertisement: nil, owner: nil, startDate: nil}

    def rent_fixture(attrs \\ %{}) do
      {:ok, rent} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Rents.create_rent()

      rent
    end

    test "list_rents/0 returns all rents" do
      rent = rent_fixture()
      assert Rents.list_rents() == [rent]
    end

    test "get_rent!/1 returns the rent with given id" do
      rent = rent_fixture()
      assert Rents.get_rent!(rent.id) == rent
    end

    test "create_rent/1 with valid data creates a rent" do
      assert {:ok, %Rent{} = rent} = Rents.create_rent(@valid_attrs)
      assert rent.client == "some client"
      assert rent.endDate == "some endDate"
      assert rent.idAdvertisement == "some idAdvertisement"
      assert rent.owner == "some owner"
      assert rent.startDate == "some startDate"
    end

    test "create_rent/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Rents.create_rent(@invalid_attrs)
    end

    test "update_rent/2 with valid data updates the rent" do
      rent = rent_fixture()
      assert {:ok, %Rent{} = rent} = Rents.update_rent(rent, @update_attrs)
      assert rent.client == "some updated client"
      assert rent.endDate == "some updated endDate"
      assert rent.idAdvertisement == "some updated idAdvertisement"
      assert rent.owner == "some updated owner"
      assert rent.startDate == "some updated startDate"
    end

    test "update_rent/2 with invalid data returns error changeset" do
      rent = rent_fixture()
      assert {:error, %Ecto.Changeset{}} = Rents.update_rent(rent, @invalid_attrs)
      assert rent == Rents.get_rent!(rent.id)
    end

    test "delete_rent/1 deletes the rent" do
      rent = rent_fixture()
      assert {:ok, %Rent{}} = Rents.delete_rent(rent)
      assert_raise Ecto.NoResultsError, fn -> Rents.get_rent!(rent.id) end
    end

    test "change_rent/1 returns a rent changeset" do
      rent = rent_fixture()
      assert %Ecto.Changeset{} = Rents.change_rent(rent)
    end
  end
end
