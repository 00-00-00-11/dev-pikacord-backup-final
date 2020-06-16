const { MessageEmbed } = require("discord.js");
const { v4: uuidv4 } = require("uuid");
const db = require("quick.db");
const ms = require("ms");
const talkedRecently = new Set();
const { get } = require("request-promise-native");
const fs = require("fs");
const type = require('./types.json')
module.exports = {
  name: "type",
  description: "Show all your pokemons",
  usage: "weak",
  run: async (bot, message, args) =>{
    
    let pokemon = db.fetch(`pokemons_` + message.author.id)

if(!pokemon) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")
    
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    
    let typing = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "steel", "fairy", "dark"]

    if(!typing.includes(args[0])) return message.channel.send(`**${args[0].capitalize()}** is not a valid type!`);
    
    let number
    if(args[0].toLowerCase() === "normal") number = 0
    if(args[0].toLowerCase() === "fire") number = 1
    if(args[0].toLowerCase() === "water") number = 2
    if(args[0].toLowerCase() === "electric") number = 3
    if(args[0].toLowerCase() === "grass") number = 4
    if(args[0].toLowerCase() === "ice") number = 5
    if(args[0].toLowerCase() === "fighting") number = 6
    if(args[0].toLowerCase() === "poison") number = 7
    if(args[0].toLowerCase() === "ground") number = 8
    if(args[0].toLowerCase() === "flying") number = 9
    if(args[0].toLowerCase() === "psychic") number = 10
    if(args[0].toLowerCase() === "bug") number = 11
    if(args[0].toLowerCase() === "rock") number = 12
    if(args[0].toLowerCase() === "ghost") number = 13
    if(args[0].toLowerCase() === "dragon") number = 14
    if(args[0].toLowerCase() === "dark") number = 15
    if(args[0].toLowerCase() === "steel") number = 16
    if(args[0].toLowerCase() === "fairy") number = 17
    
    let weak = type[number].weaknesses
    let immune = type[number].immunes
    let strength = type[number].strengths
    if(!args[0]) return
    let Embed = new MessageEmbed()
    .setTitle(`${args[0].capitalize()}`)
    .setColor(type[number].color)
    .addFields({name: "**Weaknesses**", value: weak.map(m => `${m.capitalize()}`).join("\n")})
    .addFields({name: "**Immunes**", value: immune.map(m => `${m.capitalize()}`).join("\n")})
    .addFields({name: "**Strengths**", value: strength.map(m => `${m.capitalize()}`).join("\n")})
    message.channel.send(Embed)
  }
}