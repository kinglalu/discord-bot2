module.exports = {
    name: 'hey',
    description: "this is a ping command!",
    if (message.content === '-hey') {
	message.channel.send('hey');
}
}

