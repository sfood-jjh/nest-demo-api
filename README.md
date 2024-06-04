## demo api
- `one time` install package and prepare prisma connector
```bash
-- package install
yarn
-- db connect (sqlite)
npx prisma migrate dev
--
```
- run local server
```bash
-- localhost:8000
yarn start:dev
```


## API
```http
  ### Expect Todos API

  GET http://localhost:8000/api/todos

  POST http://localhost:8000/api/todos
  Content-Type: application/json

  {
    "content": "Contents"
  }

  PATCH http://localhost:8000/api/todos/:id

  {
    "chcked": true
  }

  DELETE http://localhost:8000/api/todos/:id


  ### Expect Posts API

  GET http://localhost:8000/api/posts?skip=0&take=10

  GET http://localhost:8000/api/posts/:id

  POST http://localhost:8000/api/posts
  Content-Type: application/json

  {
    "title": "title",
    "name": "user",
    "content": "text",
  }

  PATCH http://localhost:8000/api/posts/:id
  Content-Type: application/json

  {
    "title": "title",
    "name": "user",
    "content": "text",
  }


  DELETE http://localhost:8000/api/posts/:id

```
