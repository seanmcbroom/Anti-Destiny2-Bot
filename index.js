const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: new Intents([
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES
    ])
});

client.on('ready', () => {
    const Check = () => {
        client.guilds.cache.forEach(async guild => {
            guild.members.fetch({ force: true, withPresences: true })
                .then((members) => {
                    members.forEach((member) => {
                        if (member.presence && member.presence.activities) {
                            member.presence.activities.forEach(activity => {
                                if (activity.name.toLowerCase() == "valorant") {
                                    member.voice.disconnect()
                                        .catch(console.log);
                                }
                            })
                        }
                    });
                })
                .catch(console.error);
        });
    };

    Check();
    setInterval(Check, 5 * 60 * 1000);
});

client.login(require('./settings').Key); // Bot Token