const mongoose = require("mongoose");


const warnSchema = mongoose.Schema({
    Warns: Array,
    User: Array,
    Guild: Array,
})


module.exports = mongoose.model("Warn", warnSchema);