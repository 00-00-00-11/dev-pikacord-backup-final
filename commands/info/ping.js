const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const { get } = require("request-promise-native");

module.exports = {
  name: "ping",
  description: "clears your balance",
  usage: "+bal",
  run: async (bot, message, args) => {
    
    let m = new MessageEmbed()
    .setAuthor("Checking ping...")
    .setColor("#6766F6")
    let mes = await message.channel.send(m)
    
    let m2 = new MessageEmbed()
    .setAuthor(`Your Latency - ${Date.now() - message.createdTimestamp}ms | Bot Latency - ${Math.round(bot.ws.ping)}ms`)
    .setColor("#6766F6")
    
    setTimeout(() => {
      
      mes.edit(m2)
      
    }, 4500)
    
  }
}