const { MessageEmbed } = require("discord.js");
const { v4: uuidv4 } = require("uuid");
const db = require("quick.db");
const ms = require("ms");
const talkedRecently = new Set();
const { get } = require("request-promise-native");
const fs = require("fs");
module.exports = {
  name: "snipe",
  description: "Show list of help commands",
  usage: "help [command]",
  run: async (bot, message, args, reaction) => {
    
    let snipemsg = db.fetch(`lastmessage_` + message.channel.id)
    let snipeauthor = db.fetch(`lastmessageauthor_` + message.channel.id)
    let profile = db.fetch(`lastmessageprofile_` + message.channel.id)
    
    if(!snipemsg || !snipeauthor || !profile) return message.channel.send("Theres nothing to snipe here!")
    
    let Embed = new MessageEmbed()
    .setAuthor(snipeauthor, profile)
    .setDescription(snipemsg)
    .setColor("#6766F6")
    message.channel.send(Embed)
    
  }
}