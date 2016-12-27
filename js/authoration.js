// console address: https://console.developers.google.com
var CLIENT_ID = '752132420625-0q0432ijprv5f3dmkjmnigssupjudvdu.apps.googleusercontent.com';

var MODULES = [
  ['gmail','v1'],
  ['calendar','v3']
];

var SCOPES = [
  // Mail scopes
  'https://mail.google.com/',
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.readonly",

  // Calendar Scopes
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.readonly"
];

/**
 * 检测用户是否已允许权限
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * 处理权限认证服务器返回值
 *
 * @param {Object} authResult 认证结果
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    loadGmailApi();
  } else {
    // additional UI here
    handleAuthClick();
  }
}

/**
 * 初始化权限认证
 */
function handleAuthClick() {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * load gmail and calendar modules;
 */
function loadGmailApi() {
  var count = 0;

  var cb = () => {

    count++;
    if( count == MODULES.length ){
      gmail._ready();
    }
  }

  MODULES.forEach(function(module){
    gapi.client.load(module[0],module[1],cb);
  })
}