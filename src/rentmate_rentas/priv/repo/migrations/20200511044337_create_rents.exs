defmodule RentmateRentas.Repo.Migrations.CreateRents do
  use Ecto.Migration

  def change do
    create table(:rents) do
      add :owner, :string
      add :client, :string
      add :idAdvertisement, :string
      add :startDate, :string
      add :endDate, :string

      timestamps()
    end

  end
end
