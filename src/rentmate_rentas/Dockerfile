  
FROM elixir:latest

RUN apt-get update && \
  apt-get install -y postgresql-client

RUN mkdir /app
COPY . /app
WORKDIR /app


RUN mix local.hex --force

RUN mix local.rebar --force

RUN mix deps.clean --all

RUN mix deps.get && \ 
    mix do compile

#RUN chmod +x /app/entrypoint.sh
CMD ["/app/entrypoint.sh"]
EXPOSE 3005