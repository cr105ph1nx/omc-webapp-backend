# Courses Actions

## Table of Content

- [Get all courses](#get-all-courses)
- [Get course by ID](#get-course-by-ID)
- [Search for course](#search-for-course)
- [Create course](#create-course)
- [Delete course](#delete-course)
- [Update course](#update-course)

## Get all courses

```
GET <baseURL>/courses/index/:page?
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | courses    | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Get course by ID

```
GET <baseURL>/courses/getByID/:courseID
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field  | Type   |
| ------ | ------ | ------ |
| 200    | course | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 404    | error | string |

---

## Search for course

```
POST <baseURL>/courses/search/:page?
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
| 200    | courses    | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Create course

```
POST <baseURL>/courses/
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

| Status | Field  | Type   |
| ------ | ------ | ------ |
| 200    | course | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Delete course

```
DELETE <baseURL>/courses/:courseID
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

## Update course

```
PATCH <baseURL>/courses/:courseID
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

| Status | Field  | Type   |
| ------ | ------ | ------ |
| 200    | course | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
