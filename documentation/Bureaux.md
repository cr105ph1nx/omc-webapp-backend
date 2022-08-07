# Bureaux Actions

## Table of Content

- [Get all bureaux](#get-all-bureaux)
- [Get bureau by ID](#get-bureau-by-ID)
- [Get current bureau](#get-current-bureau)
- [Create bureau](#create-bureau)
- [Delete bureau](#delete-bureau)
- [Update bureau](#update-bureau)
- [Set current bureau visible](#set-current-bureau-visible)

## Get all bureaux

```
GET <baseURL>/bureaux/index/:page?
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | bureaux    | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Get bureau by ID

```
GET <baseURL>/bureaux/getByID/:bureauID
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field  | Type   |
| ------ | ------ | ------ |
| 200    | bureau | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 404    | error | string |

---

## Get current bureau

```
GET <baseURL>/bureaux/current
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field  | Type   |
| ------ | ------ | ------ |
| 200    | bureau | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Create bureau

```
POST <baseURL>/bureaux/
Authorization: Bearer ...
```

| Field               | Type            | Required | Matches                                    |
| ------------------- | --------------- | -------- | ------------------------------------------ |
| president           | object          | yes      | {fullname, email, phonenumber, studentID } |
| presidentImages     | array of images | yes      | {fullname, email, phonenumber, studentID } |
| vicePresident       | object          | yes      | {fullname, email, phonenumber, studentID } |
| vicePresidentImages | array of images | yes      | {fullname, email, phonenumber, studentID } |
| secretary           | object          | yes      | {fullname, email, phonenumber, studentID } |
| secretaryImages     | array of images | yes      | {fullname, email, phonenumber, studentID } |
| viceSecretary       | object          | yes      | {fullname, email, phonenumber, studentID } |
| viceSecretaryImages | array of images | yes      | {fullname, email, phonenumber, studentID } |
| year                | number          | yes      | {fullname, email, phonenumber, studentID } |

### Response

#### On Success:

| Status | Field  | Type   |
| ------ | ------ | ------ |
| 200    | bureau | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Delete bureau

```
DELETE <baseURL>/bureaux/:bureauID
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

## Update bureau

```
PATCH <baseURL>/bureaux/:bureauID
Authorization: Bearer ...
```

| Field         | Type   | Required | Matches                                    |
| ------------- | ------ | -------- | ------------------------------------------ |
| president     | object | yes      | {fullname, email, phonenumber, studentID } |
| vicePresident | object | yes      | {fullname, email, phonenumber, studentID } |
| secretary     | object | yes      | {fullname, email, phonenumber, studentID } |
| viceSecretary | object | yes      | {fullname, email, phonenumber, studentID } |
| year          | number | yes      | {fullname, email, phonenumber, studentID } |

### Response

#### On Success:

| Status | Field  | Type   |
| ------ | ------ | ------ |
| 200    | bureau | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Update bureau

```
PATCH <baseURL>/bureaux/setVisible
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
