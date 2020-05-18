var config = {};

config.database = {};
config.database.db_host_name = '139.99.213.14';
config.database.db_master_user = 'gurvinder';
config.database.db_master_password = 'P9uMtN$pV5!c87';
config.database.db_name = 'lootvpn';
config.database.port= '3306';







//routing
config.routing = {};
config.routing.common_route = '/loot';


//routing
config.jwt = {};
config.jwt.secret_key = '37LvDSm4XvjYOh9Y';
config.jwt.expires_in = '100m';


//port
config.server_port = 4000;


module.exports = config;
