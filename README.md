# Elastalert Server
**A server that runs [ElastAlert](https://github.com/Yelp/elastalert) and exposes REST API's for manipulating rules and alerts. It works great in combination with our [ElastAlert Kibana plugin](https://github.com/bitsensor/elastalert-kibana-plugin).**

## Docker installation
The default configuration uses localhost as ES host. You will want to mount the volumes for configuration and rule files to keep them after container updates. In order to do that conviniently, please do a `git clone https://github.com/bitsensor/elastalert.git; cd elastalert`

### Bash
```bash
docker run -d -p 3030:3030 \
    -v `pwd`/config/elastalert.yaml:/opt/elastalert/config.yaml \
    -v `pwd`/config/config.json:/opt/elastalert-server/config/config.json \
    -v `pwd`/rules:/opt/elastalert/rules \
    -v `pwd`/rule_templates:/opt/elastalert/rule_templates \
    --net="host" \
    --name elastalert bitsensor/elastalert:latest
```

### Fish
```bash
docker run -d -p 3030:3030 \
    -v (pwd)/config/elastalert.yaml:/opt/elastalert/config.yaml \
    -v (pwd)/config/config.json:/opt/elastalert-server/config/config.json \
    -v (pwd)/rules:/opt/elastalert/rules \
    -v (pwd)/rule_templates:/opt/elastalert/rule_templates \
    --net="host" \
    --name elastalert bitsensor/elastalert:latest
```
### Configuration
#### ElastAlert parameters
ElastAlert supports additional arguments, that can be passed in the `config.json` file. An example is given in `config/config-historic-data-example.json`. 

## Installation using npm and manual ElastAlert setup

### Requirements
- [ElastAlert v0.0.96](https://github.com/Yelp/elastalert/tree/v0.0.96). We don't support other versions of ElastAlert, use them at your own risk.
- [NodeJS 4.5.0](https://nodejs.org/en/download/) with NPM & NVM.

## Building from source
1. Clone the repository
    ```bash
    git clone https://github.com/bitsensor/elastalert.git elastalert
    cd elastalert
    ```
2. Run `nvm install "$(cat .nvmrc)"` to install & use the required NodeJS version.
3. Run `npm install` to install all the dependencies.
4. Look at the `Config` section to setup the path to your ElastAlert instance.

Now, you can run  the server with `npm start`. By default the server runs on http://localhost:3030.

## Building
If you want to build the server and run the build version:

1. Run the installation guide shown above
2. Run `npm run build`

You can then start the build by running `node lib/index.js`.

### Install ElastAlert to /opt/elastalert
And run `pip install -r requirements.txt` or read the installation guide of ElastAlert.

### Config
In `config/config.example.json` you'll find the default config. You can make a `config.json` file in the same folder that overrides the default config. When forking this repository it is recommended to remove `config.json` from the `.gitignore` file. For local testing purposes you can then use a `config.dev.json` file which overrides `config.json`.

You can use the following config options:

```javascript
{
  "appName": "elastalert-server", // The name used by the logging framework.
  "port": 3030, // The port to bind to
  "elastalertPath": "/opt/elastalert",  // The path to the root ElastAlert folder. It's the folder that contains the `setup.py` script.
  "start": "2014-01-01T00:00:00", // Optional date to start querying from
  "end": "2016-01-01T00:00:00", // Optional date to stop querying at
  "verbose": true, // Optional, will increase the logging verboseness, which allows you to see information about the state of queries.
  "es_debug": true, // Optional, will enable logging for all queries made to Elasticsearch
  "debug": false, // Will run ElastAlert in debug mode. This will increase the logging verboseness, change all alerts to DebugAlerter, which prints alerts and suppresses their normal action, and skips writing search and alert metadata back to Elasticsearch.
  "rulesPath": { // The path to the rules folder containing all the rules. If the folder is empty a dummy file will be created to allow ElastAlert to start.
    "relative": true, // Whether to use a path relative to the `elastalertPath` folder.
    "path": "/rules" // The path to the rules folder. 
  },
  "templatesPath": { // The path to the rules folder containing all the rule templates. If the folder is empty a dummy file will be created to allow ElastAlert to start.
    "relative": true, // Whether to use a path relative to the `elastalertPath` folder.
    "path": "/rule_templates" // The path to the rule templates folder.
  },
  "dataPath": { // The path to a folder that the server can use to store data and temporary files.
    "relative": true, // Whether to use a path relative to the `elastalertPath` folder.
    "path": "/server_data" // The path to the data folder.
  }
}
```
 
## API
This server exposes the following REST API's:

- **GET `/`**

    Exposes the current version running
  
- **GET `/status`**

    Returns either 'SETUP', 'READY', 'ERROR', 'STARTING', 'CLOSING', 'FIRST_RUN' or 'IDLE' depending on the current ElastAlert process status. 
  
- **GET `/status/control/:action`**

    Where `:action` can be either 'start' or 'stop', which will respectively start or stop the current ElastAlert process.
  
- **[WIP] GET `/status/errors`**

    When `/status` returns 'ERROR' this returns a list of errors that were triggered.
  
- **GET `/rules`**

    Returns a list of directories and rules that exist in the `rulesPath` (from the config) and are being run by the ElastAlert process.
  
- **GET `/rules/:id`**

    Where `:id` is the id of the rule returned by **GET `/rules`**, which will return the file contents of that rule.
  
- **POST `/rules/:id`**

    Where `:id` is the id of the rule returned by **GET `/rules`**, which will allow you to edit the rule. The body send should be:
  
      ```javascript
      {
        // Required - The full yaml rule config.
        "yaml": "..."
      }
      ```
    
- **DELETE `/rules/:id`**

    Where `:id` is the id of the rule returned by **GET `/rules`**, which will delete the given rule.

- **GET `/templates`**

    Returns a list of directories and templates that exist in the `templatesPath` (from the config) and are being run by the ElastAlert process.
  
- **GET `/templates/:id`**

    Where `:id` is the id of the template returned by **GET `/templates`**, which will return the file contents of that template.
  
- **POST `/templates/:id`**

    Where `:id` is the id of the template returned by **GET `/templates`**, which will allow you to edit the template. The body send should be:
  
      ```javascript
      {
        // Required - The full yaml template config.
        "yaml": "..."
      }
      ```
    
- **DELETE `/templates/:id`**

    Where `:id` is the id of the template returned by **GET `/templates`**, which will delete the given template.
  
- **POST `/test`**

    This allows you to test a rule. The body send should be:
  
      ```javascript
      {
        // Required - The full yaml rule config.
        "rule": "...",
        
        // Optional - The options to use for testing the rule.
        "options": {
        
          // Can be either "all", "schemaOnly" or "countOnly". "all" will give the full console output. 
          // "schemaOnly" will only validate the yaml config. "countOnly" will only find the number of matching documents and list available fields.
          "testType": "all",
          
          // Can be any number larger than 0 and this tells ElastAlert over a period of how many days the test should be run
          "days": "1"
          
          // Whether to send real alerts
          "alert": false
        }
      }
      ``` 
    
- **[WIP] GET `/config`**

    Gets the ElastAlert configuration from `config.yaml` in `elastalertPath` (from the config).
  
- **[WIP] POST `/config`**

    Allows you to edit the ElastAlert configuration from `config.yaml` in `elastalertPath` (from the config). The required body to be send will be edited when the work on this API is done.

- **[WIP] POST `/download`**
  
    Allows you to download .tar archive with rules from HTTP endpoint. Archive will be downloaded,extracted and removed.
    Please note, body should contain URL pointing to tar archive, with tar extension.	
   
    Usage example:
	
        ```curl -X POST localhost:3030/download -d "url=https://artifactory.com:443/artifactory/raw/rules/rules.tar"```
 	
        
## Contributing
Want to contribute to this project? Great! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting an issue or a pull request.

**We only accept pull requests on our [GitHub repository](https://github.com/bitsensor/elastalert)!**
 
## Contact
We'd love to help you if you have any questions. You can contact us by sending an e-mail to [dev@bitsensor.io](mailto:dev@bitsensor.io) or by using the [contact info on our website]().
 
## License
This project is [BSD Licensed](../LICENSE.md) with some modifications. Note that this only accounts for the ElastAlert Server, not ElastAlert itself ([ElastAlert License](https://github.com/Yelp/elastalert#license)).

## Disclaimer
We [(BitSensor)](https://www.bitsensor.io) do not have any rights over the original [ElastAlert](https://github.com/Yelp/elastalert) project from [Yelp](https://www.yelp.com/). We do not own any trademarks or copyright to the name "ElastAlert" (ElastAlert, however, does because of their Apache 2 license). We do own copyright over the source code of this project, as stated in our BSD license, which means the copyright notice below and as stated in the BSD license should be included in (merged / changed) distributions of this project. The BSD license also states that making promotional content using 'BitSensor' is prohibited. However we hereby grant permission to anyone who wants to use the phrases 'BitSensor ElastAlert Plugin', 'BitSensor Software' or 'BitSensor Alerting' in promotional content. Phrases like 'We use BitSensor' or 'We use BitSensor security' when only using our ElastAlert Server are forbidden.

## Copyright
Copyright © 2018, BitSensor B.V.
All rights reserved.
