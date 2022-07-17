# Static Template

![Version](https://img.shields.io/badge/version-v1.0.0-blue.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#) ![Maintainer](https://img.shields.io/badge/maintainer-James%20Ocariza-green.svg)

This repo serves as a starter template for [static web pages](https://en.wikipedia.org/wiki/Static_web_page).Instead creating your own front-end architecture, use this for quick and easy development.

##### Table of Contents

- [Static Template](#static-template)
        - [Table of Contents](#table-of-contents)
  - [<a name='Prerequisites'></a> :pushpin: Prerequisites](#-pushpin-prerequisites)
  - [<a name='Installing'></a> :rocket: Installing Static Template](#-rocket-installing-static-template)
  - [<a name='Usage'></a>:computer: How to run scss](#computer-how-to-run-scss)
        - [Code Block:](#code-block)
  - [<a name='Additional'></a> :paperclip: Additional Info](#-paperclip-additional-info)
    - [:warning:  <a name='Errors'></a>Errors](#warning--errors)
  - [<a name='Acknowledgements'></a>:two_hearts: Acknowledgements and References](#two_hearts-acknowledgements-and-references)
  - [<a name='Credits'></a> :mailbox: Credits](#-mailbox-credits)
  - [<a name='Contribute'></a> :handshake: Contribute](#-handshake-contribute)


## <a name='Prerequisites'></a> :pushpin: Prerequisites

Before you begin, ensure you have met the following requirements:

- If you're using __`Windows 10`__ please use this [NVM](https://github.com/coreybutler/nvm-windows/releases).

| Tool                                                                 | Version | Description                                                                           |
| -------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------- |
| [NVM](https://github.com/coreybutler/nvm-windows/releases) | latest  | Node version manager for fast switching node version                                  |
| Node                                                                 | 14.15.0 | Install Node via [NVM](https://github.com/coreybutler/nvm-windows/releases) |

:warning: If you have Node in your local machine please delete and reinstall it using the NVM.

## <a name='Installing'></a> :rocket: Installing Static Template

To install Static template in your local machine, run this following script in your terminal:

**Windows**:

```sh
 git clone https://github.com/hipe-japan-inc/static_template.git
```

:warning: __Optional :__ If you have Node in your local machine please delete and reinstall it using the NVM.

## <a name='Usage'></a>:computer: How to run scss
1. go to **`src/`** in terminal __(recommended : bash)__.
2. run **`npm install`**. If npm is missing please refer to the __Prerequisites__.
3. verify if gulp is working. **`gulp --tasks`**
4. after the dependencies installed, run __`gulp build`__ or __`gulp rebuild`__ then __`gulp sync`__

Note: **`gulp --tasks`** will display all posible gulp options. If dealing with .php instead of .html use __`gulp watch`__

##### Code Block:

```sh
cd src
npm install
gulp build # Or gulp rebuild
gulp sync #if html else use gulp watch
```

When you run this scripts it will generate a bundled file to `public/` folder.

:warning: You must only edit in __`src/`__ folder to avoid confusion.

## <a name='Additional'></a> :paperclip: Additional Info

Additional information about Static template

- `src/` is the main source code
- `public/` is the dist folder of compressed file from `src/`.
  - `release/mini/**/*.css`  [ minified version of css ] 
  - `release/tiny/**/*.(png,jpg,etc.)`  [ minified version of images ] 
  - `release/ugly/**/*.js` this refers a compressed javascript

1. For maintaining the integrity of the images please put it under `src/image/raw/**`, This will generate a directory `public/release/tiny/raw/**`
2. For generating the iconfont put the __`icon_name`__ to __`src/icons`__ and run __`gulp rebuild`__
3. For generating vendor you can put it inside __`src/vendor`__ and run __`gulp vendor`__ to copy it in release folder. Expected result : __`public/vendor/gulp/**`__
4. For release to production try running __`gulp purge`__ to clean the release css and remove unused css.

### :warning:  <a name='Errors'></a>Errors

If you encounter this problem `bash gulp command not found`, Try running the command below to the terminal.

```sh
#Installing the gulp in global scope.
npm install --global gulp-cli 
```

## <a name='Acknowledgements'></a>:two_hearts: Acknowledgements and References

- This is made by [James Ocariza](https://github.com/CatMeowlet/).

## <a name='Credits'></a> :mailbox: Credits

- [James Ocariza](https://github.com/CatMeowlet/) - Creator of Static template
- [EJ Anton S. Potot](https://github.com/ezio1404/) - Improving the document

## <a name='Contribute'></a> :handshake: Contribute

Contributions, issues and feature requests are welcome!

- Issue Tracker: https://github.com/HiPE-Inc-ltd/static_template/issues
- Source Code: https://github.com/HiPE-Inc-ltd/static_template

---

Copyright © 2020 [HiPE Inc. ltd.](https://bpoc.co.jp/) All rights reserved
