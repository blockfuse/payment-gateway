# based on https://github.com/ruimarinho/docker-bitcoin-core
# Copyright (c) 2015 Rui Marinho

FROM debian:stable-slim

RUN useradd -r bitcoin \
  && apt-get update -y \
  && apt-get install -y curl gnupg vim \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && set -ex

ENV GOSU_VERSION=1.10

RUN curl -o /usr/local/bin/gosu -fSL https://github.com/tianon/gosu/releases/download/${GOSU_VERSION}/gosu-$(dpkg --print-architecture) \
  && curl -o /usr/local/bin/gosu.asc -fSL https://github.com/tianon/gosu/releases/download/${GOSU_VERSION}/gosu-$(dpkg --print-architecture).asc \
  && rm /usr/local/bin/gosu.asc \
  && chmod +x /usr/local/bin/gosu

ENV BITCOIN_VERSION=0.17.0

RUN curl -O https://bitcoincore.org/bin/bitcoin-core-${BITCOIN_VERSION}/bitcoin-${BITCOIN_VERSION}-x86_64-linux-gnu.tar.gz \
  && tar --strip=2 -xzf *.tar.gz -C /usr/local/bin \
  && rm *.tar.gz

RUN mkdir -p /home/bitcoin/.bitcoin

RUN chown -R bitcoin /home/bitcoin/.bitcoin

VOLUME ["/home/bitcoin/.bitcoin"]

USER "bitcoin"

EXPOSE 8332 8333 18332 18333 18444 18443 28332 28333

CMD ["bitcoind"]
