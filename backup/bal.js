const { MessageEmbed } = require('discord.js');
var mysql = require('mysql');
let sql;
const db = require(`quick.db`)

/*
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM balance", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}); // yeah, I was about to copy that lol haha lol
*/

module.exports = {
  name: "bal",
  description: "Shows the targets balance",
  usage: "bal <user>",
  run: async(bot, message, args, con) => {
    
    let pokemon = db.fetch(`pokemons_` + message.author.id)

if(!pokemon) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")
    
    /* function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } */
    
    var con = mysql.createConnection({
    host: "remotemysql.com",
    user: "jRMSIp85X8",
    password: "AEy4YbvYyz",
    database: "jRMSIp85X8"
    });
    
    function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    con.connect(function(err) {
      if (err) throw err;
      
      //Set query and specific vars
      let sql1;
      let target = message.author; // lets just make them can only see their own balance
      let bal;
    
      // Set the query to get the balance
      sql1 = "SELECT balance FROM balance WHERE id = " + target.id.toString()
      
      // Send the query
      con.query(sql1, function (err, result, fields) {
      
      if (err) throw err;
      
        
        
      if (!result[0].balance) {
        sql = "INSERT INTO balance (id, balance) VALUES (" + target.id.toString() + ", 0)";
        con.query(sql,function (err, result2, fields){ // ?
          if (err) throw err;
          console.log(result2);
        });
      }
      else {
        var bal = (result[0].balance);
      }
        
      
      
      // If user hasn't been added to the db before, set their money to 0.
      /*
      if(bal === null) {
        sql = "INSERT INTO balance (id, balance) VALUES (" + target.id.toString() + ", 0)";
        con.query(sql,function (err, result2, fields){ // ?
          if (err) throw err;
          console.log(result2);
        });
       
        
      }
      */
      //get the bal from the result
      
      
        
      let Embed = new MessageEmbed()
      .setAuthor(`${message.author.username}'s Balance: ${numberWithCommas(bal)} Shards`, "https://www.pngrepo.com/download/303723/crystal-shard.png")
      .setColor("#6766F6")
      message.channel.send(Embed)
    });
}); 
  }
}
    
/*      
      let sql; 
      let bal;

      (trav's solution) if(rows.length < 1) {
        sql = `INSERT INTO balance (id, balance) VALUES (${target.id}, 0)`;
        con.query(sql,function (err, result, fields){
          if (err) throw err;
          console.log(result);
        });
        
      }
      bal = rows[0].balance;
      message.channel.send(`<:coins:714816083202408529> **${target}** has **${numberWithCommas(bal)}** Credits`);
    });
  }
};
}
*/
    
    
    
    
    
    
    
    /*con.query(`SELECT * FROM balance WHERE id = ${message.author.id}`, (err, rows) => {
      if(err) throw err;
      let sql; 
      
      if(rows.length  < 1) {
        sql = `INSERT INTO balance (id, balance) VALUES (${message.author.id}, 0)`;
      }else{
        let bal = rows[0].balance;
        sql = `UPDATE balance SET balance = ${bal + 1} WHERE id = ${message.author.id}`;
      }
      con.query(sql);
    })*/
    
  