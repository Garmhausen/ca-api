# Api Documentation

A summary of information around each endpoint.

## Common Error Response

This is a common error structure pattern implemented in all endpoints.

**Condition** : If there was a service error in the database or other backend layers, it may bubble up to the Api response.

**Code** : `400 BAD REQUEST`

**Content Example**

```json
"There was an error: [error message]"
```

<br><br><br>

# Heartbeat

This call is designed to test the service, make sure it's up and responding.

<br>

<details>
<summary>
GET /heartbeat
</summary>

**Method** : `GET`

**Auth required** : no

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "name": "tbd",
  "vitals": {}
}
```

## Error Response

**Condition** : If the server is down or unresponsive, then the call will time out.
</details>

<br><br><br>

# Me

Returns name and email of the user currently logged in.

<br>

<details>
<summary>
GET /me
</summary>

**Method** : `GET`

**Auth required** : yes

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "authToken": {
      "access_token": "<an encrypted token>",
      "expires_in": "3600000"
    },
    "data": {
      "user": {
        "name": "Bruce Wayne",
        "email": "batman@justiceleague.com",
        "permissions": [
            "USER"
        ]
      }
    }
}
```

## Error Response

**Condition** : If the user is not logged in or has an invalid token.

**Code** : `400 BAD REQUEST`

**Content example**

```json
"Not logged in"
```
</details>

<br><br><br>

# Account

This is where a user can sign in, sign up, or log out.

<br>
<details>
<summary>
POST /account/signup
</summary>

**Method** : `POST`

**Auth required** : no

**Data constraints**

```json
{
  "name": "[non-empty string]",
  "email": "[valid email address]",
  "password": "[valid password in plain text, 8-24 characters, at least one number, uppercase, lowercase, and symbol]",
  "confirmPassword": "[valid matching password in plain text]"
}
```

**Data example**

```json
{
  "name": "Bruce Wayne",
  "email": "batman@justiceleague.com",
  "password": "DarkKnight39!",
  "confirmPassword": "DarkKnight39!"
}
```

## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
    "authToken": {
      "access_token": "<an encrypted token>",
      "expires_in": "3600000"
    },
    "data": {
      "user": {
        "name": "Bruce Wayne",
        "email": "batman@justiceleague.com",
        "permissions": [
            "USER"
        ]
      }
    }
}
```

## Error Response

**Condition** : Validation failure

**Code** : `422 UNPROCESSABLE ENTITY`

**Content example**

```json
{
    "errors": [
        {
            "value": "batman@justiceleague.com",
            "msg": "Email is already in use",
            "param": "email",
            "location": "body"
        },
        {
            "value": "DarkKnight39",
            "msg": "Password must contain at least one uppercase letter, one lowercase letter, and one symbol",
            "param": "password",
            "location": "body"
        }
    ]
}
```
</details>

<br>

<details>
<summary>
POST /account/signin
</summary>

**Method** : `POST`

**Auth required** : no

**Data constraints**

```json
{
  "email": "[valid email]",
  "password": "[password in plain text]"
}
```

**Data example**

```json
{
  "email": "batman@justiceleague.com",
  "password": "DarkKnight39!"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "authToken": {
      "access_token": "<an encrypted token>",
      "expires_in": "3600000"
    },
    "data": {
      "user": {
        "name": "Bruce Wayne",
        "email": "batman@justiceleague.com",
        "permissions": [
            "USER"
        ]
      }
    }
}
```

## Error Response

**Condition** : If the email or password is incorrect or if the user doesn't exist.

**Code** : `400 BAD REQUEST`

**Content example**
```json
"Invalid username or password!"
```
</details>

<br>

<details>
<summary>
POST /account/signout
</summary>

**Method** : `POST`

**Auth required** : no

**Data constraints**

none

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "message": "Goodbye!"
}
```

## Error Response

None.  This call will always succeed and always trigger removal of the auth token from the headers if it exists.
</details>

<br>

<details>
<summary>
POST /account/requestreset
</summary>

**Method** : `POST`

**Auth required** : no

**Data constraints**

```json
{
  "email": "[valid email]",
}
```

**Data example**

```json
{
  "email": "batman@justiceleague.com"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "message": "Email sent!",
    "data": {
      "email": "batman@justiceleague.com",
      "mailResult": "<nodemailer mail result object>"
    }
}
```

## Error Response

**Condition** : If the email doesn't belong to a user.

**Code** : `400 BAD REQUEST`

**Content example**
```json
"No user found for email <email>!"
```
</details>

<br>

<details>
<summary>
POST /account/resetpassword
</summary>

**Method** : `POST`

**Auth required** : no

**Data constraints**

```json
{
  "resetToken": "[valid resetToken]",
  "password": "[valid password in plain text, 8-24 characters, at least one number, uppercase, lowercase, and symbol]",
  "confirmPassword": "[valid matching password in plain text]"
}
```

**Data example**

```json
{
  "resetToken": "<valid resetToken>",
  "password": "DarkKnight39!",
  "confirmPassword": "DarkKnight39!"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "authToken": {
      "access_token": "<an encrypted token>",
      "expires_in": "3600000"
    },
    "data": {
      "user": {
        "name": "Bruce Wayne",
        "email": "batman@justiceleague.com",
        "permissions": [
            "USER"
        ]
      }
    }
}
```

## Error Response

**Condition** : Invalid resetToken

**Code** : `400 BAD REQUEST`

**Content example**

```json
"This token is invalid or expired!"
```

Also

**Condition** : Validation failure

**Code** : `422 UNPROCESSABLE ENTITY`

**Content example**

```json
{
    "errors": [
        {
            "value": "DarkKnight39",
            "msg": "Password must contain at least one uppercase letter, one lowercase letter, and one symbol",
            "param": "password",
            "location": "body"
        }
    ]
}
```
</details>

<br><br><br>

# Client

This is where a user can add/update/list/remove clients to/from their account.
The newly created client will be associated with the user via the authToken provided.

<br>

<details>
<summary>
GET /client
</summary>

**Method** : `GET`

**Auth required** : yes

**Data constraints**

```json
{
  "name": "[non-empty string]"
}
```

**Data example**

```json
{
  "name": "Commissioner James Gordon",
  "email": "jgordon@gcpd.gov",
  "phone": "123-456-7890",
  "address1": "123 Main St",
  "address2": "Suite 404",
  "address3": "Major Crimes Unit",
  "city": "Gotham",
  "stateProvince": "NY",
  "postalCode": "12345",
  "notes": "But we’ve met before. That was a long time ago, I was a kid at St. Swithin’s, It used to be funded by the Wayne Foundation. It’s an orphanage. My mum died when I was small, it was a car accident. I don’t remember it. My dad got shot a couple of years later for a gambling debt. Oh I remember that one just fine. Not a lot of people know what it feels like to be angry in your bones. I mean they understand. The fosters parents. Everybody understands, for a while. Then they want the angry little kid to do something he knows he can’t do, move on. After a while they stop understanding. They send the angry kid to a boy’s home, I figured it out too late. Yeah I learned to hide the anger, and practice smiling in the mirror. It’s like putting on a mask. So you showed up this one day, in a cool car, pretty girl on your arm. We were so excited! Bruce Wayne, a billionaire orphan? We used to make up stories about you man, legends and you know with the other kids, that’s all it was, just stories, but right when I saw you, I knew who you really were. I’d seen that look on your face before. It’s the same one I taught myself. I don’t why you took the fault for Dent’s murder but I’m still a believer in the Batman. Even if you’re not…"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "authToken": {
      "access_token": "<an encrypted token>",
      "expires_in": "3600000"
    },
    "data": {
      "client": {
        "city": "Gotham",
        "name": "Commissioner James Gordon",
        "updatedAt": "<DateTime>",
        "email": "jgordon@gcpd.gov",
        "address3": "Major Crimes Unit",
        "address2": "Suite 404",
        "postalCode": "12345",
        "stateProvince": "NY",
        "id": "<client identifier>",
        "address1": "123 Main St",
        "createdAt": "<DateTime>",
        "phone": "123-456-7890",
        "notes": "But we’ve met before. That was a long time ago, I was a kid at St. Swithin’s, It used to be funded by the Wayne Foundation. It’s an orphanage. My mum died when I was small, it was a car accident. I don’t remember it. My dad got shot a couple of years later for a gambling debt. Oh I remember that one just fine. Not a lot of people know what it feels like to be angry in your bones. I mean they understand. The fosters parents. Everybody understands, for a while. Then they want the angry little kid to do something he knows he can’t do, move on. After a while they stop understanding. They send the angry kid to a boy’s home, I figured it out too late. Yeah I learned to hide the anger, and practice smiling in the mirror. It’s like putting on a mask. So you showed up this one day, in a cool car, pretty girl on your arm. We were so excited! Bruce Wayne, a billionaire orphan? We used to make up stories about you man, legends and you know with the other kids, that’s all it was, just stories, but right when I saw you, I knew who you really were. I’d seen that look on your face before. It’s the same one I taught myself. I don’t why you took the fault for Dent’s murder but I’m still a believer in the Batman. Even if you’re not…"
        }
    }
}
```

## Error Response

**Condition** : Validation failure

**Code** : `422 UNPROCESSABLE ENTITY`

**Content example**

```json
{
    "errors": [
        {
            "msg": "Name must not be empty",
            "param": "name",
            "location": "body"
        }
    ]
}
```
</details>
