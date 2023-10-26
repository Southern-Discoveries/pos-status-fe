const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  const envConfig = {
    /* common config variables */
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // Development mode
    const devEnv = require('dotenv').config({
      path: './.env.local',
    }).parsed;

    Object.assign(envConfig, devEnv);
  } else {
    // Production mode
    const prodEnv = require('dotenv').config({
      path: './.env.prod',
    }).parsed;

    Object.assign(envConfig, prodEnv);
  }

  return {
    env: envConfig,
  };
};