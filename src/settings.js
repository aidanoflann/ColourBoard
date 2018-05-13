// Try to fetch any local_settings (file may not be present - and shouldn't be in prod)
let local_settings = require("./local_settings.js") || {};

let settings = {
    redis_host: process.env.REDIS_HOST || 0,
    redis_port: process.env.REDIS_PORT || 0,
};

// overwrite any keys in settings with values found in local_settings
module.exports=Object.assign(settings, local_settings);