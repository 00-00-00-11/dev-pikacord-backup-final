const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const { get } = require("request-promise-native");
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js')
const talkedRecently = new Set()
module.exports = {
  name: "canvastest",
  description: "Add money to balance",
  usage: "+addbal",
  run: async (bot, message, args) =>{
    const canvas = Canvas.createCanvas(1920, 1080)
    let pokemon = db.fetch(`pet_` + message.author.id)
    const ctx = canvas.getContext('2d')
    const background = await Canvas.loadImage('https://img.techpowerup.org/200531/eh.png')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const pokemons = await Canvas.loadImage(`https://img.pokemondb.net/sprites/home/normal/${pokemon}.png`);
    ctx.drawImage(pokemons, 185, 380, 500, 500);
    const attachment = new MessageAttachment(canvas.toBuffer(), 'canvas.png');
    message.channel.send(attachment);
  }
}