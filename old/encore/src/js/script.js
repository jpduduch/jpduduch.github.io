
$('#hamburger-menu').click(function(){
	if ($('#hamburger-menu').hasClass('active')){
		removeMenu();
	}
	else{
		$('#hamburger-menu').addClass('active');
		$('#navegacao').addClass('active');
		$('#idioma').addClass('active');
		$('body').css('overflow', 'hidden');
	}
});

// suavização de scroll

// Select all links with hashes
$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
	// On-page links
	if (
		location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
		location.hostname == this.hostname
		) {
		// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
			// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
						scrollTop: target.offset().top
					}, 1000, 'swing', function() {
				});
		}
	}
	removeMenu();
});


	// ao detectar scroll, o site retorna a posição na tela e ativa a seção que estiver em evidência

$(window).scroll(function(){
	if ($(window).scrollTop() >= $('section').eq(1).offset().top && $(window).scrollTop() < $('section').eq(2).offset().top){
		$('#navegacao > ul > li > a').removeClass('selected');
		$('#navegacao > ul > li > a').eq(0).addClass('selected');
	}
	else if ($(window).scrollTop() >= $('section').eq(2).offset().top && $(window).scrollTop() < $('section').eq(3).offset().top){
		$('#navegacao > ul > li > a').removeClass('selected');
		$('#navegacao > ul > li > a').eq(1).addClass('selected');
	}
	else if ($(window).scrollTop() >= $('section').eq(3).offset().top && $(window).scrollTop() != $(document).height() - $(window).height() ){
		$('#navegacao > ul > li > a').removeClass('selected');
		$('#navegacao > ul > li > a').eq(2).addClass('selected');
	}
	else if ($(window).scrollTop() + $(window).height() === $(document).height()){
		$('#navegacao > ul > li > a').removeClass('selected');
		$('#navegacao > ul > li > a').eq(3).addClass('selected');
	}
	else{
		$('#navegacao > ul > li > a').removeClass('selected');
	}
})



if (!detectmob()){
	$('section').css('background-attachment', 'fixed');
} else{
	$('#servicos').css('height', $(window).height() - 72 + 'px');
}

$(window).resize(function(){
	if (!detectmob()){
		$('#servicos').css('height', '');
	}
});

function removeMenu(){
	$('#hamburger-menu').removeClass('active');
	$('#navegacao').removeClass('active');
	$('#idioma').removeClass('active');
	$('body').css('overflow', 'visible');
}

// detectar se dispositivo é mobile
function detectmob() { 
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}

