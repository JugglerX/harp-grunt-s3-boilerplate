# Harp Boilerplate
This is a static site generator based on Harp JS http://harpjs.com/. It extends the core functionality of Harp by adding grunt post processing to harp compile.

## Installation
### Install via git
```
git clone https://github.com/JugglerX/harp.git
```
```
npm install
```
**Server & Compile commands (with additional Grunt post processing)**
- Instead of `harp server` run `npm run server` - This will launch the harp server and a browser sync server
- Instead of `harp compile` run `npm run compile` - This will compile the harp website, perform grunt tasks and update all links to .html
- `grunt deploy` - Deploy to S3


### Install as a Harp Boilerplate

If you have not installed harp already - http://harpjs.com/docs/quick-start
```
npm install -g harp
```
Create a harp project from a boilerplate. This will install to the current directory.
```
harp init --boilerplate JugglerX/harp/
```
```
npm install
```

Starting point for creating static websites with Gulp, BrowserSync, and Handlebars.
https://github.com/jadnco/static-boilerplate

gulp + expressjs + nodemon + browser-sync
https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e