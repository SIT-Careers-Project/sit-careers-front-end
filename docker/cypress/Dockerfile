FROM cypress/base:14.15.4

WORKDIR /app
ENV APPLICATION_ROOT /app

COPY package.json $APPLICATION_ROOT
COPY yarn.lock $APPLICATION_ROOT
RUN yarn install

COPY .babelrc $APPLICATION_ROOT
COPY .eslintrc.js $APPLICATION_ROOT
COPY .prettierrc $APPLICATION_ROOT
COPY next-env.d.ts $APPLICATION_ROOT
COPY next.config.js $APPLICATIO_ROOT
COPY postcss.config.js $APPLICATION_ROOT
COPY tailwind.config.js $APPLICATION_ROOT
COPY tsconfig.json $APPLICATION_ROOT
COPY cypress.json $APPLICATION_ROOT

COPY .env $APPLICATION_ROOT/

COPY ./cypress $APPLICATION_ROOT/cypress
COPY ./utils $APPLICATION_ROOT/utils
COPY ./pages $APPLICATION_ROOT/pages
COPY ./public $APPLICATION_ROOT/public
COPY ./core $APPLICATION_ROOT/core
COPY ./features $APPLICATION_ROOT/features

RUN yarn build

CMD yarn start
