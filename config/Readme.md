Configuration
-------------

This appliation operates in a Node running environment (~v8.16.2) as of this writing) and uses [config](https://www.npmjs.com/package/config) for user specific settings.  The application can be operated locally or remotely.  Configurations for each differ slightly depending on your setup and platform choice.  This document outlines a couple different options.

# Local Deployment
Config by default looks to a ./config folder relative to root to locate its configuration settings.  Running a local development instance can be easily done by utilizing the ./config/local.js example provided.  Other files types can include .properties, .json, .yml or others.  See [config file specific](https://github.com/lorenwest/node-config/wiki/Configuration-Files) docs for additional details.

# Remote Deployment (i.e. linux, docker, etc)
One should avoid including any sensitive configuration credentials or keys to remote deployment.  Therefore, this application utilizes the config [Custom Environment](https://github.com/lorenwest/node-config/wiki/Environment-Variables#custom-environment-variables) options to pull the basic required Braintree credentials into the running application.

That said, in order to set your environment variables, follow these steps:  
1. Review the file [config/custom-environment-variables.json](./custom-environment-variables.json) to understand which environment variables should be set.
2. On your target environment, set - export or otherwise - the environment variables below in the context of your Node runtime environment:  
   * MERCHANT_ID
   * PUBLIC_KEY
   * PRIVATE_KEY

# Heroku Deployment
Heroku is essentially a remote linux operating environment and provides a few different facities (cli, programmatic, Heroku console) for setting environment variables.  See the file [config/custom-environment-variables.json](./custom-environment-variables.json) for the required variables.

Docs on Heroku environment variable maninuplation can be found [here](https://devcenter.heroku.com/articles/config-vars). I suggest using the ```application >> settings >> config vars``` as the quickest path. 

```
# EXAMPLE HEROKU CLI FOR SETTING ENVIRONMENT VARIABLES
heroku config:set MERCHANT_ID=[PUT ID HERE] \
PUBLIC_KEY=[PUT PUBLIC KEY HERE] \
PRIVATE_KEY=[PUT PRIVATE KEY HERE] --remote heroku
```
