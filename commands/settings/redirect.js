const { MessageEmbed } = require("discord.js");
const { v4: uuidv4 } = require("uuid");
const db = require("quick.db");
const ms = require("ms");
const talkedRecently = new Set();
const { get } = require("request-promise-native");
const fs = require("fs");
module.exports = {
  name: "redirect",
  description: "Show list of help commands",
  usage: "help [command]",
  run: async (bot, message, args, reaction) => {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need ``ADMINISTRATOR`` permission to execute this command!")
    
    let redirect = db.fetch(`redirect_` + message.guild.id)
    
    if(redirect === false || redirect === null) {
      
      if(!message.mentions.channels.first().id) return message.channel.send(`Please mention a channel!`)
      db.set(`redirect_` + message.guild.id, message.mentions.channels.first().id)
      message.channel.send(`**All spawns has been redirected to** <#${message.mentions.channels.first().id}> <a:verify:719412406090203206>`)
      
    }else{
      
      message.channel.send(`**Redirect has been disabled** <a:verify:719412406090203206>`)
      return db.set(`redirect_` + message.guild.id, false)
      
    }
    
  }
}