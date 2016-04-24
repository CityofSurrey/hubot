import { expect } from 'chai'
import Helper from 'hubot-test-helper'

const helper = new Helper('../scripts/thank-you.js')

describe('thank-you script', () => {
  let room

  beforeEach(() => {
    room = helper.createRoom()
  })

  afterEach(() => {
    room.destroy()
  })

  it('should reply when user says "@bot thank you"', () => {
    return room.user.say('saruman', '@hubot thank you').then(() => {
      expect(room.messages[1][0]).to.equal('hubot')
      expect(room.messages[1][1]).not.to.equal('')
    })
  })

  it('should reply when user says "@bot thanks"', () => {
    return room.user.say('saruman', '@hubot thanks').then(() => {
      expect(room.messages[1][0]).to.equal('hubot')
      expect(room.messages[1][1]).not.to.equal('')
    })
  })

  it('should reply when user says "thanks bot"', () => {
    return room.user.say('saruman', 'thanks hubot').then(() => {
      expect(room.messages[1][0]).to.equal('hubot')
      expect(room.messages[1][1]).not.to.equal('')
    })
  })

  it('should reply when user says "thanks @bot"', () => {
    return room.user.say('saruman', 'thanks @hubot').then(() => {
      expect(room.messages[1][0]).to.equal('hubot')
      expect(room.messages[1][1]).not.to.equal('')
    })
  })

  it('should reply when user says "thank you bot"', () => {
    return room.user.say('saruman', 'thank you hubot').then(() => {
      expect(room.messages[1][0]).to.equal('hubot')
      expect(room.messages[1][1]).not.to.equal('')
    })
  })

  it('should reply when user says "thank you @bot"', () => {
    return room.user.say('saruman', 'thank you @hubot').then(() => {
      expect(room.messages[1][0]).to.equal('hubot')
      expect(room.messages[1][1]).to.equal('')
    })
  })
})
