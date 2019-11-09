var $menu = document.getElementsByClassName('menu-container'),
	$hamburger = document.getElementById('hamburger-menu'),
	$navegacao = document.getElementById('navegacao'),
	$body = document.getElementsByTagName('body')[0];


window.onload = function(){
	$hamburger.onclick = function(){
		if ($hamburger.classList.contains('active')){
			$hamburger.classList.remove('active');
			$navegacao.classList.remove('active');
			$body.style.overflow = "visible";
		}
		else{
			$hamburger.classList.add('active');
			$navegacao.classList.add('active');
			$body.style.overflow = "hidden";
		}
	}
}