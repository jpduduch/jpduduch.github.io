//regular a altura do navegador para não cortar info (bugfix para dispositivos móveis)

$(document).ready(function(){
	if (detectmob()){
		
		var $alturaPagina = $(window).height() - $1rem * 8;
		
		$('body').css('height', $alturaPagina + 'px');
	}
});

$(window).resize(function() {
	if (!detectmob()){
		$('body').css('height', '');
	}
});