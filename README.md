### Getting Started
--------
Run the development server:

```
npm run dev
# or
yarn dev
```

#### Start project by docker-compose
1. For frist time
```bash
docker-compose -f docker-compose.local.yml up --build
```

2. Next time
```bash
docker-compose -f docker-compose.local.yml up
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying pages/index.js. The page auto-updates as you edit the file.

Fix lint
```
yarn lint
```

or if you want to format document you can use `yarn format`
