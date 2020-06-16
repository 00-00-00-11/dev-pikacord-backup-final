const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const { get } = require("request-promise-native");

module.exports={
  name: "reset",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args)=>{
    db.delete("pokemons_" + message.author.id); // insert comments here
    db.delete(`pet_` + message.author.id);
    db.delete(`balance_` + message.author.id);
    message.channel.send("You have been reset!");
  }
}