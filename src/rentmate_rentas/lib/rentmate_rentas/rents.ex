defmodule RentmateRentas.Rents do
  @moduledoc """
  The Rents context.
  """

  import Ecto.Query, warn: false
  alias RentmateRentas.Repo

  alias RentmateRentas.Rents.Rent

  @doc """
  Returns the list of rents.

  ## Examples

      iex> list_rents()
      [%Rent{}, ...]

  """
  def list_rents do
    Repo.all(Rent)
  end

  @doc """
  Gets a single rent.

  Raises `Ecto.NoResultsError` if the Rent does not exist.

  ## Examples

      iex> get_rent!(123)
      %Rent{}

      iex> get_rent!(456)
      ** (Ecto.NoResultsError)

  """
  def get_rent!(id), do: Repo.get!(Rent, id)

  @doc """
  Creates a rent.

  ## Examples

      iex> create_rent(%{field: value})
      {:ok, %Rent{}}

      iex> create_rent(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_rent(attrs \\ %{}) do
    %Rent{}
    |> Rent.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a rent.

  ## Examples

      iex> update_rent(rent, %{field: new_value})
      {:ok, %Rent{}}

      iex> update_rent(rent, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_rent(%Rent{} = rent, attrs) do
    rent
    |> Rent.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a rent.

  ## Examples

      iex> delete_rent(rent)
      {:ok, %Rent{}}

      iex> delete_rent(rent)
      {:error, %Ecto.Changeset{}}

  """
  def delete_rent(%Rent{} = rent) do
    Repo.delete(rent)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking rent changes.

  ## Examples

      iex> change_rent(rent)
      %Ecto.Changeset{source: %Rent{}}

  """
  def change_rent(%Rent{} = rent) do
    Rent.changeset(rent, %{})
  end
end
