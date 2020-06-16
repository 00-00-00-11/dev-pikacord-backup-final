const {MessageEmbed} = require('discord.js')
const ms = require('ms');
let db = require('quick.db')
module.exports={
    name: 'giveaway',
    description: 'Create a simple giveaway',
    usage: '<time> <channel> [link] <prize>',
    run: async(bot,message,args)=>{
        
        String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
        
        if(!["223214332995960833", "615919285058928661", "566851016910438400", "253973130941431818"].includes(message.author.id)) return message.channel.send("You don't have permission!");
        if(!args[0]) return message.channel.send(`You did not specify your time!`)
        if(!args[0].endsWith("d")&&!args[0].endsWith("h")&&!args[0].endsWith("m")) return message.channel.send(`**Usage :** -giveaway <time> <channel> <prize>`)
        if(isNaN(args[0][0])) return message.channel.send(`That is not a number!`)
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(`Invalid channel!`)
        let prize = args.slice(2).join(" ")
        if(!prize) return message.channel.send(`You need to specify the prize!`)
        message.channel.send(`**Giveaway has been created in ${channel} 🎁**`)
        bot.channels.cache.get(channel.id).send(`<a:gift:719448902331269192> **NEW GIVEAWAY** <a:gift:719448902331269192>`)
        let Embed = new MessageEmbed()
        .setAuthor('New Giveaway, React with 🎁 to join!')
        .setDescription(`<a:gift:719448902331269192> • **${prize.capitalize()}**\n<a:verify:719412406090203206> • **<@${message.author.id}>**`)
        .setTimestamp(Date.now()+ms(args[0]))
        .setColor(`#6766F6`)
        let m = await channel.send(Embed)
        m.react("🎁")
        setTimeout(() => {
            if(m.reactions.cache.get("🎁").count<=1){
                return message.channel.send(`**Not enough participant!**`)
            }
            let winner = m.reactions.cache.get("🎁").users.cache.filter(u=>!u.bot).random()
            channel.send(`**Cogratulation to ${winner} for winning the ${prize} giveaway!**`)
            db.push(`pokemon_` + winner.id, prize.toLowerCase())
          db.set(`latestPokemon` + message.author.id, prize.toLowerCase())
        }, ms(args[0]));
    }
}