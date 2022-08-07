# Slideshows Actions

## Table of Content

- [Get all slideshows](#get-all-slideshows)
- [Get slideshow by ID](#get-slideshow-by-ID)
- [Search for slideshow](#search-for-slideshow)
- [Create slideshow](#create-slideshow)
- [Delete slideshow](#delete-slideshow)
- [Update slideshow](#update-slideshow)

## Get all slideshows

```
GET <baseURL>/slideshows/index/:page?
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | slideshows | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Get slideshow by ID

```
GET <baseURL>/slideshows/getByID/:slideshowID
Authorization: Bearer ...
```

### Response

#### On Success:

| Status | Field     | Type   |
| ------ | --------- | ------ |
| 200    | slideshow | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
| 404    | error | string |

---

## Search for slideshow

```
POST <baseURL>/slideshows/search/:page?
Authorization: Bearer ...
```

| Field     | Type    | Required | Matches |
| --------- | ------- | -------- | ------- |
| isVisible | boolean | no       |         |

### Response

#### On Success:

| Status | Field      | Type   |
| ------ | ---------- | ------ |
| 200    | slideshows | object |
|        | totalDocs  | int    |
|        | totalPages | int    |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Create slideshow

```
POST <baseURL>/slideshows/
Authorization: Bearer ...
```

| Field        | Type   | Required | Matches                                                                     |
| ------------ | ------ | -------- | --------------------------------------------------------------------------- |
| title        | string | yes      |                                                                             |
| description  | string | yes      |                                                                             |
| image        | file   | yes      |                                                                             |
| actionButton | object | no       | text,(redirectUrlInternal: { redirectType,redirectID}//redirectUrlExternal) |

### Response

#### On Success:

| Status | Field     | Type   |
| ------ | --------- | ------ |
| 200    | slideshow | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |

---

## Delete slideshow

```
DELETE <baseURL>/slideshows/:slideshowID
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

## Update slideshow

```
PATCH <baseURL>/slideshows/:slideshowID
Authorization: Bearer ...
```

| Field        | Type    | Required | Matches |
| ------------ | ------- | -------- | ------- |
| isVisible    | boolean | no       |         |
| title        | string  | no       |         |
| description  | string  | no       |         |
| image        | file    | no       |         |
| actionButton | object  | no       |         |

### Response

#### On Success:

| Status | Field     | Type   |
| ------ | --------- | ------ |
| 200    | slideshow | object |

#### On Error:

| Status | Field | Type   |
| ------ | ----- | ------ |
| 500    | error | string |
