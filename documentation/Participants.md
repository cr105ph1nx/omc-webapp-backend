# Participants Actions

## Table of Content

- [Get all participants](#get-all-participants)
- [Get participant by ID](#get-participant-by-ID)
- [Search for participant](#search-for-participant)
- [Create participant](#create-participant)
- [Delete participant](#delete-participant)
- [Update participant](#update-participant)
- [Accept participants](#accept-participants)
- [Reject participants](#reject-participants)
- [Download participants](#download-participants)

## Get all participants

```
GET <baseURL>/participants/index/:page?
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field        | Type   |
| ------ | ------------ | ------ |
| 200    | participants | object |
|        | totalDocs    | int    |
|        | totalPages   | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Get participant by ID

```
GET <baseURL>/participants/getByID/:participantID
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field       | Type   |
| ------ | ----------- | ------ |
| 200    | participant | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 404    | error | string |

---

## Search for participant

```
POST <baseURL>/participants/search/:page?
Authorization: Bearer ...
```

| Field         | Type    | Required | Matches                            |
| ------------- | ------- | -------- | ---------------------------------- |
| email         | boolean | no       |                                    |
| fullname      | string  | no       |                                    |
| studentID     | string  | no       |                                    |
| phonenumber   | string  | no       |                                    |
| level         | string  | no       | Beginner/Intermediate/Advanced/All |
| establishment | string  | no       |                                    |
| session       | object  | no       | {sessionID,sessionType}            |
| isAccepted    | boolean | no       |                                    |

### Response

#### On Success:

| Status | Field        | Type   |
| ------ | ------------ | ------ |
| 200    | participants | object |
|        | totalDocs    | int    |
|        | totalPages   | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Create participant

```
POST <baseURL>/participants/
```

| Field         | Type    | Required | Matches                            |
| ------------- | ------- | -------- | ---------------------------------- |
| email         | boolean | yes      |                                    |
| fullname      | string  | yes      |                                    |
| studentID     | string  | yes      |                                    |
| phonenumber   | string  | yes      |                                    |
| level         | string  | yes      | Beginner/Intermediate/Advanced/All |
| establishment | string  | yes      |                                    |
| session       | object  | yes      | {sessionID,sessionType}            |
| experience    | string  | yes      |                                    |

### Response

#### On Success:

| Status | Field       | Type   |
| ------ | ----------- | ------ |
| 200    | participant | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Delete participant

```
DELETE <baseURL>/participants/:participantID
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

## Update participant

```
PATCH <baseURL>/participants/:participantID
Authorization: Bearer ...
```

| Field         | Type    | Required | Matches                            |
| ------------- | ------- | -------- | ---------------------------------- |
| email         | boolean | no       |                                    |
| fullname      | string  | no       |                                    |
| studentID     | string  | no       |                                    |
| phonenumber   | string  | no       |                                    |
| level         | string  | no       | Beginner/Intermediate/Advanced/All |
| establishment | string  | no       |                                    |
| isAccepted    | boolean | no       |                                    |

### Response

#### On Success:

| Status | Field       | Type   |
| ------ | ----------- | ------ |
| 200    | participant | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Accept participants

```
POST <baseURL>/participants/accept
Authorization: Bearer ...
```

| Field        | Type        | Required | Matches |
| ------------ | ----------- | -------- | ------- |
| participants | array of id | yes      |         |

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

## Reject participants

```
POST <baseURL>/participants/reject
Authorization: Bearer ...
```

| Field        | Type        | Required | Matches |
| ------------ | ----------- | -------- | ------- |
| participants | array of id | yes      |         |

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

## Download participants

```
POST <baseURL>/participants/downloadAccepted
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
