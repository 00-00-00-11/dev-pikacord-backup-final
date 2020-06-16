const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const { get } = require("request-promise-native");
const talkedRecently = new Set();
const db = require("quick.db")
const chcooldown = new Set()

let a;

module.exports = {
  name: "hint",
  description: "gives you a hint from the recently spawned pokemon",
  usage: "+.hint",
  run: async (bot, message, args, db) => {
    let rP = db.fetch("recentPokemon");
    let cp = db.fetch(`catchpokemon_` + message.channel.id)
    
    if(cp === null) return
    
    if(chcooldown.has(message.channel.id)) return message.channel.send("I already gave you a hint, try again in a few minutes")
    
    var a = cp;
var splitted = a.split('');
var count = 0;

while(count < a.length/2) {
   var index = Math.floor(Math.random()*a.length);
   if(splitted[index] !== '-' && splitted[index] !== ' ') {
       splitted[index] = '-';
       count++;
   } 
}

var newstring = splitted.join("")
    chcooldown.add(message.channel.id)
    
    message.channel.send(`**Hint:** ${newstring}`)``
    setTimeout(() => {
      
      chcooldown.remove(message.channel.id)
      
    }, 120000)
  }
}