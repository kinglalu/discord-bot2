module.exports = {
    name: 'hey',
    description: "this is a ping command!",
    execute(message, args){
        message.channel.send('hey');
    }
}
