try {
  console.log('\x1b[36m%s\x1b[0m', 'Trying to checkout package.json & package-lock.json from TFS')

  let tfs = require('tfs')
  tfs('checkout', ['./package.json', './package-lock.json'], null, (errorResponse, response) => {
    if (errorResponse) { console.log('\x1b[31m%s\x1b[0m', `ERROR: ${errorResponse.error}`) }
    if (response) { console.log('\x1b[32m%s\x1b[0m', `SUCCESS: ${response.command}`) }
  })
} catch (error) {
  if (error) {
    console.log('\x1b[31m%s\x1b[0m', `${error.message}`)
    if (error.message === `Cannot find module 'tfs'`) {
      console.log('\x1b[33m%s\x1b[0m', `This is OK, 'tfs' will be installed and this and this error will not occur again`)
    }
  }
}
