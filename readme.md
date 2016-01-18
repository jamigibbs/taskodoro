# Taskodoro

A time management and task list app based on the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) using AngularJS, Firebase, and Foundation for Apps.

### How it works

This app will allow you to start at *25-minute work session*.

You'll only be able to start a *5-minute break* after each completed work session.

Once you've completed four work sessions, you'll then be given a *30-minute break* timer.

The app will also allow you to keep a record of completed tasks.

![Taskodoro](http://d.pr/i/12Bf9+)

### Installation

To use on in your local environment:

Clone this repo and cd into the directory:

`git clone git@github.com:jamigibbs/taskodoro.git`
`cd taskodoro`

The first time you run the app, you'll need to install the required packages:

`npm install`

Thereafter, you'll simply want to start npm with:

`npm start`

You'll be able to view your app in your browser at http://localhost:8079.

### Todo

* Allow users to create and authenticate accounts using AngularFire's Authentication API
* Deploy to Heroku or similar

### Credits

* Foundation for Apps, http://foundation.zurb.com/apps.html, (C) 1998‐2015 ZURB, Inc., [MIT](https://opensource.org/licenses/MIT)

* Buzz HTML5 Audio library, http://buzz.jaysalvat.com/, (C) 2015 Jay Salvat, [MIT](https://opensource.org/licenses/MIT)

* Elevator Ding Sound, break-ding.mp3 http://soundbible.com/1441-Elevator-Ding.html, (C) 2010-2015 Corsica, [Sampling Plus 1.0](https://creativecommons.org/licenses/sampling+/1.0/)

* Air Plane Ding Sound, work-ding.mp3 http://soundbible.com/1424-Air-Plane-Ding.html, (C) 2010-2015 Corsica, [Sampling Plus 1.0](https://creativecommons.org/licenses/sampling+/1.0/)
