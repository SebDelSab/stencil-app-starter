import { 
	Component, 
	State, 
	Element, 
	Prop, 
	Event, 
	EventEmitter,  
	Method,
	//Listen,
	Watch
	
} from '@stencil/core';

//import {post} from 'qwest';
//import qwest from 'qwest';

@Component({
	tag: 'advanced-searchbar',
	styleUrl: 'searchbar.css'
})

export class AdvancedSearchbar{

	//@Prop() target_url: string;
	@Prop() target_id: string;
	//@Prop() display_data_panel: boolean;
	lastval: string;
	value: string;
	@Element() host: HTMLElement;
	@Prop() data; // add an option to avoid rerendering
	@Prop() matchingFields: boolean;
	//@Event() dataStored: EventEmitter;
	//@Event() dataRecieved: EventEmitter;
	@Event() clickedOnResult: EventEmitter;
	@Event() askResults: EventEmitter;

	@State() cache: object = {};
	timerid: number;
	safeKey?: string;
	//currentvalue: string;

	handleChange(event) {
		//console.log(event) // log the event and values
		//this.clearDataPanel()
		this.hideDataPanel();
		this.value = event.target.value;
		let spinner = this.host.getElementsByClassName('advancedInputLoad')[0];
		spinner["style"]["display"] = "inline-block";
		if(this.lastval!= this.value){
        	this.lastval = this.value;      
        	clearTimeout(this.timerid);
        	let self = this;
        	this.timerid = window.setTimeout(function() {
        		//console.log('before buildDataPanel')
        		self.sendRequest(self.value)
        		//.then(function(){self.buildDataPanel(self.value)})
        		//console.log('after buildDataPanel')
			},2000);
		};
	}

	sendRequest(id){
		let self = this;
		// console.log(this.cache);

		// if asked string research has already been performed and stored in cache 
		if(self.cache.hasOwnProperty(id) ){
			console.log("request not send")
			self._hideSpinner()

			//console.log('before return of sendRequest (1)')
			let test = this.cache;
			this.cache = {...test}							// show to Guillaume because seems strange to me
			self.showDataPanel()
			//self.askResults.emit(id)
			//self.buildDataPanel(id)
		}
		else{
			// passing string to server
			// this block must be replaced by an event emission of the researched key

			//console.log("Request send to the server")
			self.askResults.emit(id)
			self._hideSpinner()
			
			//let url = self.target_url+"/"+id;
			//qwest.get(url).then(function(xhr,response){
			//	self._hideSpinner();
				
			//	console.log('before return of sendRequest (2)')
				//console.log({id:response})
			//	return(response);
			//}).then(function(response){
				//console.log(id)
				//console.log(response)
			//	self._storeResult(id,response); // @State cache modified
			//	return (id);
			//});
			/*.then(function(id){
				self.buildDataPanel(id) // here
			})*/
		}	
	}
	
	_storeResult(id,data) {
		//console.log(id)
		//console.log('_storeResult')
		this.cache[id]= data;			//Seems to work
		this.cache = {...this.cache};	//Seems to work
		this.showDataPanel()		// Here because must be shown once the render function has been called

		//this.dataStored.emit(this.cache);
	}

	_hideSpinner(){
		this.host.getElementsByClassName('advancedInputLoad')[0]["style"]["display"]="none";
	}

	@Method()
	hideDataPanel(){
		//console.log('Je suis bien caché');
		this.host.getElementsByClassName("dPContent")[0]['style']['display'] = 'none';
	}

	@Method()
	showDataPanel(){
		this.host.getElementsByClassName("dPContent")[0]['style']['display'] = 'block';
	}

	@Method()
	getValue(){
		return(this.host.getElementsByTagName('input')[0]['value']);
	}

	@Method()
	destroy(){
		this.host.parentNode.removeChild(this.host)
	}

	clearDataPanel(){
		let parent = this.host.getElementsByClassName("dPContent")[0];
		while(parent.lastChild){
			parent.removeChild(parent.lastChild)
		}
	}
	/*
	@Listen('clickedOnResult')
	test(e){
		console.log(e)		
	}
	*/

	// Useless

	/*
	@Listen('askResults')
	testEventaskResults(a){
		console.log("askResults activated")
		console.log("value send : "+ a)
	}

	*/	
	/*
	setHideOnOutsideClick(){
		let self = this
		$(document).mouseup(function(e) {
		    var container = $(self.getNode()).find('div.dataPanel');
			// if the target of the click isn't the container nor a descendant of the container
			if (!container.is(e.target) && container.has(e.target).length === 0){
        		container.hide();
		    }
		});
	}
	*/
	// Useless
	/*
	@Listen('document:dataReceived')
	test_function(data){
		console.log(data)
		this._storeResult(this.value,data)
	}
	*/

	@Watch('data')
	 watchHandler(newValue: boolean, oldValue: boolean) {
    	//console.log('The new value of activated is: ', newValue);
    	this._storeResult(this.value,newValue)
  	}
  	buildResultMatch(matchstring,word){
  		console.log(matchstring)
  		console.log(word)
		let newres = matchstring[0].replace(word,<strong>+word+</strong>)
		console.log(newres)
		return newres;
	}

	render(){
		//let self = this;
		//console.log("render activated")
		// cache is modified => this.value is found in cache 
		// cache is modified => this.value is not match in cache
		//console.log(this.safeKey)
		if (this.cache.hasOwnProperty(this.value))
			this.safeKey = this.value;

		console.log(this.cache)
		let row = [];
		if(Object.keys(this.cache).length > 0 && this.safeKey){

			row = this.cache[this.safeKey].map((e) => {
				let exp = new RegExp("(.{0,"+20+"})"+this.safeKey+"(.{0,"+20+"})")								// 20 is the number of characters we want before and after the word found
				console.log(exp)
				console.log(exp[1])
				console.log(exp[2])
				let matchAround = exp.exec(e["text"])
				console.log(matchAround[1])
				console.log(matchAround[2])
				//console.log(matchAround)
				return <li onClick={()=> this.clickedOnResult.emit(e["id"])}> {e["id"] + " | " + matchAround[1]}<strong>{this.safeKey}</strong>{matchAround[2]}  </li> 
			})
			console.log(this.cache[this.safeKey])
			//console.log(row)
			//console.log(this.cache[this.value])
			//console.log("render activated")	
		}
		//console.log(this.host.getElementsByClassName('advancedInputLoad')[0])
		//self._hideSpinner();
	/*	let data = this.data;
		if (typeof(this.data)=="string"){
			data = JSON.parse(data).default
		}
		let row = data.map( (e) => { return <li> {e["a"]}</li> }) 
		{row}
	*/

		return(
			<div class="searchbox">
				<input type="text" value={this.value} class = "advancedInput" onInput={(event) => this.handleChange(event)} /><i class="fa fa-spinner fa-spin advancedInputLoad"></i>
				<div class = "dataPanel"><ul class="dPContent">{row}</ul></div>
			</div>
		);
	}
}

