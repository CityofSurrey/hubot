# Lurtz

[![Circle CI](https://circleci.com/gh/cityofsurrey/lurtz.svg?style=svg&circle-token=88700927e722d21d1625f1ff699fb3561af50d2b)](https://circleci.com/gh/cityofsurrey/lurtz)
<a href="https://codeclimate.com/github/CityofSurrey/lurtz"><img src="https://codeclimate.com/github/CityofSurrey/lurtz/badges/gpa.svg" /></a>

Lurtz is a chat bot built using a Hubot framework.

### Running Lurtz Locally

You can test your hubot by running the following, however some plugins will not
behave as expected unless the environment variables they rely upon have been set.

You can start Lurtz locally by running:

    $ bin/hubot

Then you can interact with Lurtz by typing `lurtz help`.

    lurtz> lurtz help

### Environment Variables

All environment variables are **required**.

| Variable | Description |
| -------- | ----------- |
| `HUBOT_SLACK_TOKEN` | API token for the Slack user. |
| `DOCKER_USERNAME` | Username for Dockercloud API. |
| `DOCKER_PASSWORD` | API key for Dockercloud API. |
| `LANDSCAPE_API_KEY` | API key for Landscape API. |
| `LANDSCAPE_API_SECRET` | API secret for Landscape API. |

### Volumes

In order for Lurtz to run docker containers required by **landscape-node**, you need to specify following volumes when running a container:

- `/var/run/docker.sock:/var/run/docker.sock`
- `$(which docker):/usr/bin/docker`