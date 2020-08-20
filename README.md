# Chat Server

A very basic in-memory back-end for storing and retreiving chat messages. There is no
authentication. This is purely for educational purposes.

The server uses JSON to send and receive information.

You may use the following URL to access the API: `http://chat.codefriends.larner.com`.

## Endpoints

The server has two endpoints: one to store new messages and another to retreive messages.

### Store messages

`POST /message`

#### Fields

- `message` (string, required) the message that should be stored on the server.
- `user` (string, required) the username of the message creator

#### Example

```
{
    "message": "hello world!",
    "user": "anonymous123"
}
```

### Retrieve messages

`GET /messages`

#### Fields

- `afterId` (integer, optional) only return messages that were created after this id. If this value is not specified then all messages will be returned.

#### Example

`GET /messages?afterId=7`

```
[
  {
    "id": 8,
    "user": "aaron",
    "message": "hello world!",
    "createdAt": "2020-08-20T18:16:05.822Z"
  },
  {
    "id": 9,
    "user": "anonymous123",
    "message": "hi aaron!",
    "createdAt": "2020-08-20T18:36:05.822Z"
  }
]
```

## Setting up a development environment

- `git clone https://github.com/alarner/chat-server.git`
- `cd chat-server`
- `npm i`

## Running in development mode

- `npm run dev`

## Running in production

- `npm start`
