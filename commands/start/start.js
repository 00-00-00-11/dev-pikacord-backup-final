const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
module.exports={
  name: "start",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args) => {
    
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
    
    let registered = db.fetch(`userregistered_` + message.author.id);
    let pokemon = db.fetch(`pokemons_` + message.author.id);
    
    if(pokemon) return message.channel.send("You already have a pokemon!");
    
    let Embed = new MessageEmbed()
      .setAuthor(`Professor Oak`, "https://pbs.twimg.com/profile_images/428279017339645952/GtojrlL9.jpeg")
      .setTitle(`Hello ${message.author.username}!`)
      .setDescription("Greetings trainer! I heard you want to start your journey as a pokémon trainer, choosing a starter is your first step!")
      .addFields({name: "Generation 1", value: "``Bulbasaur`` | ``Charmander`` | ``Squirtle``"}, {name: "Generation 2", value: "``Chikorita`` | ``Cyndaquil`` | ``Totodile``"}, {name: "Generation 3", value: "``Treecko`` | ``Torchic`` | ``Mudkip``"}, {name: "Generation 4", value: "``Turtwig`` | ``Chimchar`` | ``Piplup``"}, {name: "Generation 5", value: "``Snivy`` | ``Tepig`` | ``Oshawott``"}, {name: "Generation 6", value: "``Chespin`` | ``Fennekin`` | ``Froakie``"}, {name: "Generation 7", value: "``Rowlet`` | ``Litten`` | ``Popplio``"}, {name: "Special", value: "``Pikachu`` | ``Wobbuffet`` | ``Meowth``"})
      .addFields({name: "Note:", value: "Using macros, selfbots or any form of automation to gain an unfair advantage can result in a ban from the bot. Don't Cheat"})
      .addFields({name: "Choosing a starter", value: "Choose a starter by typing .pick <pokémon>"})
      .setImage(`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/336c2292-e0d2-4281-8177-620117454fa8/da3q6fg-b1fbfade-43e4-4b8e-9471-128d1a24ce21.png/v1/fill/w_1024,h_656,strp/pokemon_starters_by_quas_quas_da3q6fg-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD02NTYiLCJwYXRoIjoiXC9mXC8zMzZjMjI5Mi1lMGQyLTQyODEtODE3Ny02MjAxMTc0NTRmYThcL2RhM3E2ZmctYjFmYmZhZGUtNDNlNC00YjhlLTk0NzEtMTI4ZDFhMjRjZTIxLnBuZyIsIndpZHRoIjoiPD0xMDI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0._a2n3Mp4d9BlvXl_odh_LeVmxBvfTGIG7exRQeyNsSY`)
      .setColor("#6766F6")
      message.channel.send(Embed) 
  }
}