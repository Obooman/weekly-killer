class Mail{
	constructor(id){

		this.id = id;

		this.to = "";
		this.cc = "";
		this.subject = "";
		this.body = "";

		if( this.id ){
			this._setAsDraft();
		}
	}

	setSubject(subject){
		// http://ncona.com/2011/06/using-utf-8-characters-on-an-e-mail-subject/
		this.subject = `=?utf-8?B?${Base64.encodeURI(subject)}?=`;
	}

	send(success,fail){
		if( !this.id ){
			this.save(true);
			return;
		}

		(gapi.client.gmail.users.drafts.send({
			id:this.id,
			userId:'me'
		})).execute(function(succ){
			alert('Done');
		},function(fail){
			console.log('fail! ->',fail);
		})
	}

	save(saveAndSend){
		if( this.savePending ){
			console.error('saving,please try again later');
			return;
		}

		this.savePending = true;

		var requestBody = {
			userId:'me',
			resource:{
				message:{
					raw:this._getEmail()
				}
			}
		}

		var request = null;

		if( this.id ){
			request = gapi.client.gmail.users.drafts.update(requestBody)
		} else {
			request = gapi.client.gmail.users.drafts.create(requestBody)
		}

		request.execute(succ => {
			this.id = succ.id;
			this.savePending = false;

			if( saveAndSend ){
				this.send();
			}

		},fail => {
			console.log('fail! ->',fail);
		})
	}

	_getEmail(){
		return this._getBase64(
			`To: ${
				this.to
			}\r\nCc: ${
				this.cc
			}\r\nSubject: ${
				this.subject
			}\r\n\r\n${
				this.body
			}`
		)
	}

	_getBase64(str){
		return Base64.encodeURI(str);
	}

	_setAsDraft(){

	}
}