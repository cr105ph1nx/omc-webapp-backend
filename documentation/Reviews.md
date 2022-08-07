# Reviews Actions

## Table of Content

- [Get all reviews](#get-all-reviews)
- [Get review by ID](#get-review-by-ID)
- [Get session reviews](#get-session-reviews)
- [Censor review](#censor-review)

## Get all reviews

```
GET <baseURL>/reviews/index/:page?
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | reviews    | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Get review by ID

```
GET <baseURL>/reviews/getByID/:reviewID
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field  | Type   |
| ------ | ------ | ------ |
| 200    | review | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 404    | error | string |

---

## Get session reviews

```
POST <baseURL>/getSessionReview/:page?
Authorization: Bearer ...
```

| Field       | Type   | Required | Matches               |
| ----------- | ------ | -------- | --------------------- |
| sessionID   | string | yes      |                       |
| sessionType | string | yes      | EVENT/COURSE/ACTIVITY |

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | reviews    | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Censor review

```
POST <baseURL>/reviews/
Authorization: Bearer ...
```

| Field   | Type        | Required | Matches |
| ------- | ----------- | -------- | ------- |
| reviews | array of id | yes      |         |

### Response

#### On Success:

| Status | Field     | Type            |
| ------ | --------- | --------------- |
| 200    | message   | string          |
|        | unhandled | array of string |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
