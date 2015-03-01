require(['jquery', 'underscore', 'backbone', 'mustache'], function($, _, Backbone, Mustache) {
 var Section = Backbone.Model.extend({
 	name:""
 	info:""
 	time:""
 	taget:""
 }) ;

 var SectionList = Backbone.Collections.extend({
 	model:Section

 })

ViewEvent = Backbone.View.extend({
    template: _.template($('#section_event').html()),
    render: function(){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});
var cliente = new SectionList({name:'carnaveles', info:' fiesta popular',time:"12:00",taget:"todas"},
							 {name:'3*1', info:' fiesta nocturna',time:"12:00",taget:"2:00"},
							 {name:'ir a comer churros', info:' comer churros',time:"11:00",taget:"todas"});

var ficha = new ViewEvent({el:$('body'), model: cliente});
ficha.render()
;  
 





