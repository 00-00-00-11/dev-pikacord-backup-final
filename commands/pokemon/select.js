const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const { get } = require("request-promise-native");
const talkedRecently = new Set();

module.exports = {
  name: "select",
  description: "Select a new pokemon.",
  usage: "select <pokemon>",
  run: async (bot, message, args, db) => {
    
    let pokemons = db.fetch(`pokemons_` + message.author.id)

if(!pokemons) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")
    
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
    
     String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    
    let mons = db.fetch(`pokemons_` + message.author.id);
    if(!args[0]) return message.channel.send("Specify what pokemon to select");
    if(!mons.includes(args[0].toLowerCase())) return message.channel.send("You don't have that pokemon!");
    
    if(!isNaN(args[0])) return message.channel.send("You need to specify the pokemon!")
    
    let pokemon = args[0].toLowerCase();
    db.set(`pet_${message.author.id}`, pokemon)
    message.channel.send(`Selected your level 1 **${pokemon.capitalize()}**`)   
  }
}