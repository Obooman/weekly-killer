var gmail = {};

gmail.ready = function(func){
	gmail._ready = func;
}

gmail.getCalendars =  function(start,end,callback){
	var request = gapi.client.calendar.events.list({
		calendarId:'oboochin@gmail.com',
		timeMax:end.toJSON(),
		timeMin:start.toJSON()
	})

	request.execute(function(res){
		var tasks = res.items;

		callback && callback(tasks);
	})
}