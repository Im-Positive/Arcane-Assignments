FROM node:22-slim
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY index.html client.js game.mjs server.mjs ./
ENV NODE_ENV=production
EXPOSE 8080
USER node
CMD ["node","server.mjs"]
