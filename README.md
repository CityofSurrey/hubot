# Lurtz

[![Circle CI](https://circleci.com/gh/CityofSurrey/lurtz.svg?style=svg&circle-token=88700927e722d21d1625f1ff699fb3561af50d2b)](https://circleci.com/gh/CityofSurrey/lurtz)
<a href="https://codeclimate.com/github/CityofSurrey/lurtz"><img src="https://codeclimate.com/github/CityofSurrey/lurtz/badges/gpa.svg" /></a>

Lurtz is a chat bot built using a Hubot framework.

### Running Lurtz Locally

You can test your hubot by running the following, however some plugins will not
behave as expected unless the environment variables they rely upon have been set.

You can start Lurtz locally by running:

    $ bin/hubot

You'll see some start up output and a prompt:

    [Sat Feb 28 2015 12:38:27 GMT+0000 (GMT)] INFO Using default redis on localhost:6379
    lurtz>

Then you can interact with Lurtz by typing `lurtz help`.

    lurtz> lurtz help
    ...

### Configuration

A few scripts (including some installed by default) require environment
variables to be set as a simple form of configuration.

Each script should have a commented header which contains a "Configuration"
section that explains which values it requires to be placed in which variable.

How to set environment variables will be specific to your operating system.
Rather than recreate the various methods and best practices in achieving this,
it's suggested that you search for a dedicated guide focused on your OS.
