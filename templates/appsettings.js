AppSettings = {
  // @if ENV == 'DEVELOPMENT'
  baseApiUrl: 'http://esbservicos-dsv.amil.com.br:7080/v1/rest/apphospitais',
  debug: true
  // @endif
  // @if ENV == 'TEST'
  baseApiUrl: 'https://api-hom.amil.com.br/v1/rest/apphospitais'
  // @endif
  // @if ENV == 'PRODUCTION'
  baseApiUrl: 'https://api.amil.com.br/v1/rest/apphospitais'
  // @endif
}