You can simply include `/dist/logdna-logger.js` file to your browser page with defined config options listed below.

When including library to browser please define variables (default value is below)
```
var AppEnvironment = 'development';
var APP_NAME ='default_application_name';
var LOGDNA_INGESTION_KEY = '';
```

To compile logger for your application run command
```
npm install

browserify index.js | uglifyjs> dist/logdna-logger.js
```
