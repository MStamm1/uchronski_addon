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
  contentScript: ['var uploads = document.getElementsByClassName("s2d");', 'self.port.emit("pageEntriesLength", uploads.length);', 'self.port.emit("pageEntries", uploads);']
});

pageWorker.port.on("pageEntriesLength", function(filesLength) {
console.log("filesLength " + filesLength);
uploadsLength = filesLength;
console.log("uploadsLength " + uploadsLength);
});
  
pageWorker.port.on("pageEntries", function(files) {
for(var i = files.length; i--; uploads.unshift(files[i]));
});  

//handle incoming file count (uchronski.js)
//self.port.on("pageEntriesLenght", function(entries) {
  //uploadsLength = entries;
//});

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
			var newFile = uploadsLength;
			var classPosition = newFile - 1;
			console.log(classPosition);
			
			}
			
ss.storage.uploadsOld = uploadsLength;

/*
getNewFiles();

function getNewFiles() {


}*/
