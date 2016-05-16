## Harp Static Site Experiement


### Install via git
```
git clone https://github.com/JugglerX/harp.git
```
```
npm install
```
#### Server & Compile commands (with additional Grunt post processing)
- Instead of `harp server` run `npm run server` - This will launch the harp server and a browser sync server
- Instead of `harp compile` run `npm run compile` - This will compile the harp website, perform grunt tasks and update all links to .html 
- `grunt deploy` - Deploy to S3


### Install as a Harp Boilerplate

If you have no installed harp already
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
