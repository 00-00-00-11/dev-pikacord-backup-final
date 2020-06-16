const { MessageEmbed } = require("discord.js");
const { v4: uuidv4 } = require("uuid");
const db = require("quick.db");
const ms = require("ms");
const talkedRecently = new Set();
const { get } = require("request-promise-native");
const fs = require("fs");
module.exports = {
  name: "config",
  description: "Show list of help commands",
  usage: "help [command]",
  run: async (bot, message, args, reaction) => {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need ``ADMINISTRATOR`` permission to execute this command!")
    
    if(!args[0]) {
      
      let Embed = new MessageEmbed()
      .setAuthor(`${message.guild.name}'s Configuration`, message.guild.iconURL())
      .setDescription(`Change your server configuration.`)
      .addFields({name: ".config spawns <disable/enable>", value: "Disable or enable spawning in a channel"})
      .addFields({name: ".prefix <new prefix>", value: "Change the server prefix"})
      .addFields({name: ".config redirect <channel/disable>", value: "Redirect all spawn to a certain channel"})
      .setColor("#6766F6")
      message.channel.send(Embed)
      
    }
    
    if(args[0].toLowerCase() === "spawns") {
      
      if(!args[1]) return message.channel.send("**Usage:** .config spawns <disable/enable>")
      
      if(args[1].toLowerCase() === "enable") {
        
        db.set(`disabled_` + message.guild.id, true)
        message.channel.send(`**Pokemon can now spawns in** <#${message.channel.id}> <a:verify:719412406090203206>`)
        
      }else if(args[1].toLowerCase() === "disable") {
        
        db.set(`disabled_` + message.guild.id, false)
        message.channel.send(`**Pokemon will no longer spawns in** <#${message.channel.id}> <a:verify:719412406090203206>`)
        
      }
      
    }
    
  }
}