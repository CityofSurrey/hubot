// Description:
//   Lurtz responds any thank message in orc way:
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   lurtz thank[s] [you] - Lurtz accepts your thanks
//   thanks lurtz - Lurtz accepts your thanks
//

const responses = [
  'pwaaaa (spitting on the floor)',
  'not a problem',
  'at your command',
  'bah!',
  'sure thing',
  'aargh!',
  'you owe me, human',
  'get off my sight',
  'ha!',
]

export default (robot) => {
  robot.respond(/thank(s| you)/i, (res) => {
    res.send(res.random(responses))
  })

  const thanks = new RegExp(`thank(s| you) @?${robot.name}`, 'i')
  robot.hear(thanks, (res) => {
    res.send(res.random(responses))
  })
}
