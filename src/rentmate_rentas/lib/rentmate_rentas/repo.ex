defmodule RentmateRentas.Repo do
  use Ecto.Repo,
    otp_app: :rentmate_rentas,
    adapter: Ecto.Adapters.Postgres
end
