const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const { get } = require("request-promise-native");

module.exports = {
  name: "catch",
  description: "clears your balance",
  usage: "+bal",
  run: async (bot, message, args) => {
    
    let num = 1
    let pokemon = db.fetch(`pokemons_` + message.author.id)
    
    if(pokemon === null) return message.channel.send("You don't have any pokemon yet! begin your journey by typing ``.start``!")
    
    function getId(name) {
      const options = {
        url: `https://pokeapi.co/api/v2/pokemon/${name}`,
        json: true
      };

      get(options).then(async body => {
        return body.id;
      });
    }

    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };

    let catchmon = db.fetch(`catchpokemon_` + message.channel.id);
    let text = args.join(" ");

    if (catchmon === null) return;
    
    if (text.toLowerCase() === catchmon.replace(/-/g, " ")) {
      if (
        catchmon.startsWith("a") ||
        catchmon.startsWith("i") ||
        catchmon.startsWith("u") ||
        catchmon.startsWith("e") ||
        catchmon.startsWith("o")
      ) {
        let Embed = new MessageEmbed()
          .setAuthor(
            `${message.author.username} just caught a ${catchmon.capitalize()}`,
            "https://www.freeiconspng.com/uploads/pokeball-icon-3.png"
          )
          .setColor("#6766F6")
          .setDescription(
            "You received **1,000 Shards** for catching a " +
              catchmon.capitalize()
          );

        let legendaries = [
          "articuno",
          "zapdos",
          "moltres",
          "mewtwo",
          "mew",
          "entei",
          "raikou",
          "suicune",
          "ho-oh",
          "lugia",
          "latias",
          "latios",
          "groudon",
          "kyogre",
          "rayquaza",
          "azelf",
          "uxie",
          "mesprit",
          "regirock",
          "regice",
          "registeel",
          "regigigas",
          "dialga",
          "palkia",
          "giratina",
          "creseelia",
          "cobalion",
          "terrakion",
          "virizion",
          "keldeo",
          "tornadus",
          "thundurus",
          "landorus",
          "reshiram",
          "zekrom",
          "kyurem",
          "xerneas",
          "yveltal",
          "zygarde",
          "tapu koko",
          "tapu lele",
          "tapu bulu",
          "tapu fini",
          "nihilego",
          "buzzwole",
          "pheromosa",
          "xurkitree",
          "celesteela",
          "kartana",
          "guzzlord",
          "poipole",
          "naganadel",
          "staktaka",
          "blacephalon",
          "cosmog",
          "cosmoem",
          "solgaleo",
          "lunala",
          "necrozma",
          "heatran",
          "jirachi",
          "deoxys",
          "phione",
          "manaphy",
          "darkrai",
          "shaymin",
          "arceus",
          "victini",
          "meoletta",
          "genesect",
          "diancie",
          "hoopa",
          "volcanion",
          "magearna",
          "marshadow",
          "zeraora"
        ];
        if (legendaries.includes(catchmon))
          Embed.setAuthor(
            `${
              message.author.username
            } just caught an ${catchmon.capitalize()}`,
            "https://orig05.deviantart.net/23a0/f/2014/103/1/8/master_ball__02__by_adfpf1-d7ea627.png"
          );

        message.channel.send(Embed);
      } else {
        let Embed = new MessageEmbed()
          .setAuthor(
            `${message.author.username} just caught a ${catchmon.capitalize()}`,
            "https://www.freeiconspng.com/uploads/pokeball-icon-3.png"
          )
          .setColor("#6766F6")
          .setDescription(
            "You received **1,000 Shards** for catching a " +
              catchmon.capitalize()
          );

        let legendaries = [
          "articuno",
          "zapdos",
          "moltres",
          "mewtwo",
          "mew",
          "entei",
          "raikou",
          "suicune",
          "ho-oh",
          "lugia",
          "latias",
          "latios",
          "groudon",
          "kyogre",
          "rayquaza",
          "azelf",
          "uxie",
          "mesprit",
          "regirock",
          "regice",
          "registeel",
          "regigigas",
          "dialga",
          "palkia",
          "giratina",
          "creseelia",
          "cobalion",
          "terrakion",
          "virizion",
          "keldeo",
          "tornadus",
          "thundurus",
          "landorus",
          "reshiram",
          "zekrom",
          "kyurem",
          "xerneas",
          "yveltal",
          "zygarde",
          "tapu koko",
          "tapu lele",
          "tapu bulu",
          "tapu fini",
          "nihilego",
          "buzzwole",
          "pheromosa",
          "xurkitree",
          "celesteela",
          "kartana",
          "guzzlord",
          "poipole",
          "naganadel",
          "staktaka",
          "blacephalon",
          "cosmog",
          "cosmoem",
          "solgaleo",
          "lunala",
          "necrozma",
          "heatran",
          "jirachi",
          "deoxys",
          "phione",
          "manaphy",
          "darkrai",
          "shaymin",
          "arceus",
          "victini",
          "meoletta",
          "genesect",
          "diancie",
          "hoopa",
          "volcanion",
          "magearna",
          "marshadow",
          "zeraora"
        ];
        if (legendaries.includes(catchmon))
          Embed.setAuthor(
            `${
              message.author.username
            } just caught an ${catchmon.capitalize()}`,
            "https://orig05.deviantart.net/23a0/f/2014/103/1/8/master_ball__02__by_adfpf1-d7ea627.png"
          );
        console.log(getId(catchmon));

        message.channel.send(Embed);
      }

      db.add(`balance_` + message.author.id, 1000);
      console.log(catchmon);
      db.push(`pokemons_` + message.author.id, catchmon)
      db.set(`latestPokemon_` + message.author.id, catchmon)
      await db.set(`catchpokemon_` + message.channel.id, null)
      await db.add(`alltimecatches_` + message.author.id, 1)
      
      /*const option = {
        url: `https://pokeapi.co/api/v2/pokemon/${catchmon}`,
        json: true
      };

      get(option).then(async body => {
        let hpBase = body.stats[0].base_stat;
        let atkBase = body.stats[1].base_stat;
        let defBase = body.stats[2].base_stat;
        let spatkBase = body.stats[3].base_stat;
        let spdefBase = body.stats[4].base_stat;
        let speedBase = body.stats[5].base_stat;

        let level = Math.floor(Math.random() * 50 + 1);
        let stat1 = 1;
        let stat2 = 1;
        let stat3 = 1;
        let stat4 = 1;
        let stat5 = 1;
        let stat6 = 1;

        let fhp = Math.round(
          (2 * hpBase + stat1 + (0 / 4) * level) / 100 + level + 10
        );
        let fatk = Math.round(
          ((2 * atkBase + stat2 + (0 / 4) * level) / 100 + 5) * 1
        );
        let fdef = Math.round(
          ((2 * defBase + stat3 + (0 / 4) * level) / 100 + 5) * 1
        );
        let fspatk = Math.round(
          ((2 * spatkBase + stat4 + (0 / 4) * level) / 100 + 5) * 1
        );
        let fspdef = Math.round(
          ((2 * spdefBase + stat5 + (0 / 4) * level) / 100 + 5) * 1
        );
        let fspeed = Math.round(
          ((2 * speedBase + stat6 + (0 / 4) * level) / 100 + 5) * 1
        );
        let totaliv = Math.round(
          ((stat1 + stat2 + stat3 + stat4 + stat5 + stat6) / 186) * 100
        );
        const totalivs = Math.floor(Math.round(totaliv));
        const finaliv = Math.round(totaliv.toFixed(2));

        let final = `${catchmon}_${fhp}_${fatk}_${fdef}_${fspatk}_${fspdef}_${fspeed}_${finaliv}`;

        db.push(`pokemons_` + message.author.id, final);

        let info = final.split(/_+/g);
        message.channel.send(`${info[0]} ${info[1]} ${info[2]} ${info[3]} ${info[4]} ${info[5]} ${info[6]} ${info[7]}`);
        let pokemon = db.fetch(`pokemons_` + message.author.id);
        num++
        
        let f = pokemon[1].split(/_+/g);
        await message.channel.send(f[0]);
        
        
        
      });*/
    } else {
      message.channel.send("Thats the wrong pokemon!");
    }
  }
};
