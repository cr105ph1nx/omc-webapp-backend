# Partners Actions

## Table of Content

- [Get all partners](#get-all-partners)
- [Get partner by ID](#get-partner-by-ID)
- [Create partner](#create-partner)
- [Delete partner](#delete-partner)
- [Update partner](#update-partner)

## Get all partners

```
GET <baseURL>/partners/index/:page?
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | partners   | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Get partner by ID

```
GET <baseURL>/partners/getByID/:partnerID
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field   | Type   |
| ------ | ------- | ------ |
| 200    | partner | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 404    | error | string |

---

## Create partner

```
POST <baseURL>/partners/
Authorization: Bearer ...
```

| Field | Type   | Required | Matches |
| ----- | ------ | -------- | ------- |
| name  | string | yes      |         |
| logo  | image  | yes      |         |
| url   | string | no       |         |

### Response

#### On Success:

| Status | Field   | Type   |
| ------ | ------- | ------ |
| 200    | partner | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Delete partner

```
DELETE <baseURL>/partners/:partnerID
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

## Update partner

```
PATCH <baseURL>/partners/:partnerID
Authorization: Bearer ...
```

| Field | Type   | Required | Matches |
| ----- | ------ | -------- | ------- |
| name  | string | no       |         |
| url   | string | no       |         |
| logo  | file   | no       |         |

### Response

#### On Success:

| Status | Field   | Type   |
| ------ | ------- | ------ |
| 200    | partner | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
