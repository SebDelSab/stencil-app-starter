import { 
	Component, 
	State, 
	Element, 
	Prop, 
	Event, 
	EventEmitter,  
	Method,
	Watch,
	Listen
	
} from '@stencil/core';


@Component({
	tag: 'advanced-searchbar',
	styleUrl: 'searchbar.css'
})

export class AdvancedSearchbar{

	lastval: string;
	value: string;
	@Element() host: HTMLElement;
	@Prop() data; // add an option to avoid rerendering
	@Event() clickedOnResult: EventEmitter;
	@Event() askResults: EventEmitter;

	@State() cache: object = {};
	timerid: number;
	safeKey?: string;

	handleChange(event) {
		this.hideDataPanel();
		this.value = event.target.value;
		let spinner = this.host.getElementsByClassName('advancedInputLoad')[0];
		spinner["style"]["display"] = "inline-block";
		if(this.lastval!= this.value){
        	this.lastval = this.value;      
        	clearTimeout(this.timerid);
        	let self = this;
        	this.timerid = window.setTimeout(function() {
        		self.sendRequest(self.value)
			},2000);
		};
	}

	sendRequest(id){
		let self = this;

		// if asked string research has already been performed and stored in cache 
		if(self.cache.hasOwnProperty(id) ){
			//console.log("request not send")
			self._hideSpinner()
			let test = this.cache;
			this.cache = {...test}	
			self.showDataPanel()
		}
		else{
			self.askResults.emit(id)
			self._hideSpinner()
		}	
	}
	
	_storeResult(id,data) {
		this.cache[id]= data;			
		this.cache = {...this.cache};	
		this.showDataPanel()		// Here because must be shown once the render function has been called
	}

	_hideSpinner(){
		this.host.getElementsByClassName('advancedInputLoad')[0]["style"]["display"]="none";
	}

	@Method()
	hideDataPanel(){
		this.host.getElementsByClassName("dPContent")[0]['style']['display'] = 'none';
	}

	@Method()
	showDataPanel(){
		this.host.getElementsByClassName("dPContent")[0]['style']['display'] = 'block';
	}

	@Method()
	destroy(){
		this.host.parentNode.removeChild(this.host)
	}

	@Watch('data')
	 watchHandler(newValue: boolean, oldValue: boolean) {
    	this._storeResult(this.value,newValue)
  	}

  	// ask Guillaume's opinion
  	@Listen('document:click')
  	clickEventHandler(target){
  		if (this.host.contains(target.target)){
  			this.showDataPanel()
  		}
  		else{
  			this.hideDataPanel()
  		}
  	}

	render(){
		if (this.cache.hasOwnProperty(this.value))
			this.safeKey = this.value;

		//console.log(this.cache)
		let row = [];
		if(Object.keys(this.cache).length > 0 && this.safeKey){

			row = this.cache[this.safeKey].map((e) => {
				let exp = new RegExp("(.{0,"+20+"})"+this.safeKey+"(.{0,"+20+"})")								// 20 is the number of characters we want before and after the word found
				let matchAround = exp.exec(e["text"])	// (the last occurence)
				//console.log(matchAround)
				return <li onClick={()=> this.clickedOnResult.emit(e["id"])}> <div class="matching"><a class="matchingField"> {e["pill"]} </a></div> <div class="information">{e["id"] + " | " + matchAround[1]}<strong>{this.safeKey}</strong>{matchAround[2]} </div> </li> 
			})
		}

		return(
			<div class="searchbox">
				<input type="text" value={this.value} class = "advancedInput" onInput={(event) => this.handleChange(event)} /><i class="fa fa-spinner fa-spin advancedInputLoad"></i>
				<div class = "dataPanel"><ul class="dPContent">{row}</ul></div>
			</div>
		);
	}
}

