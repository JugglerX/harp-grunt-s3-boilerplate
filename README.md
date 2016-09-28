# Harp + Grunt + AWS S3 Boilerplate
This is a static site generator boilerplate for Harp JS http://harpjs.com/. It uses Harp for .ejs template compilation and add's grunt post processing and AWS S3 deployment.

## Installation

Download or clone this repo.

```
npm install -g harp
```
```
npm install
```

## Development Server & Static Site Compiler

- Instead of `harp server` run `npm run server` - This will launch the harp server and a browser sync server
- Instead of `harp compile` run `npm run compile` - This will compile the harp website into a static site. It performs grunt tasks and updates all <a> tags with a .html extension. Copies files from the `public` folder to `www` folder and performs some housekeeping tasks.


## AWS S3 Setup & Deployment

- `grunt deploy` - Deploy to S3

Create a file in the project root (same level as package.json) called aws-keys.json. Update the AccessKeyId, SecretKey, Region & Bucket with your own values from your AWS console.

```
{
  "AWSAccessKeyId": "XXXXXXXXXXXXXXXXXX",
  "AWSSecretKey": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "AWSRegion":  "us-west-2",
  "AWSBucket":  "mybucket"
}
```

When you run `grunt deploy` it will now read your AWS settings from this file. The contents of the `www` folder are deployed to the root of the S3 bucket. A diff will be performed on the files and only modified files are uploaded to S3.


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
