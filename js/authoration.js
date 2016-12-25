// 放置clientId
// 控制台地址, https://console.developers.google.com
var CLIENT_ID = '752132420625-0q0432ijprv5f3dmkjmnigssupjudvdu.apps.googleusercontent.com';

var SCOPES = [
  'https://mail.google.com/',
  "https://www.googleapis.com/auth/calendar"
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
    // handleAuthClick();
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
 * 加载gmail接口
 */
function loadGmailApi() {
  gapi.client.load('gmail', 'v1', listLabels);
  gapi.client.load('calendar', 'v3', listUpcomingEvents);

}

/**
 * 示例方法，列出所有label
 */
function listLabels() {
  var request = gapi.client.gmail.users.labels.list({
    'userId': 'me'
  });

  request.execute(function(resp) {
    // function success
    console.log(resp);
  });
}

/**
 * 示例方法，列出最近事件
 */
function listUpcomingEvents(){
  var request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  });

  request.execute(function(resp) {
    console.log(resp);
  });
}