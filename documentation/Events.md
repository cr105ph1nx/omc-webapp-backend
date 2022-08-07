# Events Actions

## Table of Content

- [Get all events](#get-all-events)
- [Get event by ID](#get-event-by-ID)
- [Search for event](#search-for-event)
- [Create event](#create-event)
- [Delete event](#delete-event)
- [Update event](#update-event)

## Get all events

```
GET <baseURL>/events/index/:page?
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | events     | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Get event by ID

```
GET <baseURL>/events/getByID/:eventID
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 200    | event | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 404    | error | string |

---

## Search for event

```
POST <baseURL>/events/search/:page?
Authorization: Bearer ...
```

| Field  | Type            | Required | Matches |
| ------ | --------------- | -------- | ------- |
| title  | string          | no       |         |
| rating | number          | no       |         |
| tag    | string          | no       |         |
| tags   | array of string | no       |         |

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | events     | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Create event

```
POST <baseURL>/events/
Authorization: Bearer ...
```

| Field               | Type            | Required | Matches |
| ------------------- | --------------- | -------- | ------- |
| title               | string          | yes      |         |
| tags                | array of string | yes      |         |
| description         | string          | yes      |         |
| images              | files           | no       |         |
| websiteUrl          | string          | no       |         |
| agendaUrl           | string          | no       |         |
| sponsoringFolderUrl | string          | no       |         |

### Response

#### On Success:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 200    | event | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Delete event

```
DELETE <baseURL>/events/:eventID
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field   | Type   |
| ------ | ------- | ------ |
| 200    | message | string |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Update event

```
PATCH <baseURL>/events/:eventID
Authorization: Bearer ...
```

| Field               | Type            | Required | Matches |
| ------------------- | --------------- | -------- | ------- |
| title               | string          | no       |         |
| tags                | array of string | no       |         |
| description         | string          | no       |         |
| images              | files           | no       |         |
| websiteUrl          | string          | no       |         |
| agendaUrl           | string          | no       |         |
| sponsoringFolderUrl | string          | no       |         |

### Response

#### On Success:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 200    | event | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
