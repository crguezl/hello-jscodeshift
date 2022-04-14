module.exports = async () => {
    // When in raw mode, input is always available character-by-character, not including modifiers.
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false)
      resolve()
    }))
}
  