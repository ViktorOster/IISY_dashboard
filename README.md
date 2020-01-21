# IISY frontend dashboard prototype communicating with IISY API

GET tickets: **/vi/api/tickets/**
example JSON response:
```
[
  {
    "id": 1,
    "location": "2",
    "created": "2020-01-21T19:58:26.689859Z",
    "status": "1",
    "message": "1",
    "department": 2,
    "entity": 3
  },
  {
    "id": 2,
    "location": "2",
    "created": "2020-01-21T19:59:42.403120Z",
    "status": "1",
    "message": "1",
    "department": 1,
    "entity": 4
  }
]
```

GET entities: **/v1/api/entity/**
example JSON response:
```
[
  {
    "id": 1,
    "uuid": "757e337a-1002-4ed9-9e70-8c895e4e31fd",
    "name": "PC",
    "date": "2020-01-21T19:41:56.179765Z",
    "slug": "utu.newdomain.live/757e337a-1002-4ed9-9e70-8c895e4e31fd",
    "location": "1",
    "scanned": false,
    "quantity": 0,
    "numberOfOngoingTickets": 0,
    "department": 1
  },
  {
    "id": 2,
    "uuid": "f74e4e09-f44e-4d5f-9d1d-2056741ae5b6",
    "name": "Projector",
    "date": "2020-01-21T19:49:08.264649Z",
    "slug": "utu.newdomain.live/f74e4e09-f44e-4d5f-9d1d-2056741ae5b6",
    "location": "1",
    "scanned": false,
    "quantity": 0,
    "numberOfOngoingTickets": 0,
    "department": 2
  }
]
```
POST (add) ticket (entity id required in body of request): /v1/api/ticket/
example POST request (using fetch):
```
fetch(baseUrl + "v1/api/ticket/", {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'POST',
    body: JSON.stringify({
        "entity": entityId
    })
})
```
POST (add) entity (entity name and department id required in body of request): /v1/api/entity/
example POST request (using fetch):
```
fetch(baseUrl + "v1/api/entity/", {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'POST',
    body: JSON.stringify({
        "name": entityName,
        "department": departmentId,
    })
})
```
PUT (change) ticket status (ticket id and status number required in body of request): /v1/api/ticket/[ticket id here]
example PUT request (using fetch):
```
fetch(baseUrl + "v1/api/ticket/" + ticketId, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'PUT',
    body: JSON.stringify({
        "ticket": ticketId,
        "status": status,
    })
})    
```
GET entity (entity id required in body of request): /v1/api/entity/[entity id here]
(useful for getting all info about entity if you only have the id)

GET department (department id required in body of request): /v1/api/department/[department id here]
(useful for getting all info about department if you only have the id)

