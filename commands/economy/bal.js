const { MessageEmbed } = require('discord.js');
var mysql = require('mysql');
let sql;
const db = require(`quick.db`)
module.exports = {
  name: "bal",
  description: "Shows the targets balance",
  usage: "bal <user>",
  run: async(bot, message, args, con) => {
    
    /*function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }*/
    
    let pokemon = db.fetch(`pokemons_` + message.author.id)
    if(!pokemon) return message.channel.send("You don't have a starter yet! choose one by typing ``.start``!")
    
    let balance = db.fetch(`balance_` + message.author.id)
    
    if(balance === null) balance = 0
    
    let Embed = new MessageEmbed()
    .setAuthor(`${message.author.username}'s Balance: ${(balance).toLocaleString('en')} Shards`, "https://www.pngrepo.com/download/303723/crystal-shard.png")
    .setColor("#6766F6")
    await message.channel.send(Embed)
    
  }
}