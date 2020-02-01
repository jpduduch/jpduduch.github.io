$(document).ready(function(){
	$('#reminder').addClass('active');
});


if (!detectmob()) {
	$(window).mouseup(function() {
		$('#reminder').addClass('active');
	});

	$(window).mousedown(function() {
		$('#reminder').removeClass('active');
	});

} else {
	$(window).on('touchstart', function(){
		$('#reminder').removeClass('active');
	});

	$(window).on('touchend', function(){
		$('#reminder').addClass('active');
	});
}




	