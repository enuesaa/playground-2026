FROM ruby:3.3.5-slim

RUN apt-get update -qq && apt-get install -y --no-install-recommends \
      build-essential \
      libyaml-dev \
      curl \
      git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile ./
RUN bundle install

COPY . .

RUN chmod +x bin/rails bin/rake bin/setup bin/docker-entrypoint

EXPOSE 3000

ENTRYPOINT ["bin/docker-entrypoint"]
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
