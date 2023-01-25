
[![MIT License][license-shield]][license-url]
![webpack-current](https://img.shields.io/badge/webpack-v5.73.0-green?logo=webpack)
![node-current (scoped)](https://img.shields.io/node/v/@weareathlon/frontend-webpack-boilerplate)


<!-- PROJECT LOGO -->
<p  align="center">
  <img src="logo-webpack.png" alt="Logo" width="80">
</p>

<h3 align="center">Webpack5 multi-page template</h3>

## Demo
[Static multi page](https://helgazhizhka.github.io/static-multi-html-webpack/index.html)
<!-- ABOUT THE PROJECT -->
## About


This build is based on a single template from which all pages are inherited. As well as components that can be included in pages. 
Particular attention was paid to the fact that in development mode rebuild all modules html.

### Built With

[![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)][Webpack-url]
[![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)][Sass-url]


## Features
* **Simple setup** instructions
  * Start development static mutli-page  project with **simple**, **configured**, **linter enabled**, **browser synced** asset files.
* Configuration per **environment**
  * `development` - [`sourcemaps`](https://webpack.js.org/configuration/devtool/), [`browser synced developmentment server`](https://webpack.js.org/configuration/dev-server/)
  * `production` - [`minification`](https://webpack.js.org/plugins/terser-webpack-plugin/), [`sourcemaps`](https://webpack.js.org/configuration/devtool/)
* Configurable **browsers versions support**. Uses [`.browserslistrc`](https://github.com/browserslist/browserslist#full-list)


* The built CSS / JavaScript files will respect the **configured supported browser versions** using the following tools:

  * [`Sass`](https://sass-lang.com/guide) - preprocessing css files. Use 7-1 Pattern for architecture
  * [`babel-preset-env`](https://babeljs.io/docs/en/babel-preset-env) - smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms.
* Support for **assets optimization** for production environment with ability to configure:
  * **Code Minification** of *JavaScript* and *CSS* processed files.
  * **Images Optimisation** - optimize `jpeg`, `jpg`, `png`, `gif`, `svg` filesize and loading type via [`imagemin`](https://github.com/imagemin/imagemin). Plugin and Loader for webpack to optimize (*compress*) all images using `imagemin`. Do not worry about size of images, now they are always optimized/compressed.
* Support for **source code syntax style and formatting linters** that analyze source code to flag any programming errors, bugs, stylistic errors or suspicious constructs:
  * **SASS syntax checker** - you can change or add additional rules in `.sasslintrc` file. Configuration options can be found on [`sass-lint`](https://github.com/sasstools/sass-lint/blob/master/lib/config/sass-lint.yml) documentation.
  * **JavaScript syntax checker** - following the `airbnb` style, you can review and configure the rules in `.eslintrc` file. Configuration options can be found on [`eslint`](https://eslint.org/docs/user-guide/configuring) documentation.
* Latest [Webpack 5](https://github.com/webpack/webpack) - *JavaScript* module bundler.
* Latest [SASS](https://github.com/sass/sass) compiler based on Dart `sass`.
* Latest [Babel 7](https://github.com/babel/babel) (`@babel/core`) - JavaScript compiler - _Use next generation JavaScript, today._

* Configured and ready to use **Webpack Dev Server** plugin for faster local development - [`webpack-dev-server`](https://webpack.js.org/configuration/dev-server/)
* Integration with [Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) - _Visualize size of webpack output files with an interactive zoomable treemap._
[HtmlWebpackPartialsPlugin] - to add support for partials or templates.
[ExtraWatchWebpackPlugin] - help you to attach extra files or dirs to webpack's watch system
[TerserWebpackPlugin] - to minimize the script in production mode

# Setup

## Installation

<!-- 1. Choose and download the latest template release from [List of Releases](https://github.com/WeAreAthlon/frontend-webpack-boilerplate/releases). -->
1. Download latest template release or clone this. Rename it to your project name and browse the directory.
3. Install all dependencies using `npm` * install* command. 

```sh 
$ npm i
```

## Define Package Metadata

* Amend `package.json` file and optionally specify:
  * `name` - Name of your project. A name can be optionally prefixed by a scope, e.g. `@myorg/mypackage`.
  * `version` - Specify and maintain a version number indicator for your project code.
  * `author` - Your organisation or just yourself. You can also specify [`contributors`](https://docs.npmjs.com/files/package.json#people-fields-author-contributors).
  * `description` - Short description of your project.
  * `keywords` - Put keywords in it. It’s an array of strings.
  * `repository` - Specify the place where your code lives.
  * `license` - Announce your code license, figure out the license from [Choose an Open Source License](https://choosealicense.com) .

* Amend `.browserslistrc` file :
  * Specify the supported browsers versions - you can refer to [full list](https://github.com/browserslist/browserslist#full-list) of availalbe options.

# Configuration

## Environment Configuration

* Edit the [`webpack.config.js`](webpack.config.js) if you want to specify:
  * **`server`**: configure development server, specify `host`, `port`. Refer to the full development server configuration options for [`webpack-dev-server`](https://webpack.js.org/configuration/dev-server/).
  * **`limits`**: configure file size thresholds for assets optimizations.
    * Image/Font files size in bytes. Below this value the image file will be served as Data URL (_inline base64_).
  * **`paths`**: `src` or `dist` directories names and file system location.

## Additional `webpack` configuration

You can additionally configure `webpack` for specific environment:
* `development` - [`webpack.config.js`](webpack.config.js)
* `production` - [`webpack.config`](webpack.config.js)
* `HtmlWebpackPartialsPlugin` - [`webpack.config`] - to add components for static pages
# Development

## Assets Source

* **SASS** files are located under `src/scss/`
* **JavaScript** files with support of latest ECMAScript _ES6 / ECMAScript 2016(ES7)/ etc_ files are located under `src/js/`
* **Image** files are located under `src/images/`
* **Font** files are located under `src/fonts/`
* **HTML** files are located under `src/views`
  * `src/views/layout.html`– this is the **main html template** from which all pages will be inherited. 
  * under `src/views/pages` all html pages 
  * under `src/views/components` all components for pages
  * It will **automatically** build **all HTML files** placed under `src/views/pages` directory, no need to manually configure each template anymore!

## Entry

Each new standalone page only needs to create a file `[name].html` under `pages`.

```
├── package.json
└── src
    └── views
        ├── pages
        │   ├── about.html
        │   └── index.html
        └── components
            ├── footer.html
            ├── nav.html
```
## Build Assets

Optimize assets for production by:

```sh
$ npm run production
```


Start a development server - reloading automatically after each file change.

```sh
$ npm run start
```

Development build by:

```sh
$ npm run dev
```

## Get Built Assets

* _CSS_ files are located under `/public/css/`
* _JavaScript_ files with support of _ES6 / ECMAScript 2016(ES7)_ files are located under `/public/js/`
* _Images_ are located under `/public/images/`
* _Fonts_ are located under `/public/fonts/`
* _HTML_ files are located under `/public/`

# Run Code Style Linters

## SASS

```sh
$ npm run lint:sass
```
## JavaScript

```sh
$ npm run lint:js
``` 

## Run Assets Bundle Analyzer

```sh
$ npm run stats
```

> This will open the visualisaion on the default configuraiton URL `localhost:8888`, you can change this URL or port following the [package](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-cli) documentation.


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Continuous Integration [![Travis](https://img.shields.io/travis/thinking-home/migrator.svg)](https://travis-ci.org/thinking-home/migrator)
This boilerplate template contains integration with Travis CI. The build system runs all linting scripts and deploys production optimized pages to GitHub pages upon push to the master branch
[Deployments history](https://github.com/HelgaZhizhka/static-multi-html-webpack/deployments)

<!-- CONTACT -->
## Contact

#### Olga Zhyzhka - [![LinkedIn][linkedin-shield]][linkedin-url] 

helgazhyzhka@gmail.com

[@helgaj](https://t.me/helgaj) - https://t.me/helgaj

[helgawebmentor](https://vk.com/web_mentor_forstart) 


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/helgazhyzhka/

[Webpack-url]: https://webpack.js.org/
[Sass-url]: https://sass-lang.com/
[HtmlWebpackPartialsPlugin]: https://github.com/colbyfayock/html-webpack-partials-plugin
[ExtraWatchWebpackPlugin]: https://github.com/pigcan/extra-watch-webpack-plugin
[TerserWebpackPlugin]: https://webpack.js.org/plugins/terser-webpack-plugin/
