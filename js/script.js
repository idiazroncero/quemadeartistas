$(function(){
  
  var artistasWaypoint = $('.artistas li').waypoint({
  	handler: function(direction) {

  		if(direction == 'down') {
  			$(this.element).addClass('artistas--shown');
  		} else {
			$(this.element).removeClass('artistas--shown');
  		}
  	},
  	offset: 'bottom-in-view'
  });

  var rellax = new Rellax('.rellax');

});