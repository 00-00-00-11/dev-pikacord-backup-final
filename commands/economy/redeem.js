const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { stripIndents } = require("common-tags");
const ms = require('ms')
var voucher_codes = require('voucher-code-generator');
const { get } = require("request-promise-native");
const color = "#6766F6"
module.exports={
  name: "redeem",
  description: "Show list of help commands",
  usage: "help [command]",
  run: async(bot, message, args) =>{
    
    let pokemon = db.fetch(`pokemons_` + message.author.id)

if(!pokemon) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")
    
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
    
    let redeem = db.fetch(`redeem_` + message.author.id)
    
    if(redeem === null){
      db.set(`redeem_` + message.author.id, 0)
    }
    
    if(!args[0]) {
      let Embed = new MessageEmbed()
      .setTitle(`Your Redeems: ${redeem} 💸`)
      .addFields({name: ".redeem <pokémon>", value: "Use a redeem to obtain a pokémon of your choice"}, {name: ".redeem credits", value: "Use a redeem to obtain 100,000 Shards"})
      .setFooter("How to get redeem? Donating $1 will give you 1 redeem | Donate by typing .donate")
      .setColor(color)
      await message.channel.send(Embed)
    }
    if(args[0].toLowerCase() === "credits" || args[0].toLowerCase() === "credit"){
      if(redeem === null || redeem === 0) return message.channel.send("You don't have enough redeem. Get a redeem by typing ``.donate``")
      message.channel.send(`**Received 1,000,000 Credits from Redeem** ✅`)
      db.add(`balance_` + message.author.id, 1000000)
      db.set(`redeem_` + message.author.id, redeem-1)
      console.log(`${message.author.username} just redeemed`)
      bot.channels.cache.get("719907118462795816").send(`**${message.author.username}** just redeemed a **1,000,000 Shards** | **Redeem type:** Shards`)
      return
    }else{
      const options = {
        url: `https://pokeapi.co/api/v2/pokemon/${args[0]}`,
        json: true
      }
      get(options).then(async body => {
        if(redeem === null || redeem === 0) return message.channel.send("You don't have enough redeem. Get a redeem by typing ``.donate``")
        if(body.name === null) return message.channel.send("``" + args[0].toUpperCase() + "`` is not a valid pokémon!")
        db.set(`pet_` + message.author.id, body.name)
        db.push(`pokemon_` + message.author.id, body.name)
        db.set(`redeem_` + message.author.id, redeem-1)
        message.channel.send(`**Successfully redeemed ` + "``" + args[0].capitalize() + "``. Thank for your donation!**")
        console.log(`${message.author.username} just redeemed`)
        bot.channels.cache.get("719907118462795816").send(`**${message.author.username}** just redeemed a **${args[0]}** | **Redeem type:** Redeem`)
      }).catch(() => message.channel.send("``" + args[0].toUpperCase() + "`` is not a valid pokémon!"))
    }
  }
}