const mongoose = require("mongoose");


const muteSchema = mongoose.Schema({
    serverID: String,
    roleID: String,
})


module.exports = mongoose.model("MuteRole", muteSchema);