var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, State, Element, Prop } from '@stencil/core';
//import {post} from 'qwest';
let AdvancedSearchbar = class AdvancedSearchbar {
    //import {post} from 'qwest';
    constructor() {
        this.cache = {};
    }
    handleChange(event) {
        let bidonData = [{ "_id": 'ObjectId("5a8404e5fe864cbfc186cad6")',
                "memberProteins": null,
                "name": "15-Lipoxygenase-2 (15-LOX-2) with substrate mimic",
                "type": "protein",
                "relatedPdbEntries": null,
                "group": "MONOTOPIC MEMBRANE PROTEINS",
                "secondaryBibliographies": null,
                "subgroup": "Lipoxygenases",
                "bibliography": { "doi": "10.1074/jbc.M113.543777",
                    "title": "The structure of human 15-lipoxygenase-2 with a substrate mimic.",
                    "journal": "J Biol Chem",
                    "year": "2014",
                    "pubMedId": "24497644",
                    "pages": "8562-8569",
                    "volume": "289",
                    "authors": "Kobe MJ, Neau DB, Mitchell CE, Bartlett SG, &amp; Newcomer ME",
                    "issue": null,
                    "notes": null },
                "pdbCode": "4NRE",
                "taxonomicDomain": "Eukaryota",
                "resolution": "2.63",
                "species": "Homo sapiens",
                "expressedInSpecies": "E. coli",
                "description": null,
                "matchFields": "group" },
            { "_id": 'ObjectId("5a8404e5fe864cbfc186cad5")',
                "memberProteins": null,
                "name": "Squalene-hopene cyclase",
                "type": "protein",
                "relatedPdbEntries": ["3SQC"],
                "group": "MONOTOPIC MEMBRANE PROTEINS",
                "secondaryBibliographies": null,
                "subgroup": "Squalene-Hopene Cyclases",
                "bibliography": { "doi": null,
                    "title": "The structure of the membrane protein squalene-hopene cyclase at 2.0 &Aring; resolution.",
                    "journal": "J. Mol. Biol.",
                    "year": "1999",
                    "pubMedId": "9931258",
                    "pages": "175-187",
                    "volume": "286",
                    "authors": "Wendt KU, Lenhart A, &amp; Schulz GE",
                    "issue": null,
                    "notes": null },
                "pdbCode": "2SQC",
                "taxonomicDomain": "Bacteria",
                "resolution": "2.0",
                "species": "Alicyclobacillus acidocaldarius",
                "expressedInSpecies": null,
                "description": " 2SQC is space group P4<sub>3</sub>2<sub>1</sub>2.  3SQC, 2.8&nbsp;&Aring; is P3<sub>2</sub>21." }];
        let self = this;
        //let timerid;
        //console.log("1 : "+this.lastval)
        this.value = event.target.value;
        let spinner = self.host.getElementsByClassName('advancedInputLoad')[0];
        spinner["style"].visibility = "visible";
        //console.log(this.value);
        //console.log("-----");
        //console.log(this.lastval);
        //let spinner = 
        if (this.lastval != self.value) {
            this.lastval = this.value;
            //console.log("2 : "+this.lastval)        
            clearTimeout(this.timerid);
            this.timerid = window.setTimeout(function () {
                console.log(self.value); // value to send for the request
                self.sendRequest(self.value); // Here we send the request to the server and get results
                self._storeResult(self.value, bidonData); // Here we save the data into the cache
            }, 2000);
        }
        ;
    }
    sendRequest(id) {
        console.log(id);
        if (this.cache.hasOwnProperty(id)) {
            console.log("request not send");
        }
        else {
            console.log("Request send to the server");
            post(this.targetUrl + "/" + id).then((xhr, response) => { console.log(response); });
        }
    }
    _storeResult(id, data) {
        let self = this;
        self.cache[id] = data;
    }
    render() {
        console.log(this.cache);
        /*
        let component = document.getElementsByTagName("advanced-searchbar")[0];
        let searchbox  = document.createElement("div");
        searchbox.classList.add("searchbox");
        component.appendChild(searchbox);
        let advancedInput = document.createElement("input");
        advancedInput.classList.add("advancedInput");
        searchbox.appendChild(advancedInput);
        let spinner = document.createElement("i");
        spinner.classList.add("fa","fa-spinner","fa-spin","advancedInputLoad");
        searchbox.appendChild(spinner);
        */
        /*var node = document.createTextNode("This is new.");
        para.appendChild(node);*/
        return (h("div", { class: "searchbox" },
            h("input", { type: "text", value: this.value, class: "advancedInput", onInput: (event) => this.handleChange(event) }),
            h("i", { class: "fa fa-spinner fa-spin advancedInputLoad" })));
    }
};
__decorate([
    Prop()
], AdvancedSearchbar.prototype, "targetUrl", void 0);
__decorate([
    State()
], AdvancedSearchbar.prototype, "lastval", void 0);
__decorate([
    State()
], AdvancedSearchbar.prototype, "value", void 0);
__decorate([
    Element()
], AdvancedSearchbar.prototype, "host", void 0);
AdvancedSearchbar = __decorate([
    Component({
        tag: 'advanced-searchbar',
        styleUrl: 'searchbar.css'
    })
], AdvancedSearchbar);
export { AdvancedSearchbar };
