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
We use [ESLint](http://eslint.org/) to ensure the that the [Styleguide](../STYLEGUIDE.md) 