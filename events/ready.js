const discord = require('discord.js');
const config = require('../config.json')
  
module.exports = client => {
console.log(`Online`) +

client.user.setActivity("?help", {type: "WATCHING"});

}