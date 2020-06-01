// deixar o scroll suave ao clicar em âncoras

// selecionar todos os links com #
$('a[href*="#"]')
  // exceto para links vazios
  .not('[href="#"]')
  .not('[href="#0"]')
	// acionar ao clicar
  .click(function(event) {

	// não trocar a url
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	  // encontrar elemento que deve ser scrollado
	  var target = $(this.hash);
	  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	  
	  // o elemento existe?
	  if (target.length) {
		// impedir o navegador de rodar sem animação
		event.preventDefault();
		// rodar a scrollbar com intervalo de 500ms
		$('html, body').animate({
			scrollTop: target.offset().top
		}, 500);
	}
}
});

// fim scroll suave

$(document).scroll(function(){
	if ($(window).scrollTop() >= 100) {
		$('.reminder').css('z-index', '1');
	}
	else{
		$('.reminder').css('z-index', '-1');
	}
})