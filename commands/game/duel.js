const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const { get } = require("request-promise-native");
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js')
module.exports={
  name: "duel",  
  description: "clears your balance",
  usage: "+bal",
  run: async(bot,message,args) => {
    
    let user = message.mentions.users.first().id;
    
    let hp = 200
    let ophp = 200
    
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
      
    let challengerpokemon = db.fetch(`pet_` + message.author.id);
    let opponentpokemon = db.fetch(`pet_` + user);
    // if(user.id === message.author.id) return message.channel.send("You can't challenge yourself!")
    const guildprefix = db.get(`prefix_${message.guild.id}`);
    if(!user) return message.channel.send("You need to mention someone!");
    if(!challengerpokemon) return message.channel.send("You don't have any pokemon! Do `.start` to get started!"); //  the challenger has no pokemon
    
    // start of canvas part
    
    const canvas = Canvas.createCanvas(1920, 1080);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://img.techpowerup.org/200531/eh.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const pokemons = await Canvas.loadImage(`https://img.pokemondb.net/sprites/home/normal/${challengerpokemon}.png`);
    ctx.drawImage(pokemons, 185, 380, 500, 500);
    const opp = await Canvas.loadImage(`https://img.pokemondb.net/sprites/home/normal/${opponentpokemon}.png`);
    ctx.drawImage(opp, 1250, 380, 500, 500);
    
    // end of canvas part
    
    message.channel.send(`<@${user}>! ${message.author.username} has challenged you into a duel! respond with ` + "``.accept`` or ``.deny``");
    const filter = m => m.author.id === user && message.content.startsWith(guildprefix)
    message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }).then(async collected => {
      
      // start of canvas part
      
      
      
      // end of canvas part
            
      if(collected.first().content.toLowerCase() === `${guildprefix}accept`){
                
        const attachment = new MessageAttachment(canvas.toBuffer(), 'canvas.png');
        message.channel.send(`**${challengerpokemon.capitalize()} vs ${opponentpokemon.capitalize()}**`)
        await message.channel.send(attachment)
      }
    })
    
    function getStats(pokemon){
    const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
      json: true
    };
    get(options).then(async body => { 
      let iv = Math.round(
        (body.stats[5].base_stat +
          body.stats[4].base_stat +
          body.stats[3].base_stat +
          body.stats[2].base_stat +
          body.stats[1].base_stat +  
          body.stats[0].base_stat) / // speed
          3
      );
  })
    }
  }
}