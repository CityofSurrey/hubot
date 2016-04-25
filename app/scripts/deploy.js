// Description:
//   Lurtz deploys apps to different environments
//
// Dependencies:
//   None
//
// Configuration:
//   DOCKER_USERNAME
//   DOCKER_PASSWORD
//
// Commands:
//   lurtz deploy <app> to <env> - deploys <app> app to the <env> environment
//

import DockerCloud from 'dockercloud'

const DOCKER_USERNAME = process.env.DOCKER_USERNAME
const DOCKER_PASSWORD = process.env.DOCKER_PASSWORD

const dockercloud = new DockerCloud(DOCKER_USERNAME, DOCKER_PASSWORD)

const apps = [
  {
    name: 'lurtz',
    environments: ['production'],
  },
]

const validSlug = '([-_\\.0-9a-z]+)'
const deployRegex = new RegExp(`deploy\\s${validSlug}\\sto\\s${validSlug}`, 'i')

export default (robot) => {
  robot.respond(deployRegex, async (res) => {
    // validating params
    const appName = res.match[1].toLowerCase()
    const app = apps.find(x => x.name === appName)
    if (!app) {
      return res.send(`Bah! I do not know ${appName} app`)
    }
    const env = res.match[2].toLowerCase()
    if (!app.environments.includes(env)) {
      return res.send(`Bah! I do not know ${env} environment`)
    }

    // redeploying
    try {
      await dockercloud.connect()
      const service = await dockercloud.services.findByName(app.name)
      if (!service) {
        return res.send(`Bah! App ${appName} does not exist in ${env} environment.`)
      }

      res.send(`I am deploying ${app.name} to ${env} environment...`)
      const action = await dockercloud.services.redeploy(service)
      await dockercloud.actions.waitUntilSuccess(action)

      res.send(`${app.name} is deployed to ${env} environment`)
    } catch (err) {
      res.send(`${env} deployment of ${app.name} failed because of ${err}`)
    } finally {
      return dockercloud.disconnect()
    }
  })
}
