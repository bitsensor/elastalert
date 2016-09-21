# Contributing to ElastAlert Server
**Do you want to contribute to our ElastAlert server or issue an issue? Great! Since we hate rejecting pull requests or ask you to describe your issue more clearly, please read these guidelines carefully:**

## Filing an issue
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

1. Run `nvm install "$(cat .node-version)"` to install & use the required NodeJS version.
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
