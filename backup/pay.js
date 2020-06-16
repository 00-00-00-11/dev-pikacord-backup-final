const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
module.exports={
  name: "pay",  
  description: "Pay a user",
  usage: "pay <user> <amount>",
  run: async(bot,message,args,con) => {
    
    let pokemon = db.fetch(`pokemons_` + message.author.id)

if(!pokemon) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")
    
    let user = message.mentions.members.first();
    if(!args[1]) return message.channel.send("You need to specify the amount of credits you want to pay!")
    if(isNaN(args[1])) return message.channel.send(`${args[1]} is not a valid number!`);
    if(!user) return message.channel.send("You need to mention the user to pay!");
    let payment = parseInt(args[1], 10);

    let authorBal = con.query(`'SELECT' balance FROM balance WHERE id = ${message.author.id}`);
    let userBal = con.query(`'SELECT' balance FROM balance WHERE id = ${user.id}`);
    if(authorBal === null || !authorBal){
      con.query(`INSERT INTO balance (id, balance) VALUES (${message.author.id}, 0)`);
      message.channel.send("You don't have enough money to pay " + user)
      return // you there?
    }
    if(userBal === null || !userBal){
      con.query(`INSERT INTO balance (id, balance) VALUES (${user.id}, 0)`);
    }
    
    message.channel.send(authorBal);
    message.channel.send(userBal);
    
    message.channel.send("**You are about to pay " + user + ` ${args[1]} Credits!**\nReply with ` + "``confirm`` to confirm your payment!")
    const filter = m => m.author.id === message.author.id
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
      if(collected.first().content.toLowerCase() === "confirm"){
        let sql;
        let bal1;
        con.query(`SELECT * FROM balance WHERE id = ${message.author.id}`, (err, rows) => {
        if(rows.length < 1) {
          sql = `INSERT INTO balance (id, balance) VALUES (${message.author.id}, ${payment})`;
        }else{
          bal1 = rows[0].balance;
          sql = `UPDATE balance SET balance = ${bal1 - payment} WHERE id = ${message.author.id}`; 
        }
      });
        let sql1;
        let bal2;
        con.query(`SELECT * FROM balance WHERE id = ${message.author.id}`, (err, rows) => {
          if(rows.length < 1) {
            sql1 = `INSERT INTO balance (id, balance) VALUES (${user}, ${payment})`;
          }else{
            bal2 = rows[0].balance;
            sql1 = `UPDATE balance SET balance = ${bal2 + payment} WHERE id = ${user}`; 
          }
    });
        
        message.channel.send(`A total of **${args[1]}** Credits has been sent to **${message.mentions.users.first().username}**`)
      }else{
        message.channel.send("Payment has been cancelled!")
      }
    })
  }
}