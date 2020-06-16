const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const talkedRecently = new Set()
module.exports={
  name: "donate",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args)=>{
    
    let banned = db.fetch(`banned_` + message.author.id)
    if(banned === true) {
      let Embeds = new MessageEmbed()
        .setTitle(`YOUR ACCOUNT HAS BEEN BANNED`)
        .setDescription("**Your account has been banned from using the bot for one of the following reasons:**\n➜ Account automation\n➜ Scamming other user\n➜ Promoting in support server\n➜ Dm advertising")
        .addFields({name: "**Apply form**", value: "[Please fill out this form if you wish to apply](https://www.youtube.com/watch?v=dQw4w9WgXcQ)"})
        .setColor("#fc0303")
      message.author.send(Embeds)
      return
    }
    
    let Embed = new MessageEmbed()
      .setAuthor(`Hello ${message.author.username}`)
      .setDescription("[Donate to us!](https://www.paypal.me/pikacord)")
      .setColor("#17fc03")
      .addFields({name: "**What should I do after I donated?**", value: "Please message one of the dev with payment proof\n**Devs:** Hyp3r#9242, Macca™#0001, BigChungus#2441, and Travdrag#8657"})
    message.channel.send(Embed)
  }
}