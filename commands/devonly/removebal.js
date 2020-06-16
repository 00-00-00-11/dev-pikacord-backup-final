const { MessageEmbed } = require('discord.js');
var mysql = require('mysql');
let sql;
const db = require(`quick.db`)
module.exports = {
  name: "removebal",
  description: "Shows the targets balance",
  usage: "bal <user>",
  run: async(bot, message, args, con) => {
    
    if(!["223214332995960833", "566851016910438400", "253973130941431818", "324094776049795072", "237723768070471691"].includes(message.author.id)) return message.channel.send("You don't have permission!");
    
    let user = message.mentions.users.first().id
    
    let balance = db.fetch(`balance_` + user)
    
    function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    
    
    if(!user) return message.channel.send("Please specify a user!")
    if(!args[1]) return message.channel.send("Please specify the amount!")
    
    message.channel.send(`A total of **${numberWithCommas(args[1])} Shards** has been taken from **${message.mentions.users.first().username}** <a:verify:719769605714739281>`)
    db.set(`balance_` + user, balance-args[1])
    
  }
}