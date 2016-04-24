// Description:
//   Scripts related to Lurtz itself

export default (robot) => {
  robot.respond(/whom do you serve/i, (res) => {
    res.reply('SARUMAN!')
  })

  robot.respond(/who are you?/i, (res) => {
    res.reply('I am Lurtz - the first of Saruman\'s Uruk-hai to be bred, ' +
              'choking the first Orc I see to death within seconds of my birth.')
  })
}
