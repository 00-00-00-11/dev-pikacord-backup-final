const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
// hello
module.exports={
  name: "botinfo",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args)=>{
    let Embed = new MessageEmbed()
    .setTitle("Pikacord")
    .setURL("https://discord.com/oauth2/authorize?client_id=714766902513106975&permissions=10240&scope=bot")
    .setDescription("**Invite Pikacord to your server by clicking the link above!**") 
    .addFields({name: "Why we're here", value: "We decided to create this bot to bring back the amazing experience that Pokécord brought to all of us before its sad deletion. While this is not a direct recreation, we hope our spin on a moment in history can bring back pokémon to discord servers all over the world."})
    .addFields({name: "Developed by the Pikacord Dev Team:tm:", value: "Hyp3r#9242, BigChungus#2441, Macca™#0001, and Travdrag#8657"})
    .setColor("#6766F6")
    message.channel.send(Embed)
  }
}