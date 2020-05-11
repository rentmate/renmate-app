defmodule RentmateRentas.Rents.Rent do
  use Ecto.Schema
  import Ecto.Changeset

  schema "rents" do
    field :client, :string
    field :endDate, :string
    field :idAdvertisement, :string
    field :owner, :string
    field :startDate, :string

    timestamps()
  end

  @doc false
  def changeset(rent, attrs) do
    rent
    |> cast(attrs, [:owner, :client, :idAdvertisement, :startDate, :endDate])
    |> validate_required([:owner, :client, :idAdvertisement, :startDate, :endDate])
  end
end
