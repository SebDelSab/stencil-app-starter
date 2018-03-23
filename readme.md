# Advanced-searchbar


The advanced-searchbar is a web-component that was developped using Stencil (v0.6.1), a web-component compiler developped by the ionic team. 
You can find a link to know how to do some [here](https://stenciljs.com/)

## Getting Started

To install this web-component just run

```bash

npm install advanced-searchbar

```

## Example of use

In your HTML file, place the script reference inside your header in order to be able to use this package. NB: The font-awesome link is currently necessary if youu want to see the spinner during your search.


```html

<head>
 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
 	<script src='node_modules/advanced-searchbar/dist/advanced-searchbar.js'></script>
</head>

```  

Then you can paste this anywhere in your code where a HTML element can be placed:

```html

<advanced-searchbar></advanced-searchbar>

```

## Accessible methods and properties

### Properties 

#### .data
To pass data to the component, you must modify the data property.
Once the component is loaded in your webpage you can do something like:

```javascript

	let sb = document.getElementsByTagName('advanced-searchbar')[0];
    sb.data = [{"id":"toto","text":"this is toto and he is funny","pill":"toto_pill"},{"id":"tata","text":"this is tata and she is funny too toto","pill":"tata_pill"},{"id":"titi","text":"this is titi and he is yellow toto","pill":"titi_pill"}];

```

Note that your data must be an array of objects where "id" represent the field you want to return when you click on it, "text" represent the text where the word or keyword you wrote inside the search-bar appear and "pill" the field that matched you request. When developping this component, we use an express server that returned this kind of results.  

### Events

#### askResults

When you type something inside the searchbar, the 'askResults' event is emitted. The value you entered is also emitted with it.

#### clickedOnResult

When you click on a result inside the dataPanel, the 'clickedOnResult' event is emitted. The id corresponding to the line you clicked on is also emitted with it.

### Methods

#### hideDataPanel

This method can be use to hide the DataPanel returned after a search.

#### showDataPanel

This method can be use to show the DataPanel returned after a search.

#### destroy

This method can be use to remove the component from your webpage.


## Release notes

v 0.0.3 -> 0.0.5
Emission of askResults event which send to the user the value he entered to allow him to request the word
he entered on his server
The next step is to allow him to send data to the component.

v 0.0.6 -> 0.0.9

Addition of dataReceived event listener

v 0.0.10 -> 0.0.11

No need for dataReceived event anymore, developping the functionnality to get a value when the user click on a row of the result

v 0.0.12 -> 0.0.14

Display the dataPanel even if the query has already been sent once by the user (test)

v 0.0.15 -> 0.0.26

Hide spinner when the dataPanel is displayed (still working on it)

v 0.0.27 -> 0.0.28

Small improvements

v 0.0.29 -> 0.1.24

Preparation to add matching fields into the dataPanel

v 0.1.25 -> 0.1.29

TEST css modification

v 0.1.30 

restore default css

v 0.1.31

Suppression of useless dependencies (qwest)

v 1.0.0

First release, the searchbar now contains the matching field inside a pill
A click outside of the searchbar will hide the dataPanel which appear when a result is sent to the component.