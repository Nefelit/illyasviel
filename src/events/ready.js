module.exports = () => {
    let client = require('../../core/index');
    console.log(client.user.tag)
    client.generateInvite().then(console.log)
}