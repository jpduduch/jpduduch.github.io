$(document).ready(function(){
	$('.reminder').eq(1).addClass('active');
});


if (!detectmob()) {
	$(window).mouseup(function() {
		$('.reminder').eq(0).addClass('active');
		$('.reminder').eq(1).removeClass('active');
	});

	$(window).mousedown(function() {
		$('.reminder').eq(0).removeClass('active');
		$('.reminder').eq(1).removeClass('active');
	});

} else {
	$(window).on('touchstart', function(){
		$('.reminder').eq(0).addClass('active');
		$('.reminder').eq(1).removeClass('active');
	});

	$(window).on('touchend', function(){
		$('.reminder').eq(0).addClass('active');
		$('.reminder').eq(1).removeClass('active');
	});
}




	