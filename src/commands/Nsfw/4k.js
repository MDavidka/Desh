// Dependecies
const { get } = require('axios'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class K4 extends Command {
	constructor(bot) {
		super(bot, {
			name: '4k',
			nsfw: true,
			dirname: __dirname,
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Look at NSFW images.',
			usage: '4k',
			cooldown: 3000,
		});
	}

	// Run command
	async run(bot, message, args, settings) {
		try {
			get('https://nekobot.xyz/api/image?type=4k')
				.then(res => {
					const embed = new MessageEmbed()
						.setImage(res.data.message);
					message.channel.send(embed);
				});
		} catch (err) {
			console.log(err);
			if (bot.config.debug) bot.logger.error(`${err.message} - command: 4k.`);
			message.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));
			if (message.deletable) message.delete();
		}
	}
};
