FROM node:16.16.0-alpine3.15@sha256:e458d144f8bdd309ce81f08395bba74c887923c6050b08b7cc70ad75e8d28712
ARG appPort=9514

LABEL maintainer="Damien Laureaux <d.laureaux@timoa.com>" \
      org.label-schema.vendor="Timoa" \
      org.label-schema.name="App stores Prometheus Exporter" \
      org.label-schema.description="App stores Prometheus Exporter" \
      org.label-schema.url="https://timoa.com" \
      org.label-schema.vcs-url="https://github.com/timoa/app-stores-prometheus-exporter" \
      org.label-schema.version=latest \
      org.label-schema.schema-version="1.0"

RUN \
      apk --no-cache update && \
      apk --no-cache upgrade && \
      apk add --no-cache ca-certificates && update-ca-certificates && \
      rm -rf /var/cache/apk/* && \
      npm install -g npm@latest && \
      mkdir -p /opt/app && \
      adduser -S app-user

WORKDIR /opt/app/
COPY ./package.json ./
COPY ./src ./src

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s \
      CMD npm run docker:status

RUN \
      npm install --omit=dev --unsafe-perm && \
      npm cache clean --force

RUN chown -R app-user /opt/app
USER app-user

EXPOSE ${appPort}
CMD [ "npm", "start" ]
