# Welcome to Dstruct



## Development

Dependencies needed for the project:
* Docker - https://www.docker.com/
* Rocker - https://github.com/grammarly/rocker
* Rocker-compose - https://github.com/grammarly/rocker-compose

### Docker

You can define `NODE_ENV` in your application, after that, this will be the main tag of your created image.

`npm run compose` - Will build and set up a full server with mongo.
Variables you can define for it:
* `NODE_ENV` - Name of the img tag of the application
* `BUILD_ALWAYS` - Indicates if the img should be rebuilt everytime the compose goes up.

`npm run rocker` - Will build a new img for you without starting a compose. The tag of the img is still dependent on your `NODE_ENV`
