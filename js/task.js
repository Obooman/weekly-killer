var apiList = [];

class Task{
	constructor(){
		this.body = '';
		this.date = '';
		this.timeZone = 'Asia/Shanghai';
		this.id = '';
	}

	add(){
		var event = {
			calendarId:'oboochin@gmail.com',
			summary:this.body,
			start:{
				dateTime:`${this.date}T09:00:00`,
				timeZone:"Asia/Shanghai"
			},
			end:{
				dateTime:`${this.date}T17:00:00`,
				timeZone:"Asia/Shanghai"
			}
		};

		var addRequest = gapi.client.calendar.events.insert(event)

		addRequest.execute((succ) => {
			this.id = succ.id
		},(err) => {
			console.error( err );
		})
	}

	remove(){
		if( !this.id ){
			console.error("there's no id");
			return;
		}

		var deleteObject = {
			eventId:this.id,
			calendarId:'oboochin@gmail.com'
		}

		var removeRequest = gapi.client.calendar.events.delete(deleteObject);

		removeRequest.execute(function(succ){
			//
		},function(err){
			console.error(err);
		})
	}
}