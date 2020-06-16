const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const { get } = require("request-promise-native");

module.exports={
  name: "ban",  
  description: "clears your balance",
  usage: "+bal",
  run: async(bot,message,args) =>{
if(!["223214332995960833", "615919285058928661", "566851016910438400", "253973130941431818", "324094776049795072", "324094776049795072"].includes(message.author.id)) return message.channel.send("You don't have permission!");
    
    let users = message.mentions.users.first().id; 
    if(!users) return message.reply("Please specify the user you want to ban!"); 
    let Embed = new MessageEmbed()
      .setTitle(`Are you sure you want to ban ${message.mentions.users.first().username} from the bot?`)
      .setDescription(`This will take away ${message.mentions.users.first().username}'s permissions to use the bot!\n**Confirm by replying with ` + "``YES`` or ``NO``**")
      .setColor("#fc0303")
      .setThumbnail("https://cdn.clipart.email/cf804d55593939773a64edebbfbad606_clipart-hammer-big-hammer-clipart-hammer-big-hammer-transparent-_1277-1596.png")
    message.channel.send(Embed);
    message.channel.awaitMessages(m => m.content.toLowerCase() === `yes` || m.content.toLowerCase() === "no" && m.author.id === message.author.id,
    { max: 1, time: 120000, error: ["time"]}).then(collected => {
      if(collected.first().content.toLowerCase() === "yes"){
        // db.set(`banned_` + message.author.id, true)
        let Embeds = new MessageEmbed()
        .setTitle(`YOUR ACCOUNT HAS BEEN BANNED`)
        .setDescription("**Your account has been banned from using the bot for one of the following reasons:**\n➜ Account automation\n➜ Scamming other user\n➜ Promoting in support server\n➜ Dm advertising")
        .addFields({name: "**Apply form**", value: "[Please fill out this form if you wish to apply](https://www.youtube.com/watch?v=dQw4w9WgXcQ)"})
        .setColor("#fc0303")
        const user = bot.users.cache.get(users);
        user.send(Embed);
        message.channel.send(`**${message.mentions.users.first().username}** has been banned ✅`)
      }else if(collected.first().content.toLowerCase() === "no"){
        return message.channel.send("**Operation has been cancelled!**")
      }
    })
  }
}