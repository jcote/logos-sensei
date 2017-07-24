'use strict';

var XMLHttpRequest = require('xhr2');
var XMLHttpRequestUpload = XMLHttpRequest.XMLHttpRequestUpload;
var request = require('superagent-q');
 
class ApiClient {

	constructor(hostname) {
		this.hostname = hostname;
	}

	healthCheck(none, cb) {
		var oReq = new XMLHttpRequest();
		oReq.open("GET", this.hostname + "/health");
		oReq.addEventListener("load", (evt) => {
		  if (oReq.status != 200) return cb(oReq.responseText);
	    return cb(null);
		});
		oReq.send();
	}

  readFreeIdentifier(name) {
	  return request.get(this.hostname + "/api/function/" + name)
	  .end()
		.then(function(res) {
			if (!res.ok) throw new Error(res.status);
			return res.body.freeidentifier;
    }, (res)=>{
    	console.log(res.message + " : " + res.response.res.text);
    });
  }

// attributes of 'data':
      // name
			// astid
			// fn
			// fntype
			// fnclass
			// argnum
			// argtypes
			// modules
			// memoize
			// testargs
	createStoredFunction(data) {
		return request.post(this.hostname + "/api/function/" + data.name)
		  .send(data).end()
		  .then(function(res) {
				if (!res.ok) throw new Error(res.status);
	    	//console.log("success:"+JSON.stringify(res.body));
				return res.body.storedfunction;
	    }, (res)=>{
	    	console.log(res.message + " : " + res.response.res.text);
	    });
	}

	createAssociation(sourceid, destinationid, associativevalue) {
		var data = {
			sourceid: sourceid,
			destinationid: destinationid,
			associativevalue: associativevalue
		};
		
		return request.post(this.hostname + "/api/lambda/association")
		  .send(data).end()
	    .then(function(res) {
				if (!res.ok) throw new Error(res.status);
	    	// console.log("success:"+JSON.stringify(res.body));
				return res.body.association;
	    }, (res)=>{
	    	console.log(res.message + " : " + res.response.res.text);
	    });
	}

	createApplication(definition1, definition2) {
		var data = {
			definition1: definition1,
			definition2: definition2
		};

		return request.post(this.hostname + "/api/lambda/application")
		.send(data).end()
	    .then(function(res) {
				if (!res.ok) throw new Error(res.status);
	    	// console.log("success:"+JSON.stringify(res.body));
				return res.body.application;
	    }, (res)=>{
	    	console.log(res.message + " : " + res.response.res.text);
	    });
	}

	createAbstraction(name, definition2) {
		var data = {
			name: name,
			definition2: definition2
		};

		return request.post(this.hostname + "/api/lambda/abstraction")
		.send(data).end()
	    .then(function(res) {
				if (!res.ok) throw new Error(res.status);
	    	// console.log("success:"+JSON.stringify(res.body));
				return res.body.abstraction;
	    }, (res)=>{
	    	console.log(res.message + " : " + res.response.res.text);
	    });
	}


	createSubstitution(type, definition1, definition2) {
		var data = {
			type: type,
			definition1: definition1,
			definition2:definition2
		};
		return request.post(this.hostname + "/api/lambda/substitution")
		  .send(data).end()
	    .then(function(res) {
				if (!res.ok) throw new Error(res.status);
	    //	console.log("success:"+JSON.stringify(res.body));
				return res.body.substitution;
	    }, (res)=>{
	    	console.log(res.message + " : " + res.response.res.text);
	    });
	}

	createFreeIdentifier(name) {
		var data = {name: name};
		
		return request.post(this.hostname + "/api/lambda/freeidentifier")
		  .send(data).end()
	    .then(function(res) {
				if (!res.ok) throw new Error(res.status);
	    	// console.log("success:"+JSON.stringify(res.body));
				return res.body.freeidentifier;
	    }, (res)=>{
	    	console.log(res.message + " : " + res.response.res.text);
	    });

	}


}

exports.ApiClient = ApiClient;