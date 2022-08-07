# Guests Actions

## Table of Content

- [Contact Us](#contact-us)
- [Suggest Session](#suggest-session)
- [Leave Review](#leave-review)

## Contact Us

```
POST <baseURL>/guests/contact
```

| Field       | Type   | Required | Matches |
| ----------- | ------ | -------- | ------- |
| fullname    | string | yes      |         |
| email       | string | yes      |         |
| phonenumber | string | yes      |         |
| subject     | string | yes      |         |
| description | string | yes      |         |

### Response

#### On Success:

| Status | Field   | Type   |
| ------ | ------- | ------ |
| 200    | message | string |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 400    | error | string |

---

## Suggest Session

```
POST <baseURL>/guests/suggest
```

| Field       | Type   | Required | Matches |
| ----------- | ------ | -------- | ------- |
| fullname    | string | yes      |         |
| email       | string | yes      |         |
| phonenumber | string | yes      |         |
| subject     | string | yes      |         |
| type        | string | yes      |         |
| title       | string | yes      |         |
| description | string | yes      |         |

### Response:

#### On Success:

| Status | Field   | Type   |
| ------ | ------- | ------ |
| 200    | message | string |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 400    | error | string |

---

## Leave Review

```
GET <baseURL>/guests/addReview/:sessionType?/:sessionID?/:rating?/:title?/:description?
```

### Response:

#### On Success:

| Status | Field   | Type   |
| ------ | ------- | ------ |
| 200    | message | string |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 400    | error | string |
| 404    | error | string |
