const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const { get } = require("request-promise-native");

module.exports={
  name: "databasecheck",  
  description: "for maccas eyes only",
  usage: "+databasecheck",
  run: async(bot,message,args) =>{
  
  /*try{
    var Embed = db.fetch(args[0]);
  
    message.channel.send(Embed); // look in discord
    }catch(err){
      message.channel.send("**ERROR!** Probably not a real db") nice error message
    }
  }*/
    
  

      
  }
};