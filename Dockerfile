FROM node:alpine AS build
RUN mkdir /app
RUN addgroup -g 1001 -S app && \
  adduser -u 1001 -S app -G app && \
  chown -R app:app /app && \
  chmod 770 /app
USER app:app
WORKDIR /app
COPY --chown=app:app package.json package-lock.json ./
RUN npm set progress=false && \
  npm config set depth 0 && \
  npm ci
COPY --chown=app:app .babelrc tsconfig.json jest.config.js ./
COPY --chown=app:app webpack ./webpack
COPY --chown=app:app test ./test
COPY --chown=app:app src ./src
RUN npm test
RUN npm run build:prod

FROM nginx:alpine
RUN mkdir /app
RUN addgroup -g 1001 -S app && \
  adduser -u 1001 -S app -G app && \
  chown -R app:app /app && \
  chown -R app:app /var/cache/nginx && \
  touch /var/run/nginx.pid && \
  chown -R app:app /var/run/nginx.pid && \
  chmod 770 /app
USER app:app
WORKDIR /app
COPY --chown=app:app nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=app:app --from=build /app/dist ./
COPY --chown=app:app entrypoint.sh config.template.js ./
RUN dos2unix entrypoint.sh && chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
EXPOSE 8000
