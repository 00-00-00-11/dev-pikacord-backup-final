const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const cooldown = new Set()
module.exports={
  name: "daily",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args)=>{
    
    // return message.channel.send("**Command is currently under maintenance, please wait until further announcement.**")
    
    let banned = db.fetch(`banned_` + message.author.id)
    if(banned === true) {
      let Embeds = new MessageEmbed()
        .setTitle(`YOUR ACCOUNT HAS BEEN BANNED`)
        .setDescription("**Your account has been banned from using the bot for one of the following reasons:**\n➜ Account automation\n➜ Scamming other user\n➜ Promoting in support server\n➜ Dm advertising")
        .addFields({name: "**Apply form**", value: "[Please fill out this form if you wish to apply](https://forms.gle/4cw7Hse1wF1g4eQD7)"})
        .setColor("#fc0303")
      message.author.send(Embeds)
      return
    }
    
    let dailycooldown = db.fetch(`dailycooldown_` + message.author.id)
    
    let sr = Math.floor(Math.random() * 12000 + 500);
    let lucky = Math.floor(Math.random() * 100000 + 1);
    
    if(cooldown.has(message.author.id)) return message.channel.send(`**Oops!** you already claimed your daily, try again in a few hours.`)
    
    let Embed = new MessageEmbed()
    .setAuthor(`Daily reward has been claimed!`, "https://cdn.discordapp.com/emojis/719412406090203206.gif?v=1")
    .addField("**You got**", `**${sr} Shards**`)
    .setColor("#6766F6")
    
    if(lucky === 1235) {
      
      Embed.addField("**Bonus**", "**1 Redeem**")
      db.add(`redeem_` + message.author.id, 1)
      
    }
    
    message.channel.send(Embed)
    
    db.add(`balance_` + message.author.id, sr) //this shouldnt be 500 lmao
    cooldown.add(message.author.id)
    setTimeout(() => {
      cooldown.remove(message.author.id)
    }, 86400000)
  }
}