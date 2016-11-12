<!-- TOC -->

- [/api/v1](#apiv1)
- [/api/v2](#apiv2)
  - [/api/v2/channel](#apiv2channel)
    - [GET /api/v2/channel](#get-apiv2channel)
    - [/api/v2/channel/:channelId](#apiv2channelchannelid)
      - [GET /api/v2/channel/:channelId](#get-apiv2channelchannelid)
      - [PUT /api/v2/channel/:channelId](#put-apiv2channelchannelid)
      - [/api/v2/channel/:channelId/message](#apiv2channelchannelidmessage)
        - [GET /api/v2/channel/:channelId/message](#get-apiv2channelchannelidmessage)
        - [POST /api/v2/channel/:channelId/message](#post-apiv2channelchannelidmessage)
          - [DELETE /api/v2/channel/:channelId/message/:messageId](#delete-apiv2channelchannelidmessagemessageid)

<!-- /TOC -->

# /api/v1

Reserved for Oauth and Slack

# /api/v2

## /api/v2/channel

### GET /api/v2/channel

Lists all public channels

GET `/api/v2/channel?q&s&l`

- `q` is the query string
- `s` is the skip (number)
- `l` is the limit, max 100 (number)

Returns: 200
```json
{
  "count": 1,  // found count
  "data": [    // limited results
    {
      "name": "general",
      "ownerName": "system",
      "lastMessageAt": "2016-11-12T14:02:20.804Z"
    }
  ]
}
```

### /api/v2/channel/:channelId

#### GET /api/v2/channel/:channelId

Info about channel

GET `/api/v2/channel/:channelId`

- `channelId` is the id of the channel (string)

Returns: 200
```json
{
  "count": 1,  // found count
  "data": [    // limited results
    {
      "name": "general",
      "ownerName": "system",
      "lastMessageAt": "2016-11-12T14:02:20.804Z"
    }
  ]
}
```

#### PUT /api/v2/channel/:channelId

Info about channel

PUT `/api/v2/channel/:channelId`

- `channelId` is the id of the channel (string)

Body: 
```json
{
  "visibility": "public"
}
```

Returns: 204

#### /api/v2/channel/:channelId/message

##### GET /api/v2/channel/:channelId/message

Lists all public channels

GET `/api/v2/channel/:channelId/message?s&l`

- `channelId` is the id of the channel (string)
- `s` is the skip (number)
- `l` is the limit, max 100 (number)

Returns: 200
```json
{
  "count": 1,  // found count
  "data": [    // limited results
    {
      // message content
    }
  ]
}
```


##### POST /api/v2/channel/:channelId/message

Posts new message into the channel

GET `/api/v2/channel/:channelId/message?s&l`

- `channelId` is the id of the channel (string)
- `s` is the skip (number)
- `l` is the limit, max 100 (number)

Returns: 201


###### DELETE /api/v2/channel/:channelId/message/:messageId

Removes a message

DELETE `/api/v2/channel/:channelId/message/:messageId`

- `channelId` is the id of the channel (string)
- `messageId` is the id of the message (string)

Returns: 204
