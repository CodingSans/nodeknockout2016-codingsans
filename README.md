# Node Knockout 2016
## Codingsans team

Welcome to our repository!

Here you can read what we wanted to build for the competition and how; what we experienced and what we actually built.

## Dstruct (pronounced: Destruct)

Dstruct would have been a destructive message service where you could have sent messages like in snapchat, except that you would have been sending these messages to public and/or private walls of the application.

Each message could have been accessed for a limited time, which could have been set by the user who sent the message.

Our main goal was to make this service accessible from Slack, like [Giphy](http://giphy.com/). Users could have sent Slack messages to other users in the given Slack, since you can delete messages there.

We had ideas about making a feature where you would have been able set your GeoLocation, and you could have watched the messages pop up on google maps, which would have been awesome to implement. Unfortunately, we only had time to implement the map.

Also, we could have implemented Facebook, Instagram (...etc) login as well, but we ran out of time :)

## How we were going to make this

We were going to use [Traefik](https://github.com/containous/traefik) as our reverse proxy, since we wanted to use `websocket` to serve our realtime API. Our application would have been a monolith `docker` container built on `Alpine Linux`. Our primary DB would have been a `MongoDB`. We were thinking about using `Redis` and `Varnish` as well; however, these were not parts of the main idea. `Rollbar` for our errors, `Papertrail` for our syslogs, `Newrelic` for monitoring.

We were going to use `Angular 2` and `Webpack` for frontend development.

So the user would have logged into the application using OAuth, after that he could have received realtime messages from the socket connection. The service would have been fast and reliable because of the QueryStream in MongoDB.

## So, what did we actually use?

Well, this was the first time we met `Engine Yard`. We had a lot of trouble with customizing our environment and deployment flow. We tried out a lot of things. If the competition would have been "Who can boot up the most instances in Engine Yard" we probably would have won that.

After long and tiring tryouts we decided to go with:
`HaProxy` as the main proxy service, `Nginx` because we felt like we can't really touch this component, `God` as our monitoring service, `REST API` instead of realtime messages, `Rollbar` and `Papertrail` for logs and errors, and a `MongoDB` provided by MongoLab.

However, the frontend was actually built on `Angular 2` and `Webpack`.

## Results?

Well, we have a... mockup? Something like that :) We did not have enough time to wire everything, thus people can only authorize with Slack into the application, and honestly that's all :) The next screen is not wired at all, but we think you can get the idea from it.

Take a look at it if you would like to: https://codingsans.2016.nodeknockout.com/

## Experiences with sponsor services

* `Engine Yard` - is a great service, but currently it is not easy to customize anything. There are a lot of documentation for different stacks; we couldn't really tell which is for which. Chef recipes are pretty much chaos at this point, due to the same issue. It took us about one and half days just to get to the point where we could say whatever, we have our deployment flow mostly ready, let's hope the instance wont die. We liked the idea, but customization and documentation are big pain points at the moment.

* `Rollbar` - 10/10 would use again

* `Papertrail` - Great service, we set up our bunyan syslog to log there, and it worked pretty smoothly.

## Experiences in general

We really enjoyed the competition and had a great time. Next time we should make a better plan which we can deliver :)
However, we learned and tried out some new stuff which is the most important thing for us! Thanks for the opportunity!

The support team on Slack was pretty quick in spite of the fact that everyone was having deployment issues, so thank you guys for that as well!

## Team members

[Akos Szokodi](https://www.linkedin.com/in/ákos-szokodi-14101486) - Frontend and Backend
[Laszlo 'Lacka' Csele](https://www.linkedin.com/in/lászló-csele-008754a5) - Frontend and Backend
[Gabor 'LaTotty' Toth](https://www.linkedin.com/in/latotty) - Backend and third party services
[Imre 'Rover' Racz](https://www.linkedin.com/in/imre-racz-a48a3095) - DevOps and third party services
