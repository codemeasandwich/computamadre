$( document ).ready(function() {
    

console.log(events);

var source   = $("#event-template").html();
var template = Handlebars.compile(source);


for(var index in events){
	var event = events[index];
	$("#content").append(template(event));
}
});