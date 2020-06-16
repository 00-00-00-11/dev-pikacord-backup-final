const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { stripIndents } = require("common-tags");
const ms = require('ms')
module.exports={
  name: "eval",
  aliases: ["stat"],
  description: "Show list of help commands",
  usage: "help [command]",
  run: async(bot, message, args) => {
    if(message.author.id !== "566851016910438400") return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        let Embed = new MessageEmbed()
        .setAuthor("Evaluated!")
        .setDescription(`**Code**\n` + "```json\n" + code + "```")
        .setColor("#56fc03")
        message.channel.send(Embed)
    } catch (err) {
      const code = args.join(" ");
      let Embed= new MessageEmbed()
      .setAuthor("Evaluated!")
      .setDescription(`**Code**\n` + "```json\n" + code + "```\n**Error**\n" + `\`\`\`xl\n${clean(err)}\n\`\`\``)
      .setColor("#56fc03")
      message.channel.send(Embed)
    }
  }
}
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}