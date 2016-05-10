// Description:
//   Lurtz deploys apps to different environments
//
// Dependencies:
//   None
//
// Configuration:
//   DOCKER_USERNAME
//   DOCKER_PASSWORD
//   LANDSCAPE_API_KEY
//   LANDSCAPE_API_SECRET
//
// Commands:
//   lurtz what can i/you deploy - shows what apps can be deployed
//   lurtz where can i/you deploy <app> - shows where app can be deployed
//   lurtz deploy <app> to <env> - deploys app to the environment
//

import DockerCloud from 'dockercloud'
import Landscape from 'landscape-node'

const DOCKER_USERNAME = process.env.DOCKER_USERNAME
const DOCKER_PASSWORD = process.env.DOCKER_PASSWORD

const dockercloud = new DockerCloud(DOCKER_USERNAME, DOCKER_PASSWORD)
const landscape = new Landscape()

const apps = [
  {
    id: 'lurtz',
    name: 'Lurtz',
    environments: [
      { id: 'production' },
    ],
    infra: 'dockercloud',
  },
  {
    id: 'mysurrey',
    name: 'MySurrey',
    environments: [
      { id: 'integration', script: 4547 },
      { id: 'test', script: 4539 },
    ],
    infra: 'landscape',
  },
]

const validSlug = '([-_\\.0-9a-z]+)'

export default (robot) => {
  const whatDeployRegex = new RegExp('what can (i|you) deploy', 'i')
  robot.respond(whatDeployRegex, (res) => {
    const output = apps
      .map(x => `*${x.name}* to ${x.environments.map(y => y.id).join(', ')}`)
      .join('\n')

    res.send(output)
  })

  const whereDeployRegex = new RegExp(`where can (?:i|you) deploy ${validSlug}`, 'i')
  robot.respond(whereDeployRegex, (res) => {
    const appId = res.match[1].toLowerCase()
    const app = apps.find(x => x.id === appId)
    if (!app) {
      return res.send(`Bah! I do not know *${appId}* app`)
    }
    const environments = app.environments.map(x => x.id).join(', ')

    return res.send(environments)
  })

  const deployRegex = new RegExp(`deploy\\s${validSlug}\\sto\\s${validSlug}`, 'i')
  robot.respond(deployRegex, async (res) => {
    // validating params
    const appId = res.match[1].toLowerCase()
    const app = apps.find(x => x.id === appId)
    if (!app) {
      return res.send(`Bah! I do not know *${appId}* app`)
    }
    const environmentId = res.match[2].toLowerCase()
    const environment = app.environments.find(x => x.id === environmentId)
    if (!environment) {
      return res.send(`Bah! I do not know *${environmentId}* environment`)
    }

    if (app.infra === 'landscape') {
      try {
        res.send(`I am deploying *${app.name}* to *${environment.id}* environment...`)
        const activity = await landscape.scripts.execute(environment.script, 'testmysurrey-all')
        activity.on('done', (status) => {
          switch (status) {
            case 'failed':
              return res.send(`*${environment.id}* deployment of *${app.name}* failed`)

            case 'canceled':
            case 'succeeded':
            default:
              return res.send(`*${app.name}* is deployed to *${environment.id}* environment`)
          }
        })
      } catch (err) {
        return res.send(`*${environment.id}* deployment of *${app.name}* failed because of ${err}`)
      }
    } else {
      // redeploying
      try {
        await dockercloud.connect()
        const service = await dockercloud.services.findByName(app.id)
        if (!service) {
          return res.send(`Bah! App ${app.name} does not exist in ${environment.id} environment.`)
        }

        res.send(`I am deploying ${app.name} to ${environment.id} environment...`)
        const action = await dockercloud.services.redeploy(service)
        await dockercloud.actions.waitUntilSuccess(action)

        res.send(`${app.name} is deployed to ${environment.id} environment`)
      } catch (err) {
        res.send(`*${environment.id}* deployment of *${app.name}* failed because of ${err}`)
      } finally {
        dockercloud.disconnect()
      }
    }
  })
}
