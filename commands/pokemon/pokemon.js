const { MessageEmbed } = require("discord.js");
const { v4: uuidv4 } = require("uuid");
const db = require("quick.db");
const ms = require("ms");
const talkedRecently = new Set();
const { get } = require("request-promise-native");
const fs = require("fs");
module.exports = {
  name: "pokemon",
  description: "Show all your pokemons",
  usage: "pokemon",
  run: async (bot, message, args) => {
    
    let pokemon = db.fetch(`pokemons_` + message.author.id)

    if(!pokemon) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")
    
    function pages(arr, pokemonPerPage, page = 1) {
      
      const maxPages = Math.ceil(arr.length / pokemonPerPage)
      if(page < 1 || page > maxPages) return null
      return arr.slice((page - 1) * pokemonPerPage, page * pokemonPerPage)
      
    }
    
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
    
    function getlength(number) {
      return number.toString().length;
    }
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    let mons = db.fetch(`pokemons_${message.author.id}`); // array

    if (!mons || mons === null)
      return message.channel.send("You don't have any pokemon! Do `.start` to get started!");

    let pet = db
      .all()
      .filter(data => data.ID.startsWith(`pet_${message.author.id}`));

    let finalLb = ""
    
    let Embed = new MessageEmbed()
      .setAuthor(`${message.author.username}'s Pokemon`, message.author.displayAvatarURL())
      .setColor("#6766F6")
      

    mons.forEach(pokemons => {
      var content = ""
      content += `${pokemons.capitalize()}\n`
      Embed.setDescription(content)
    });
    
    function getPosition(elementToFind, arrayElements) {
    var i;
    for (i = 0; i < arrayElements.length; i += 1) {
        if (arrayElements[i] === elementToFind) {
            return i;
        }
    }
    return null; //not found
}
    
    if(!args[0]) return message.channel.send("Please specify the page!")
    
    if(isNaN(args[0])) return message.channel.send(`**${args[0].toUpperCase()}** is not a valid number!`)
    
    const page = pages(mons.map(m => `**-** **${m.capitalize()}** | **Level** 1`), 9, args[0])
    
    if(!page) return message.channel.send("You don't have that many pokemons!")
    
    Embed.setDescription(page.join("\n"))
    Embed.setFooter(`You have a total of ${mons.length} pokemon`)
    if(mons.length > 1) Embed.setFooter(`You have a total of ${mons.length} pokemons`)
    message.channel.send(Embed);
  }
};
