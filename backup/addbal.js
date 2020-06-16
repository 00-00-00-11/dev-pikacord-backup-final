const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const { get } = require("request-promise-native");
const talkedRecently = new Set();
var mysql = require('mysql')
let sql

var con = mysql.createConnection({
    host: "remotemysql.com",
    user: "jRMSIp85X8",
    password: "AEy4YbvYyz",
    database: "jRMSIp85X8"
    });

module.exports = {
  name: "addbal",
  description: "Add money to balance",
  usage: "+addbal",
  run: async (bot, message, args, con) => {

  let bal;
  let devid = ["223214332995960833", "566851016910438400", "253973130941431818", "324094776049795072"]

  if(!devid.includes(message.author.id)) return message.channel.send("You don't have permission!");
  if(args[0] === null)return message.reply('Please specify args')
  if(isNaN(args[0]))return message.reply('Please specify a valid amount');
  let money = parseInt(args[0], 10);
  let moneys = args[0]
 
  con.connect(function(err){
    
    if(err) throw err;
    
    let sql1 = `UPDATE balance SET balance = ${bal + moneys} WHERE id = ${message.author.id}`
    
    con.query(sql1, function (err, result, fields) {
      
      message.channel.send(result)
      
    })
    
  })
            
  } //actually nvm
};
