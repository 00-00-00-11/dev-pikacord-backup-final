const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const { get } = require("request-promise-native");
const talkedRecently = new Set();
const db = require("quick.db");

module.exports = {
  name: "moves",
  description: "Select a new pokemon.",
  usage: "moves <pokemon>",
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
    
    let mons = db.fetch(`pokemons_${message.author.id}`); // array

    if (!mons || mons === null)
      return message.channel.send("You don't have any pokemon! Do `.start` to get started!");
    
    let pokemon = args[0].toLowerCase();
    
    if(!mons.includes(pokemon)) return message.channel.send("You don't have that pokemon!");
    
     const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`,
      json: true
    }.catch(err => {
      console.log(err);
    });
    message.channel.send(`${args[0]} moves list`)
      .then(msg => {
        get(options).then(body => {
        let embed = new MessageEmbed()
          
        })
    })

    
    
  }
}