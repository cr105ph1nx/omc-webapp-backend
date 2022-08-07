# Activities Actions

## Table of Content

- [Get all activities](#get-all-activities)
- [Get activity by ID](#get-activity-by-ID)
- [Search for activity](#search-for-activity)
- [Create activity](#create-activity)
- [Delete activity](#delete-activity)
- [Update activity](#update-activity)

## Get all activities

```
GET <baseURL>/activities/index/:page?
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | activities | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Get activity by ID

```
GET <baseURL>/activities/getByID/:activityID
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field    | Type   |
| ------ | -------- | ------ |
| 200    | activity | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 404    | error | string |

---

## Search for activity

```
POST <baseURL>/activities/search/:page?
Authorization: Bearer ...
```

| Field     | Type            | Required | Matches                            |
| --------- | --------------- | -------- | ---------------------------------- |
| isActive  | boolean         | no       |                                    |
| title     | string          | no       |                                    |
| rating    | number          | no       |                                    |
| tag       | string          | no       |                                    |
| tags      | array of string | no       |                                    |
| level     | string          | no       | Beginner/Intermediate/Advanced/All |
| startDate | date            | no       |                                    |
| endDate   | date            | no       |                                    |
| period    | number          | no       |                                    |
| host      | id              | no       |                                    |
| hosts     | array of id     | no       |                                    |

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | activities | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Create activity

```
POST <baseURL>/activities/
Authorization: Bearer ...
```

| Field       | Type            | Required | Matches                             |
| ----------- | --------------- | -------- | ----------------------------------- |
| title       | string          | yes      |                                     |
| tags        | array of string | yes      |                                     |
| description | string          | yes      |                                     |
| images      | files           | no       |                                     |
| startDate   | date            | yes      |                                     |
| endDate     | date            | no       |                                     |
| period      | number          | yes      |                                     |
| location    | object          | yes      | {name\*, url}                       |
| capacity    | number          | yes      |                                     |
| level       | string          | yes      | Beginner/Intermediate/Advanced /All |
| resources   | string          | no       |                                     |
| hosts       | array of id     | yes      |                                     |

### Response

#### On Success:

| Status | Field    | Type   |
| ------ | -------- | ------ |
| 200    | activity | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Delete activity

```
DELETE <baseURL>/activities/:activityID
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

## Update activity

```
PATCH <baseURL>/activities/:activityID
Authorization: Bearer ...
```

| Field       | Type            | Required | Matches                             |
| ----------- | --------------- | -------- | ----------------------------------- |
| isActive    | boolean         | no       |                                     |
| title       | string          | no       |                                     |
| tags        | array of string | no       |                                     |
| description | string          | no       |                                     |
| startDate   | date            | no       |                                     |
| endDate     | date            | no       |                                     |
| period      | number          | no       |                                     |
| location    | object          | no       | {name\*, url}                       |
| capacity    | number          | no       |                                     |
| level       | string          | no       | Beginner/Intermediate/Advanced /All |
| resources   | string          | no       |                                     |
| hosts       | array of id     | no       |                                     |

### Response

#### On Success:

| Status | Field    | Type   |
| ------ | -------- | ------ |
| 200    | activity | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
