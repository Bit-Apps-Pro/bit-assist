# Get NPM packages
FROM node:16-alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR .
COPY package.json yarn.lock ./
COPY ./postinstall.js ./postinstall.js
RUN yarn install

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR .
COPY ./ ./
COPY --from=dependencies ./node_modules ./node_modules
RUN yarn run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR .

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs ./ ./
#COPY --from=builder --chown=nextjs:nodejs ./out ./out
#COPY --from=builder --chown=nextjs:nodejs ./public ./public
#COPY --from=builder --chown=nextjs:nodejs ./node_modules ./node_modules
#COPY --from=builder --chown=nextjs:nodejs ./package.json ./package.json
#COPY --from=builder --chown=nextjs:nodejs ./src ./src
#COPY --from=builder --chown=nextjs:nodejs ./.env ./.env
#COPY --from=builder --chown=nextjs:nodejs ./next.config.js ./next.config.js
#COPY --from=builder --chown=nextjs:nodejs ./.eslintrc.json ./.eslintrc.json
#COPY --from=builder --chown=nextjs:nodejs ./tsconfig.json ./tsconfig.json

USER nextjs
EXPOSE 3000

CMD ["yarn", "dev"]