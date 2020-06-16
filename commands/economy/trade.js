const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
module.exports={
  name: "trade",  
  description: "Check your balance",
  usage: "+bal",
  run: async (bot,message,args)=>{
    
    return
    
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
    
    String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
    }
    let pet = db.fetch(`pet_${message.author.id}`)
    if(args[0].toLowerCase() === "pokemon"){
      let user = message.mentions.users.first().id;
      let userpet = db.fetch(`pet_` + user);

      
      if(!user) return message.channel.send("You need to specify a user!")
      // if(user === message.author.id) return message.channel.send("**Hey!** you can't trade with yourself")
      message.channel.send(`<@${user}>! ${message.author.username} has invited you to trade!`)
      let Embed = new MessageEmbed()
        .setAuthor(`Trade requested by ${message.author.username}`)
        .setDescription(`**${message.author.username}'s Offer**\n` + "```" + pet.capitalize() + "```\n" + `**${message.mentions.users.first().username}'s Offer**\n` + "```" + userpet.capitalize() + "```")
        .setColor('#6766F6')
      message.channel.send(Embed)
      message.channel.send(`**Type ` + "``accept``" + " to accept the trade or type ``deny`` to deny the trade!**")
      const filter = m => m.author.id === user
      message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(async collected => {
        if(collected.first().content.toLowerCase() === "accept"){
          // userpet = trade pet
          // pet = trader pet
          let traderpet = db.fetch(`pet_${user}`)
          let traderpokemon = db.fetch(`pokemons_` + message.author.id);
          
          let userpet = db.fetch(`pet_${message.author.id}`)
          let userpokemon = db.fetch(`pokemons_` + user);
          
          const replace = traderpet
          const replace2 = userpet
          
          const index = traderpokemon.indexOf(traderpet)
          if(index > -1) {
            
            traderpokemon.splice(index, 1)
            
          }
          
          await message.channel.send("**Trade has been accepted!** 💱");
        }
        if(collected.first().content.toLowerCase() === "deny"){
          return message.channel.send("Trade has been denied!");
        }
      })
      .catch(() => message.channel.send("Trade has expired!"));
    }
    if(args[0].toLowerCase() === "buy" || args[0].toLowerCase() === "credits-pet" || args[0].toLowerCase() === "credit-pet"){
      
      let user = message.mentions.users.first().id
      let userpet = db.fetch(`pet_${user}`)
      let money = db.fetch(`money_${message.author.id}`)
      let userpokemons = db.fetch("pokemons_" + user);
      let usermoney = db.fetch("money_" + user);
      
      if(!userpokemons[1] || userpokemons[1] === null) return message.channel.send(message.mentions.users.first().username + " must have more than one pokemon!");
    
      if(!user) return message.channel.send("You need to specify a user!");
      if(user === message.author.id) return message.channel.send("**Hey!** you can't trade with yourself");
      if(!args[2]) return message.channel.send("You need to specify the amount of credit you want to trade!");
      if(isNaN(args[2])) return message.channel.send("``" + args[2] + "`` is not a valid number!``");
      if(money < args[2]) return message.channel.send("You don't have enough money!");
      
      message.channel.send(`<@${user}>! ${message.author.username} has invited you to trade!`);
      
      let Embed = new MessageEmbed()
        .setAuthor(`Trade requested by ${message.author.username}`)
        .setDescription(`**${message.author.username}'s Offer**\n` + "```" + args[2] + " Credits```\n" + `**${message.mentions.users.first().username}'s Offer**\n` + "```" + userpet.capitalize() + "```")
        .setColor('#6766F6')
        .setThumbnail(`https://www.pinclipart.com/picdir/big/339-3394897_cartoon-money-png-for-cartoon-money-with-wings.png`)
      
      message.channel.send(Embed);
      
      let m = message.channel.send(`**Type ` + "``accept``" + " to accept the trade or type ``deny`` to deny the trade!**")
      const filter = m => m.author.id === user
      message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {

        if(collected.first().content.toLowerCase() === "accept"){
          /*let user = message.mentions.users.first().id
          let userpet = db.fetch(`pet_${user}`)
          let money = db.fetch(`money_${message.author.id}`)
          let userpokemons = db.fetch("pokemons_" + user);*/

          db.push(`pokemons_` + message.author.id, userpet); //add to buyer
          db.delete("pokemons_" + user, db.get("pet_" + user.id));
          db.delete(`pet_${user}`); // delete from seller
          db.set("pet_" + user, userpokemons[0]); //add
          db.subtract("money_" + message.author.id, args[2]);
          if(usermoney === null) db.set("money_" + user, 0);
          db.add("money_" + message.author.id, args[2]);
          
          //db.push("mega_" + user, false)
          //db.push("mega_" + message.author.id, false)
          message.channel.send("**Trade has been accepted!** 💱");
        }
        if(collected.first().content.toLowerCase() === "deny"){
          return message.channel.send("Trade has been denied!")
        }
      })
//      .catch(() => message.channel.send("Trade has expired!"))
    }
  }
}