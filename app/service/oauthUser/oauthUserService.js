const { WebClient } = require('@slack/client')

const handlers = {}

function * getUser (provider, accessToken) {
  if (!handlers[provider]) {
    throw new Error(`invalid provider ${provider}`)
  }

  return yield handlers[provider](accessToken)
}

module.exports.getUser = getUser

handlers.slack = function * slackHandler (accessToken) {
  const slackWeb = new WebClient(accessToken)

  const { user: userIdentity } = yield slackWeb.users.identity()

  return {
    id: `slack_${userIdentity.id}`,
    name: userIdentity.name,
    image: userIdentity.image_512
  }
}
