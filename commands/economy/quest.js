const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const talkedRecently = new Set()
module.exports={
  name: "quest",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args)=>{
    
    return message.channel.send("**Command is currently under maintenance, please wait until further announcement.**")
    
    let pokemon = db.fetch(`pokemons_` + message.author.id)

if(!pokemon) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")
    
    let catches = db.fetch(`catches_` + message.author.id)
    let claim50 = db.fetch(`claim50_` + message.author.id)
    if(catches === null) db.set(`catches_` + message.author.id, 0)
    if(!args[0]){
      let Embed = new MessageEmbed()
      .setAuthor(`Daily Quest`)
      .setThumbnail(`https://i.pinimg.com/originals/ab/79/4b/ab794bda1300901176be89621e941f58.png`)
      .setDescription(`**Current Catches:** ${catches}`)
      .addField("**25 Catches**", "100 Credits")
      .addField("**50 Catches**", "250 Credits")
      .addField("**100 Catches**", "500 Credits")
      .setColor("#6766F6")
      .setFooter("Claim your reward by typing .quest claim")
      await message.channel.send(Embed)
      setTimeout(() => {
        db.set(`catches_` + message.author.id, 0)
      }, 86400000)
    }
    if(args[0].toLowerCase() === "claim"){
      if(catches < 25){
        return message.channel.send("You need to catch atleast 25 pokemons to claim your reward!")
      }
      if(catches => 25 && catches < 50){
        db.add(`money_` + message.author.id, 100)
        message.channel.send(`Quest reward has been claimed!`)
        db.set(`catches_` + message.author.id, catches-25)
        return
      }
      if(catches => 50 && catches < 100){
        db.add(`money_` + message.author.id, 250)
        message.channel.send(`Quest reward has been claimed!`)
        db.set(`catches_` + message.author.id, catches-50)
        return
      }
      if(catches => 100){
        db.add(`money_` + message.author.id, 500)
        message.channel.send(`Quest reward has been claimed!`)
        db.set(`catches_` + message.author.id, catches-100)
        return
      }
    }
  }
}