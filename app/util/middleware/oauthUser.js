'use strict'

const _ = require('lodash')
const Boom = require('boom')

const oauthUserService = require('../../service/oauthUser/oauthUserService')

function * oauthUser (next) {
  const provider = _.get(this.session, 'oauth.provider')
  const accessToken = _.get(this.session, 'oauth.accessToken')
  this.getUser = function * () {
    if (!provider || !accessToken) {
      throw Boom.unauthorized()
    }

    const user = yield oauthUserService.getUser(provider, accessToken)
    return user
  }
  yield next
}

module.exports.oauthUser = oauthUser
