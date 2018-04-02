# Contributing to ElastAlert Server
**Do you want to contribute to our ElastAlert Server or issue an issue? Great! Since we hate rejecting pull requests or ask you to describe your issue more clearly, please read these guidelines carefully:**

## Filing an issue
- Describe your issue clearly. 
- When issuing a bug, please provide steps on how to recreate the bug if possible. 
- If you get an error, include the error in your issue

We seriously appreciate thoughtful comments. If an issue is important to you, add a comment with a solid write up of your use case and explain why it's so important. Please avoid posting comments comprised solely of a thumbs up emoji :+1:.

Granted that you share your thoughts, we might even be able to come up with creative solutions to your specific problem. If everything you'd like to say has already been brought up but you'd still like to add a token of support, feel free to add a :+1: [thumbs up reaction](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments) on the issue itself and on the comment which best summarizes your thoughts.

## Contributing code
First and foremost, before you start working on any code, please **check the issues and file an issue first**. Someone could already be working on your problem or we need to tell you about some known issues before working on the pull request.

We enjoy working with contributors to get their code accepted. There are many approaches to fixing a problem and it is important to find the best approach before writing too much code.

### Setting up the development environment
First, fork this repository and clone it:

```bash
git clone https://github.com/[YOUR_USERNAME]/elastalert.git elastalert
cd elastalert
```

Then follow the default installation steps, so:

1. Run `nvm install "$(cat .nvmrc)"` to install & use the required NodeJS version.
2. Run `npm install` to install all the dependencies.
3. Look at the `Config` section in [REAMDE.md](../README.md#config) to setup the path to your ElastAlert instance.

### Linting
We use [ESLint](http://eslint.org/) to ensure the that the [Styleguide](../STYLEGUIDE.md) is being followed so we suggest you integrate it in your code editor to get live feedback.

Here are some hints for getting eslint setup in your favorite editor:

Editor     | Plugin
-----------|-------------------------------------------------------------------------------
Sublime    | [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint#installation)
Atom       | [linter-eslint](https://github.com/AtomLinter/linter-eslint#installation)
IntelliJ   | Settings » Languages & Frameworks » JavaScript » Code Quality Tools » ESLint
`vi`       | [scrooloose/syntastic](https://github.com/scrooloose/syntastic)

Another tool we use for enforcing consistent coding style is EditorConfig, which can be set up by installing a plugin in your editor that dynamically updates its configuration. Take a look at the [EditorConfig](http://editorconfig.org/#download) site to find a plugin for your editor, and browse our [`.editorconfig`](https://github.com/elastic/kibana/blob/master/.editorconfig) file to see what config rules we set up.

### Testing and Building
To ensure that your changes will not break other functionality, please run the test suite and build process before submitting your Pull Request.

Before running the tests you will need to install the projects dependencies as described above.

Once that's done, just run:

```bash
npm run test && npm run build
```

### Writing a new API (route)
If you want to write a new REST API service, please be sure to follow these steps:

1. Add your route to [routes overview](../src/routes/routes.js) by adding an object to the array in the following form:
    ```javascript
    {
      // The path to the endpoint, can only be a string. The following example would be accessible through (by default) https://localhost:3030/new_endpoint
      path: 'new_endpoint',
      
      // The method the endpoint supports, can be either a string or an array containing method strings. 
      // The allowed methods are mentioned in the [Express JS Routing Method Documentation](http://expressjs.com/en/4x/api.html#routing-methods), 
      // but we suggest sticking to 'GET', 'POST', 'PUT', 'PATCH' and 'DELETE'.
      method: 'GET',
      
      // The handlers for each method. If you provide the methods in an array, you should provide an array with the same length to this property as well. 
      // Never write inline functions, allways import from '../handlers'.
      handler: statusHandler
    }
    ```
2. Write a handler for the route in the [routes handlers folder](../src/handlers) making a folder corresponding with the route. So if you add a route with path 'example/route' you should put the handler file in 'src/handlers/example/route/'.  
    > When you only have one method, use `index.js` as the filename. Otherwise use the method as the filename, e.g. `get.js` or `post.js`.
    
    > Take a look at the [example handler](../src/handlers/example_handler.js) for an example and more detailed documentation on how to write a handler.
    
> Note that the code in a handler should be brief and readable, in most cases it should only use api calls on an instance of a controller in the [controllers folder](../src/controllers) obtained through the server. Shared utilities / services used by multiple controllers or handlers (like error classes and abstract classes) should be added to the [common folder](../src/common).

### Writing a controller
Controllers expose API that can be used by the handlers. There are a couple things to keep in mind when writing a controller. A controller should:

- be a class named `[controllerName]Controller`
- use a logger to log important stuff. You can create a new logger by:

    ```javascript
    import Logger from 'path/to/common/logger';
    let logger = new Logger('[className]');
    ```
    
- have an instance of it accessible by the `ElastalertServer`. In the `start()` function in the [`ElastalertServer`](../src/elastalert_server.js) you see 

    ```javascript
    config.ready(function () {
      try {
        //...
      } catch (error) {
        logger.error('Starting server failed with error:', error);
      }
    });
    ```
    You should add an instance of your controller there:
    
    ```javascript
    self._controllerNameController = new controllerName();
    ```
    
    You should also provide a getter for the controller:
    
    ```javascript
    get controllerNameController() {
      return this._controllerNameController;
    }
    ```

### Contributing checklist
1. **Did you [run the tests & builds as shown above](#testing-and-building) and [make sure it follows the styleguide](#linting)?**
2. **If you made a new feature, did you think about making it configurable?**
      
      Always make sure the feature can be ran on any environment by providing config options for environment specific settings. 
    > If you add a config option, check that you add it in the [config schema](../src/common/config/schema.js), the [config example](../config/config.example.json) and the [config section in readme](../README.md#config).
3. **Did you make sure you saved all your dependencies with `npm install [packageName] --save`?**
4. **Did you write tests for the code you wrote?**
    > If you have any questions about writing tests, let us know by sending an e-mail to [dev@bitsensor.io](mailto:dev@bitsensor.io).
5. **Did you document the code you wrote?**

      Especially when writing a controller with an API, please provide a little documentation on the API functions using the [JSDoc](http://usejsdoc.org/) comment style.
6. **Did you have fun writing your code?**
      
      We know that this list is quite long. If you want to contribute code but don't have the time to write tests or documentation, please mention that in the pull request. We'll still be happy with your contribution and we'll write the tests / documentation ourselves!
      
#### Thanks in advance,
#### The BitSensor Team