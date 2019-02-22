Weather Time App
===

This is a test app for Invisible Tech. Should allow a user to enter an array of location names or zip codes and return current time and weather.

#### Assumptions
* I'm going to limit myself to easily and freely available APIs.
* I'm going to try to stick to TypeScript even though I have very little experience with it because you guys seem invested in it :)
* I'm going to not spend a lot of time on this, which means there will probably be limited error-handling and not a ton of focus on scale or robustness.
* I'm probably going to build this for web and for console output. Not 100% sure yet.

#### How to use this thing
npm run prod 30340 Seattle 37405 36109

#### Limitations
* I salied past the two hour time limit so there's very little error-handling. Put in some unexpected inputs and it'll probably catch fire.
* I have little experience with TypeScript so I lost a few cycles trying to catch up there.

#### Extra feature
It was easier for me to test by having a web server running that took its locations array from browser input. So feel free to use http://localhost:8080/?location=30340&location=Seattle as an alternate interface.


