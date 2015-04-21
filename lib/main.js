var self = require("sdk/self");
var pageMod = require("sdk/page-mod");
var buttons = require('sdk/ui/button/action');
var ss = require("sdk/simple-storage");
var tabs = require("sdk/tabs");

var uploads = []
var URL = "11fosinformationssystemeundnetzwerktechnik/index.php";
var uploadsLength = -1;

pageWorker = require("sdk/page-worker").Page({
  contentURL: "http://uchronski.de/lernmaterialien/beruflicheschulformen/" + URL,
  contentScript: ['var uploads = document.getElementsByClassName("s2d");', 'self.port.emit("pageEntries", uploads);']
});

//Get the page entries sent from the pageWorkers contentScript
pageWorker.port.on("pageEntries", function(files) {
for(var i = files.length; i > 0; i--; ); {uploads.push(files[i])} //> or >= ?
uploadsLength = files.lenght;
});

//menu bar button
var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

//handle menu bar button click
function handleClick(state) {
  tabs.open("http://uchronski.de/");
}

if(!ss.storage.uploadsOld)
ss.storage.uploadsOld = -1;

console.log(uploadsLength);
ss.storage.uploadsOld = uploadsLength -1;
console.log("uploadsOld " + ss.storage.uploadsOld);

if(ss.storage.uploadsOld.lenght != 0)
	if(uploadsLength != -1)
		if(uploadsLength > ss.storage.uploadsOld)
				{
				var newEntriesLenght = uploadsLength - ss.storage.uploadsOld;
				var firstClassPosition = (ss.storage.uploadsOld * 4) - 2;
				var lastClassPosition  = (uploadsLength * 4) - 2;
				
				console.log("firstClassPosition: " & firstClassPosition & " lastClassPosition: " & lastClassPosition);
				console.log("newEntries: " & newEntriesLenght);
				}
			
ss.storage.uploadsOld = uploadsLength;

/*
getNewFiles();

function getNewFiles() {


}*/
