const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
    serverName: String,
    serverID: String,
    logChannelID: String,
})


module.exports = mongoose.model("Logs", logSchema);