window.AppEnvironment = window.AppEnvironment || 'development'
window.APP_NAME = window.APP_NAME || 'default_application_name'
window.LOGDNA_INGESTION_KEY = window.LOGDNA_INGESTION_KEY || ''

try {
  if (window.LOGDNA_INGESTION_KEY) {
    const Logger = require('logdna')
    window['logger'] = Logger.createLogger(window.LOGDNA_INGESTION_KEY, {
      app: window.APP_NAME,
      env: window.AppEnvironment,
      index_meta: true,
      tags: 'browserError'
    })
  } else {
    window['logger'] = window.console;
    console.error('LOGDNA_INGESTION_KEY is empty, please define variable with correct value.')
  }

  const oldHandler = window.onerror
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    window['logger'].error(msg, {
      meta: {
        url: url,
        colno: columnNo,
        lineno: lineNo,
        stack: error && error.stack ? error.stack : []
      }
    })

    if (oldHandler) return oldHandler
    return false
  }

  if (window['jQuery']) {
    window['jQuery'].readyException = function (error) {
      console.error(error)
      window['logger'].error(error.message, {
        meta: {
          stack: error && error.stack ? error.stack : []
        }
      })
    }
  }
} catch (e) {
  console.error(e)
}
