const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
module.exports={
  name: "pay",  
  description: "Pay a user",
  usage: "pay <user> <amount>",
  run: async(bot,message,args,con) => {
    
    let user = message.mentions.users.first()
    
    let balance = db.fetch(`balance_` + message.author.id)
    let userbal = db.fetch(`balance_` + user.id)
    
    if(!args[0]) return message.channel.send(`Please mention a user!`)
    if(!args[1]) return message.channel.send(`Please specify the amount you want to pay!`)
    
    if(balance < args[1]) return message.channel.send(`You don't have enough money to pay **${user.username}** ${args[1]} Shards!`)
    
    let Embed = new MessageEmbed()
    .setDescription(`You are about to pay **${user.username}** ${args[1]} Shards!\nReply with ` + "``.confirm`` or ``.cancel`` to proceed.")
    .setColor("#6766F6")
    message.channel.send(Embed)
    message.channel.awaitMessages(m => m.author.id === message.author.id && m.content.toLowerCase() === ".confirm" || m.content.toLowerCase() === ".cancel", {max: 1,time: 120000,error: ["time"]})
    .then(collected => {
      
      if(collected.first().content.toLowerCase() === ".confirm") {
        
        let Embed = new MessageEmbed()
        .setAuthor(`${message.author.username} ➜ ${user.username}`)
        .setDescription(`Money has been transferred to **${user.username}**`)
        .setColor("#6766F6")
        message.channel.send(Embed)
        db.add(`balance_` + user.id, args[1])
        db.set(`balance_` + message.author.id, balance-args[1])
        
      }
      
      if(collected.first().content.toLowerCase() === ".cancel") {
        
        return message.channel.send(`Operation has been cancelled!`)
        
      }
      
    })
    
  }
}