# Stencil App Starter

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all. In many cases, Stencil can be used as a drop in replacement for traditional frontend frameworks given the capabilities now available in the browser, though using it as such is certainly not required.

Stencil also enables a number of key capabilities on top of Web Components, in particular Server Side Rendering (SSR) without the need to run a headless browser, pre-rendering, and objects-as-properties (instead of just strings).

## Getting Started

To start a new project using Stencil, clone this repo to a new directory:

```bash
git clone https://github.com/ionic-team/stencil-starter.git my-app
cd my-app
git remote rm origin
```

and run:

```bash
npm install
npm start
```

To view the build, start an HTTP server inside of the `/www` directory.

To watch for file changes during development, run:

```bash
npm run dev
```

To build the app for production, run:

```bash
npm run build
```

To run the unit tests once, run:

```
npm test
```

To run the unit tests and watch for file changes during development, run:

```
npm run test.watch
```

## NB

This component is still a prototype developped during Master's internship in Université Lyon 1, France

More documentation coming soon

## Example of use

In your HTML file, place these in order to be able to use this package


```html

<head>
 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
 	<script src='node_modules/advanced-searchbar/dist/advanced-searchbar.js'></script>
</head>


<advanced-searchbar target_id="searchfield" ></advanced-searchbar>

```  

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

v 0.1.25 

TEST css modification