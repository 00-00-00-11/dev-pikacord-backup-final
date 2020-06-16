const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
module.exports = {
  name: "help",
  description: "Check your balance",
  usage: "+bal",
  run: async (bot, message, args) => {
    
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
    
    const guildprefix = db.get(`prefix_${message.guild.id}`);
    if (guildprefix === null){
    db.set(`prefix_` + message.guild.id, ".")
  }
    let description =
      "\nType ``" + guildprefix + "help <page number>`` to view the page";
    if (!args[0]) {
      let Embed = new MessageEmbed()
        .setAuthor("Help Page")
        .setDescription(
          "**Commands List**\nType ``" +
            guildprefix +
            "help <page number>`` to view the page"
        )
        .addFields({
          name: "Page 1 | Main Commands",
          value: "All the main commands"
        })
        .addFields({
          name: "Page 2 | Economy Commands",
          value: "Economy commands"
        })
        .addFields({
          name: "Page 3 | Server Configuration",
          value: "Change the server setting (Required ``ADMIN`` permission)"
        })
        .setColor("#6766F6");
      message.channel.send(Embed);
    }
    if (args[0] !== undefined && args[0].toLowerCase() === "1") {
      let Embed = new MessageEmbed()
        .setAuthor("Help Page")
        .setDescription("**Main Commands**" + description)
        .addFields({
          name: guildprefix + "start",
          value: "Start your journey by selecting a starter"
        })
        .addFields({
          name: guildprefix + "info",
          value: "Show your pokemon information"
        })
        .addFields({
          name: guildprefix + "select <pokemon>",
          value: "Select an existing pokemon"
        })
        .addFields({
          name: guildprefix + "bal",
          value: "View your current balance / credits"
        })
        .addField(guildprefix + "tutorial", "Check out the quick tutorial for beginner")
        .setColor("6766F6");
      message.channel.send(Embed);
    }
    if (args[0] !== undefined && args[0].toLowerCase() === "2") {
      let Embed = new MessageEmbed()
        .setAuthor("Help Page")
        .setDescription("**Economy Commands**" + description)
        .addFields({
          name: guildprefix + "bal",
          value: "View your current balance / credits"
        })
        .addFields({ name: guildprefix + "redeem", value: "Redeem a pokemon, credits or spawn a pokemon" })
        .addField(guildprefix + "daily", "Claim your daily rewards")
        .addField(
          guildprefix + "trade <buy/pokemon>",
          "Trade your selected pokemon with other user or buy other user's pokemon"
        )
      .addField(guildprefix + `market find <pokemon>`, "Buy a pokemon using this command")
        .setColor("#6766F6")
        .addField(guildprefix + "shop", "View the shop");
      message.channel.send(Embed);
    }

    if (args[0] !== undefined && args[0].toLowerCase() === "3") {
      let Embed = new MessageEmbed()
        .setAuthor("Help Page")
        .setDescription("**Server Configurations Commands**", +description)
        .setColor("#6766F6")
        .addField(
          guildprefix + "prefix <new prefix>",
          "Change the prefix on the bot in your server."
        )
      .addField(guildprefix + "redirect <channel>", "Redirect all spawn into a channel")
      message.channel.send(Embed);
    }
  }
};
