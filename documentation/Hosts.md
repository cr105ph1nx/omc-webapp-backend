# Hosts Actions

## Table of Content

- [Get all hosts](#get-all-hosts)
- [Get host by ID](#get-host-by-ID)
- [Search for host](#search-for-host)
- [Create host](#create-host)
- [Delete host](#delete-host)
- [Update host](#update-host)
- [Add session to host](#add-session-to-host)
- [Remove session from host](#remove-session-from-host)

## Get all hosts

```
GET <baseURL>/hosts/index/:page?
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | hosts      | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Get host by ID

```
GET <baseURL>/hosts/getByID/:hostID
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 200    | host  | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 404    | error | string |

---

## Search for host

```
POST <baseURL>/hosts/search/:page?
Authorization: Bearer ...
```

| Field    | Type   | Required | Matches                    |
| -------- | ------ | -------- | -------------------------- |
| fullname | string | no       |                            |
| email    | string | no       |                            |
| session  | object | no       | {sessionID, sessionType}   |
| sessions | object | no       | [{sessionID, sessionType}] |

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | hosts      | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Create host

```
POST <baseURL>/hosts/
Authorization: Bearer ...
```

| Field             | Type   | Required | Matches |
| ----------------- | ------ | -------- | ------- |
| fullname          | string | yes      |         |
| email             | string | yes      |         |
| redirectPortfolio | string | no       |         |

### Response

#### On Success:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 200    | host  | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Delete host

```
DELETE <baseURL>/hosts/:hostID
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

## Update host

```
PATCH <baseURL>/hosts/:hostID
Authorization: Bearer ...
```

| Field             | Type   | Required | Matches |
| ----------------- | ------ | -------- | ------- |
| fullname          | string | no       |         |
| email             | string | no       |         |
| redirectPortfolio | string | no       |         |

### Response

#### On Success:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 200    | host  | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Add session to host

```
POST <baseURL>/hosts/addSession/:hostID
Authorization: Bearer ...
```

| Field   | Type   | Required | Matches                  |
| ------- | ------ | -------- | ------------------------ |
| session | object | yes      | {sessionID, sessionType} |

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

## Remove session from host

```
POST <baseURL>/hosts/removeSession/:hostID
Authorization: Bearer ...
```

| Field   | Type   | Required | Matches                  |
| ------- | ------ | -------- | ------------------------ |
| session | object | yes      | {sessionID, sessionType} |

### Response

#### On Success:

| Status | Field   | Type   |
| ------ | ------- | ------ |
| 200    | message | string |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
