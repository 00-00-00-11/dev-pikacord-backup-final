const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const { get } = require("request-promise-native");
const talkedRecently = new Set();
const db = require("quick.db");
//var Pokedex = require('pokedex-promise-v2');
//const P = new Pokedex()

let a;

module.exports = {
  name: "pokedex",
  description: "gives you a hint from the recently spawned pokemon",
  usage: "+.hint",
  aliases: ["dex"],
  run: async (bot, message, args, db) => {
    
    let pokemon = db.fetch(`pokemons_` + message.author.id)

    var evolutions = require('evolutions');
    
if(!pokemon) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")
    
    if(!args[0]) {
      
      let Embed = new MessageEmbed()
      .setThumbnail("https://i.ya-webdesign.com/images/charizard-vector-6.gif")
      .setColor("#48fa0c")
      .setAuthor(`Hey there ${message.author.username}!`)
      .setDescription(`Looking for an information of a specific pokemon? try typing ` + "**.pokedex <pokemon>**\nI'll be here ready to give you the information!")
      message.channel.send(Embed)
      
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
    
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    
    const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`,
      json: true
    }
    let text = args.join(" ")
    
    if(text.toLowerCase().startsWith("mega ")) options.url = `https://pokeapi.co/api/v2/pokemon/${args[1]}-mega`
    
    if(text.toLowerCase() === "giratina") options.url = `https://pokeapi.co/api/v2/pokemon/giratina-altered`
    if(text.toLowerCase() === "tapu koko") options.url = `https://pokeapi.co/api/v2/pokemon/tapu-koko`
    if(text.toLowerCase() === "tapu lele") options.url = `https://pokeapi.co/api/v2/pokemon/tapu-lele`
    if(text.toLowerCase() === "tapu bulu") options.url = `https://pokeapi.co/api/v2/pokemon/tapu-bulu`
    if(text.toLowerCase() === "tapu fini") options.url = `https://pokeapi.co/api/v2/pokemon/tapu-fini`
    if(text.toLowerCase() === "deoxys") options.url = `https://pokeapi.co/api/v2/pokemon/deoxys-normal`
    if(text.toLowerCase() === "cat" || text.toLowerCase() === "cats") options.url = "https://pokeapi.co/api/v2/pokemon/arceus"
    if(text.toLowerCase() === "hyper" || text.toLowerCase() === "hyp3r") options.url = "https://pokeapi.co/api/v2/pokemon/arceus"
    if(text.toLowerCase() === "bigchungus" || text.toLowerCase() === "chungus") options.url = "https://pokeapi.co/api/v2/pokemon/arceus"
    
    get(options).then(async body => {
      
      function getlength(number) {
      return number.toString().length;
      }
      
      let Embed = new MessageEmbed()
      .setTitle(`#${body.id} ${body.name.capitalize()}`)
      .setDescription(`**Types:** ${body.types[0].type.name.capitalize()}`)
      .addFields({name: "**Base Stats**", value: `**HP:** ${body.stats[0].base_stat}\n**Attack:** ${body.stats[1].base_stat}\n**Defense:** ${body.stats[2].base_stat}\n**Sp Attack:** ${body.stats[3].base_stat}\n**Sp Defense:** ${body.stats[4].base_stat}\n**Speed:** ${body.stats[5].base_stat}`})
      .setThumbnail("https://i.ya-webdesign.com/images/charizard-vector-6.gif")      
      
      if (getlength(body.id) === 1) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${body.id}.png`
        );
      }
      if (getlength(body.id) === 2) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${body.id}.png`
        );
      }
      if (getlength(body.id) === 3) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${body.id}.png`
        );
      }
      
      if(body.types[1] != null) {
        
        Embed.setDescription(`**Types:** ${body.types[0].type.name.capitalize()} | ${body.types[1].type.name.capitalize()}`)
        
      }
      if(text.toLowerCase() === "cat" || text.toLowerCase() === "cats") {
        Embed.setImage("https://petrescueshelter.com/wp-content/uploads/2020/03/Cat-Rescue-Winnipeg.png")
        Embed.setTitle("#999 Cat")
        Embed.setDescription("**Types:** God | Overpowered")
      }
      
      if(text.toLowerCase() === "hyper" || text.toLowerCase() === "hyp3r") {
        Embed.setImage("https://img.techpowerup.org/200606/pikachuhyper.png")
        Embed.setTitle("#-10 God of Pikachu")
        Embed.setDescription("**Types:** Electric | Normal")
      }
      
      if(text.toLowerCase() === "bigchungus" || text.toLowerCase() === "chungus") {
        Embed.setImage("https://external-preview.redd.it/EdZGmNf-nBCtgQVjzb-HoPY2ZHyxShYOYbKMJFPYfnk.png?width=1200&height=628.272251309&auto=webp&s=a761168cae1b0e66f50ecf3fe3364fb507e0e714")
        Embed.setTitle("#69420 BigChungus")
        Embed.setDescription("**Types:** Thicc | Epic")
      }
      
      if(body.name === "giratina-altered") Embed.setTitle(`#${body.id} Giratina`)
      if(body.name === "tapu-koko") Embed.setTitle(`#${body.id} Tapu Koko`)
      if(body.name === "tapu-lele") Embed.setTitle(`#${body.id} Tapu Lele`)
      if(body.name === "tapu-bulu") Embed.setTitle(`#${body.id} Tapu Bulu`)
      if(body.name === "tapu-fini") Embed.setTitle(`#${body.id} Tapu Fini`)
      if(body.name === "deoxys-normal") Embed.setTitle(`#${body.id} Deoxys`)
      
      if(args[0].toLowerCase() === "") {
        
        if (getlength(body.id) === 1) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${body.id}_f2.png`
        );
      }
      if (getlength(body.id) === 2) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${body.id}_f2.png`
        );
      }
      if (getlength(body.id) === 3) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${body.id}_f2.png`
        );
      }
        
      }
      
      
      console.log(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${body.id}_f2.png`)
      
       
      
      message.channel.send(Embed)
    }).catch(() => message.channel.send(`**${args[0].toUpperCase()}** is not a valid pokemon!`))
  }
}