# Admins Actions

## Table of Content

- [Get all admins](#get-all-admins)
- [Get admin by ID](#get-admin-by-ID)
- [Create admin](#create-admin)
- [Delete admin](#delete-admin)
- [Update admin](#update-admin)
- [Login admin](#login-admin)

## Get all admins

```
GET <baseURL>/admins/index/:page?
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | admins     | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Get admin by ID

```
GET <baseURL>/admins/getByID/:adminID
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 200    | admin | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 404    | error | string |

---

## Create admin

```
POST <baseURL>/admins/
Authorization: Bearer ...
```

| Field    | Type   | Required | Matches |
| -------- | ------ | -------- | ------- |
| email    | string | yes      |         |
| password | string | yes      |         |

### Response

#### On Success:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 200    | admin | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Delete admin

```
DELETE <baseURL>/admins/:adminID
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

## Update admin

```
PATCH <baseURL>/admins/:adminID
Authorization: Bearer ...
```

| Field    | Type   | Required | Matches |
| -------- | ------ | -------- | ------- |
| email    | string | no       |         |
| password | string | no       |         |

### Response

#### On Success:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 200    | admin | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Login admin

```
Post <baseURL>/admins/login
Authorization: Bearer ...
```

| Field    | Type   | Required | Matches |
| -------- | ------ | -------- | ------- |
| email    | string | no       |         |
| password | string | no       |         |

### Response

#### On Success:

| Status | Field       | Type   |
| ------ | ----------- | ------ |
| 200    | accessToken | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 400    | error | string |
| 401    | error | string |
