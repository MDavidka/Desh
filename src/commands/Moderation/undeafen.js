module.exports.run = async (bot, message, args, emojis, settings) => {
	// Delete message
	if (settings.ModerationClearToggle & message.deletable) message.delete();
	// Check if user has deafen permission
	if (!message.member.hasPermission('DEAFEN_MEMBERS')) return message.error(settings.Language, 'USER_PERMISSION', 'DEAFEN_MEMBERS').then(m => m.delete({ timeout: 10000 }));


	// Check if bot has permission to ban user
	if (!message.guild.me.hasPermission('DEAFEN_MEMBERS')) {
		bot.logger.error(`Missing permission: \`DEAFEN_MEMBERS\` in [${message.guild.id}].`);
		return message.error(settings.Language, 'MISSING_PERMISSION', 'DEAFEN_MEMBERS').then(m => m.delete({ timeout: 10000 }));
	}

	// Checks to make sure user is in the server
	const user = bot.GetUser(message, args);
	if (!user) {
		return message.error(settings.Language, 'MISSING_USER').then(m => m.delete({ timeout: 10000 }));
	}
	try {
		await user.voice.setDeaf(false);
		message.success(settings.Language, 'MODERATION/SUCCESSFUL_UNDEAFEN', [user.user.username, user.user.discriminator]).then(m => m.delete({ timeout: 3000 }));
	} catch (err) {
		if (bot.config.debug) bot.logger.error(`${err.message} - command: undeafen.`);
	}
};

module.exports.config = {
	command: 'undeafen',
	aliases: ['undeaf', 'un-deafen'],
	permissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'DEAFEN_MEMBERS'],
};

module.exports.help = {
	name: 'Undeafen',
	category: 'Moderation',
	description: 'Undeafen a user.',
	usage: '${PREFIX}undeafen <user>',
	example: '${PREFIX}undeafen @NoseyUser',
};
