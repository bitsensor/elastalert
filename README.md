# Elastalert Server 0.0.5

**A server that runs [ElastAlert](https://github.com/Yelp/elastalert) and exposes REST API's for manipulating rules and alerts. It works great in combination with our [ElastAlert Kibana plugin](https://git.bitsensor.io/front-end/elastalert-kibana-plugin).**

## Requirements
- [ElastAlert v0.0.96](https://github.com/Yelp/elastalert/tree/v0.0.96). We don't support other versions of ElastAlert, use them at your own risk.
- [NodeJS 4.5.0](https://nodejs.org/en/download/) with NPM & NVM.

## Installation
- Run `nvm install "$(cat .node-version)"` to install & use the required NodeJS version.
- Run `npm install` to install all the dependencies.

Now, you can run  the server with `npm start`. By default the server runs on http://localhost:3030.

## Building
If you want to build the server and run the build version:

- Run the installation guide shown above
- Run `npm run build`

You can then start the build by running `node lib/index.js`.

## Config
In `config/config.example.json` you'll find the default config. You can make a `config.json` file in the same folder that overrides the default config. When forking this repository it is recommended to remove `config.json` from the `.gitignore` file. For local testing purposes you can then use a `config.dev.json` file which overrides `config.json`.

You can use the following config options:

```javascript
{
  // The name of the app / server, used by the logging framework.
  "appName": "elastalert-server",
  
  // The port to bind to
  "port": 3030,
  
  // The path to the root ElastAlert folder. It's the folder that contains the `setup.py` script and the `config.yaml.example` file.
  "elastalertPath": "/opt/elastalert",
  
  /* The path to the rules folder containing all the rules. If the folder is empty a dummy file will be created to allow ElastAlert to start.
   * - relative:
   *   Whether to use a path relative to the `elastalertPath` folder.
   * - path:
   *   The path to the rules folder.
   */
  "rulesPath": {
    "relative": true,
    "path": "/rules"
  },
  
  /* The path to a folder that the server can use to store data and temporary files.
   * - relative:
   *   Whether to use a path relative to the `elastalertPath` folder.
   * - path:
   *   The path to the data folder.
   */
  "dataPath": {
    "relative": true,
    "path": "/server_data"
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
  
    ```json
    {
      "yaml": "[[ The full yaml rule config ]]"
    }
    ```
- **DELETE `/rules/:id`**
  Where `:id` is the id of the rule returned by **GET `/rules`**, which will delete the given rule.
- **POST `/test`**
  This allows you to test a rule. The body send should be:
  
    ```javascript
    {
      // Required
      "rule": "[[ The full yaml rule config ]]",
      
      // Optional
      "options": {
      
        // Can be either "all", "schemaOnly" or "countOnly". "all" will give the full console output. "schemaOnly" will only validate the yaml config. "countOnly" will only find the number of matching documents and list available fields.
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
 
## Contributing
Want to contribute to this project? Great! Please read our [contributing guidelines](https://git.bitsensor.io/back-end/elastalert/blob/master/CONTRIBUTING.md) before submitting an issue or a pull request.

**We only accept pull requests on our [GitHub repository](http://TODO)!**
 
## License
This project is [MIT Licensed](https://git.bitsensor.io/back-end/elastalert/blob/master/LICENSE.md).

## Disclaimer
We [(BitSensor)](https://www.bitsensor.io) do not have any rights over the original [ElastAlert](https://github.com/Yelp/elastalert) project from [Yelp](https://www.yelp.com/).