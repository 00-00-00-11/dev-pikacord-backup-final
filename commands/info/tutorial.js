const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const talkedRecently = new Set()
module.exports={
  name: "tutorial",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args)=>{
    
    let Page1 = new MessageEmbed()
    .setAuthor(`Quick and Basic Tutorial`)
    .addField("**Step 1**", "If you don't have any pokemon yet, pick one by typing ``.start``")
    .addField("**Step 2**", "Catch your first pokemon by typing ``.catch <pokemon>`` - command will only be available if a pokemon has spawned")
    .addField("**Step 3**", "You don't have any money yet? type ``.daily`` to get your daily bonus!")
    .addField("**Step 4**", "Want to buy your first rare pokemon? type ``.market find <pokemon>`` to check its price!")
    .setDescription("Have any question? go to our [website](https://pikacord.xyz) or visit our [support server](https://discord.gg/E6CG9ST)")
    .setColor("#6766F6")
    message.channel.send(Page1)
    
  }
}