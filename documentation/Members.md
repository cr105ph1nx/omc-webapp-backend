# Members Actions

## Table of Content

- [Get all members](#get-all-members)
- [Get member by ID](#get-member-by-ID)
- [Search for member](#search-for-member)
- [Create member](#create-member)
- [Delete member](#delete-member)
- [Update member](#update-member)
- [Accept members](#accept-members)
- [Reject members](#reject-members)
- [Download members](#download-members)

## Get all members

```
GET <baseURL>/members/index/:page?
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | members    | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Get member by ID

```
GET <baseURL>/members/getByID/:memberID
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field  | Type   |
| ------ | ------ | ------ |
| 200    | member | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 404    | error | string |

---

## Search for member

```
POST <baseURL>/members/search/:page?
Authorization: Bearer ...
```

| Field       | Type    | Required | Matches                           |
| ----------- | ------- | -------- | --------------------------------- |
| email       | boolean | no       |                                   |
| fullname    | string  | no       |                                   |
| studentID   | string  | no       |                                   |
| phonenumber | string  | no       |                                   |
| level       | string  | no       | L1/L2/L3/M1/M2/D                  |
| faculty     | string  | no       |                                   |
| team        | string  | no       | IT/Marketing/Design/B2B/OMCAST/HR |
| isAccepted  | boolean | no       |                                   |

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | members    | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Create member

```
POST <baseURL>/members/
```

| Field       | Type    | Required | Matches                           |
| ----------- | ------- | -------- | --------------------------------- |
| email       | boolean | yes      |                                   |
| fullname    | string  | yes      |                                   |
| studentID   | string  | yes      |                                   |
| phonenumber | string  | yes      |                                   |
| level       | string  | yes      | L1/L2/L3/M1/M2/D                  |
| faculty     | string  | yes      |                                   |
| motivation  | string  | yes      |                                   |
| team        | string  | yes      | IT/Marketing/Design/B2B/OMCAST/HR |
| experience  | string  | yes      |                                   |

### Response

#### On Success:

| Status | Field  | Type   |
| ------ | ------ | ------ |
| 200    | member | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Delete member

```
DELETE <baseURL>/members/:memberID
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

## Update member

```
PATCH <baseURL>/members/:memberID
Authorization: Bearer ...
```

| Field       | Type    | Required | Matches          |
| ----------- | ------- | -------- | ---------------- |
| email       | boolean | no       |                  |
| fullname    | string  | no       |                  |
| studentID   | string  | no       |                  |
| phonenumber | string  | no       |                  |
| level       | string  | no       | L1/L2/L3/M1/M2/D |
| faculty     | string  | no       |                  |
| motivation  | string  | no       |                  |
| team        | string  | no       |                  |
| experience  | string  | no       |                  |
| isAccepted  | boolean | no       |                  |

### Response

#### On Success:

| Status | Field  | Type   |
| ------ | ------ | ------ |
| 200    | member | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Accept members

```
POST <baseURL>/members/accept
Authorization: Bearer ...
```

| Field   | Type        | Required | Matches |
| ------- | ----------- | -------- | ------- |
| members | array of id | yes      |         |

### Response

#### On Success:

| Status | Field     | Type   |
| ------ | --------- | ------ |
| 200    | message   | string |
|        | unhandled | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Reject members

```
POST <baseURL>/members/reject
Authorization: Bearer ...
```

| Field   | Type        | Required | Matches |
| ------- | ----------- | -------- | ------- |
| members | array of id | yes      |         |

### Response

#### On Success:

| Status | Field     | Type   |
| ------ | --------- | ------ |
| 200    | message   | string |
|        | unhandled | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Download members

```
POST <baseURL>/members/downloadAccepted
Authorization: Bearer ...
```

| Field   | Type   | Required | Matches                  |
| ------- | ------ | -------- | ------------------------ |
| session | object | yes      | {sessionID, sessionType} |

### Response

#### On Success:

| Status | Field     | Type   |
| ------ | --------- | ------ |
| 200    | csvString | string |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
