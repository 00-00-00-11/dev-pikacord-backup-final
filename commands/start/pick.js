const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const mysql = require("mysql");

var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "jRMSIp85X8",
  password: "AEy4YbvYyz",
  database: "jRMSIp85X8"
});

const starters = [
  //  btw, in start.js we should set all db to default so there will be no "null" | go ahead
  "bulbasaur",
  "charmander",
  "squirtle",
  "chikorita",
  "cyndaquil",
  "totodile",
  "treecko",
  "torchic",
  "mudkip",
  "turtwig",
  "chimchar",
  "piplup",
  "snivy",
  "tepig",
  "oshawott",
  "chespin",
  "fennekin",
  "froakie",
  "rowlet",
  "litten",
  "popplio",
  "pikachu",
  "wobbuffet",
  "meowth"
];

module.exports = {
  name: "pick",
  description: "Pick your pokemon",
  usage: ".pick <pokemon>",
  run: async (bot, message, args) => {
    let banned = db.fetch(`banned_` + message.author.id);
    if (banned === true) {
      let Embeds = new MessageEmbed()
        .setTitle(`YOUR ACCOUNT HAS BEEN BANNED`)
        .setDescription(
          "**Your account has been banned from using the bot for one of the following reasons:**\n➜ Account automation\n➜ Scamming other user\n➜ Promoting in support server\n➜ Dm advertising"
        )
        .addFields({
          name: "**Apply form**",
          value:
            "[Please fill out this form if you wish to apply](https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
        })
        .setColor("#fc0303");
      message.author.send(Embeds);
      return;
    }

    let pokemon = args[0].toLowerCase();
    let mons = db.fetch(`pokemons_` + message.author.id);
    if (!pokemon) return message.channel.send("Please specify a starter.");
    if (mons) return message.channel.send("You already have pokemon!");
    if (!starters.includes(pokemon))
      return message.channel.send("Thats not a starter pokemon!");

    let m = message.channel.send(
      "Are you sure you want `" +
        pokemon +
        "` as your starter?\n``YES`` or ``NO``"
    );
    message.channel
      .awaitMessages(m => m.author.id === message.author.id, {
        max: 1,
        time: 120000,
        error: ["time"]
      })
      .then(collected => {
        if (collected.first().content.toLowerCase() === "yes") {
          db.set(`pet_` + message.author.id, pokemon);
          db.push(`pokemons_` + message.author.id, pokemon);
          db.set(`redeem_` + message.author.id, 0);
          db.set(`balance_` + message.author.id, 100)
          
          con.connect(function(err) {
            if (err) throw err;

            //Set query and specific vars
            let insertSql;
            let updateSql;
            let ifExistsSql;
            let target = message.author; // lets just make them can only see their own balance
            let bal;

            // Set the query to get the balance
            ifExistsSql =
              "SELECT EXISTS (SELECT * FROM balance WHERE id = " +
              target.id.toString();
            insertSql =
              "INSERT INTO balance (id, balance) VALUES (" +
              target.id.toString() +
              ", 100)";
            updateSql =
              "UPDATE balance SET balance = 100 WHERE id = " +
              target.id.toString(); // UPDATE balance SET balance = 1500 WHERE id = 324094776049795072
            
            
            // Send the inital query
            con.query(ifExistsSql, function(err, result, fields) {
              if (err) throw err;
              var existsresult = result;
              console.log('result = ' + existsresult);
              
              if (existsresult = !0) {
                // IF RECORD ALREADY EXISTS
                con.query(updateSql, function(err, result, fields) {
                  if (err) throw err;
                  console.log('exists');
                });
              } else if (!existsresult) {
                // IF RECORD DOESN'T EXIST
                con.query(insertSql, function(err, result, fields) {
                  if (err) throw err;
                });
              } else {
                message.channel.send("An error has occured.)");
              }
            });

          message.channel.send(
            "Great choice trainer! start your journey by typing ``.info``. **Good Luck!**"
          );
          })
        }
                      
                      
// FOR GOD SAKE IM LOSING BRAINCELLS RN lmao. btw, .bal isn't | are you there?

                    
        if (collected.first().content.toLowerCase() === "no") {
          message.channel.send("Feel free to pick again!");
        }
    
  }) // correct
} // correct
} // correc            
