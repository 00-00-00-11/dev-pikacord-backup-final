const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const { get } = require("request-promise-native");

module.exports={
  name: "addredeem",  
  description: "clears your balance",
  usage: "+bal",
  run: async(bot,message,args) => {
    if(!["223214332995960833", "324094776049795072", "566851016910438400", "253973130941431818", "237723768070471691"].includes(message.author.id)) return message.channel.send("You don't have permission!");
    let user = message.mentions.users.first().id
    if(!user) return message.channel.send("Please mention someone!")
    if(!args[1]) return message.channel.send("Please specify the amount of redeem you want to add!")
    let amount = args[1]
    db.add(`redeem_` + user, amount)
    if(amount > 1) {
      message.channel.send(`A total of **${amount}** Redeems have been sent to **${message.mentions.users.first().username}**`)
    }else{
      message.channel.send(`**${amount}** Redeem has been sent to **${message.mentions.users.first().username}**`)
    }
  }
}