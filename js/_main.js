// forçar imagens com a classe '.circular' a terem a proporção quadrada. função funciona para todas as ocasiões em que ela aparecer
function circular(){
	var alturaCircular = [];
	for(i=0; i < $('.circular').length; i++){
		alturaCircular[i] = $('.circular').eq(i).outerWidth();
		$('.circular').eq(i).css('height', alturaCircular[i]);
	}
}




// deixar as barras de conclusão com o tamanho que se espera delas. esse processo é feito lendo o atributo 'porcentagem_conclusao' das tags com a classe '.barra-completa'.
function aumentarBarraConclusao(){
	var porcentagemConcluido = [];


	for(i=0; i < $('.barra-completa').length; i++){
		porcentagemConcluido[i] = $('.barra-completa').eq(i).attr('porcentagem_conclusao');
		
		$('.barra-completa')
			.eq(i)
			.css('width', porcentagemConcluido[i] + '%')
		;

		$('#balao-conclusao')
			.css('margin-left', "calc(" + porcentagemConcluido[i] + "% - 24px)")
			.html(porcentagemConcluido[i] + "%")
		;
	}
}

function detalhesPedido(){
	tabela_detalhesPedido = $('.detalhes-de-pedido');
	btn_DetalhesPedido = $('#detalhes-pedido-btn');

	tabela_detalhesPedido.css('display', 'none');

	btn_DetalhesPedido.click(function(){
		tabela_detalhesPedido.css('display') === 'none' ? (tabela_detalhesPedido.css('display', ''), btn_DetalhesPedido.html('Ocultar detalhes'))  : (tabela_detalhesPedido.css('display', 'none'), btn_DetalhesPedido.html('Detalhes de pedido'));
	})
}

$(document).ready(function(){
	
	circular();
	aumentarBarraConclusao();
	detalhesPedido();

	// deslocar o balão de conclusão de acordo com a barra no assitente de pedido


	// deixar o scroll suave ao clicar em âncoras

	// selecionar todos os links com #
	$('a[href*="#"]')
	  // exceto para links vazios
	  .not('[href="#"]')
	  .not('[href="#0"]')
	    // acionar ao clicar
	  .click(function(event) {

	  	// não trocar a url
	    if (
	    	location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
	    	&& 
	    	location.hostname == this.hostname
	    	) {
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


	  // efeitos de formulário

	  // fazer com que os campos de formulário exibam a linha pontilhada abaixo da linha contínua
	$('label.obrigatorio').next('input:not([type=checkbox]), select').after('<span class="obrigatorio"></span>');
	$('label.opcional').next('input:not([type=checkbox]), select').after('<span class="opcional"></span>');


	// controlar cards de filhos

	$('.contabilizador-filhos').on('click', 'button', function (e){
		e.preventDefault();
		var n_filhos = parseInt($('.contabilizador-filhos').find('input').val());
		// o index do botão de incrementar é 2. portanto se o index do botão clicado for este, executa a função abaixo
		if ($(this).index() === 2){
			n_filhos++;
			$('.card-filho').eq(0)
				.clone()
				.appendTo('.card-filho-container')
				.css('display', '')
				.find('input[type=text]')
				.attr({
					'id' : 'nome' + n_filhos,
					'name' : 'nome' + n_filhos
				})
			;

			$('.card-filho').eq(n_filhos)
				.find('input[type=date]')
				.attr({
					'id' : 'data' + n_filhos,
					'name' : 'data' + n_filhos
				})
			;
		}

		else if (n_filhos > 0){
			n_filhos--;
			$('.card-filho').eq(n_filhos + 1).remove();
		}

		$('.contabilizador-filhos').find('input').val(n_filhos);
	})


    // fim efeitos de formulário



	// funções de assistente de pedido > peça

	// trigger para colocar uma peça no carrinho
	$(".contabilizador").on('click', '.adquirir-peca', function(event) {
		event.preventDefault();

		// pegar o index do card da peça
		idCard = $(this).index(".adquirir-peca");

		// pegar o id da peça (eu assumo que terá um) para criar a aba lateral do subtotal
		id_daPeca = $(this).parents('.card-peca').attr('id');

		// alterar o estado do cartão, do botão de incrementar e da página para quando há peças selecionadas
		$(this).addClass('active');
		$(this).parents('.card-peca').addClass('active-card');
		$('.caption-quantidade').eq(idCard).css('opacity', '1');
		
		maisPecas();
		adicionar_aoSubtotal();
	});

	// trigger para aumentar quantidade de determinada peça no carrinho
	$(".contabilizador").on('click', '.incrementar', function(event) {
		event.preventDefault();

		// pegar o index do card da peça para saber qual incrementar
		idCard = $(this).index(".incrementar");
		id_daPeca = $(this).parents('.card-peca').attr('id');

		maisPecas();
	});

	// trigger para diminuir quantidade de determinada peça no carrinho
	$(".contabilizador").on('click', '.decrementar', function(event) {
		event.preventDefault();

		// pegar o index do card da peça para saber qual decrementar
		idCard = $(this).index(".decrementar");
		id_daPeca = $(this).parents('.card-peca').attr('id');

		menosPecas();

		// se a quantidade de peças retornar a zero, o card volta ao seu estado inicial
		if(parseInt($("input").eq(idCard).val()) === 0){
			$(this).parents(".card-peca").removeClass('active-card');
			$(".adquirir-peca").eq(idCard).removeClass('active');
			$('.caption-quantidade').eq(idCard).css('opacity', '0');
			$('.' + id_daPeca).remove();
			subtotalResumido();
		}

	});

	// função que aumenta o número de peças de determinado item
	function maisPecas(){
		var	incrementador = parseInt($(".quantidadeObrigatoria").eq(idCard).html()),
		quantidade = parseInt($("input").eq(idCard).val()),
		preco = $('.preco-item').html().replace(',','.');

		$("input").eq(idCard).val(quantidade + incrementador);
		recalcularQuantidade(quantidade = quantidade + incrementador, preco);
	}


	// função que diminui o número de peças de determinado item
	function menosPecas(){
		var	decrementador = parseInt($(".quantidadeObrigatoria").eq(idCard).html()),
		quantidade = parseInt($("input").eq(idCard).val());
		preco = $('.preco-item').html().replace(',','.');

		$("input").eq(idCard).val(quantidade - decrementador);
		recalcularQuantidade(quantidade = quantidade - decrementador, preco);
	}


	// função que adiciona os itens à aba de subtotal na página de peças
	function adicionar_aoSubtotal() {

		// variáveis com html e informação dinâmica (ex.: preços e quantidades).
		var containerItemPedido = '<div class="bloco-item-pedido ' + id_daPeca + '"></div>',
		nomeItem = '<h6>' + $('.nome-item').eq(idCard).html() + '</h6>',
		quantidade = parseInt($("input").eq(idCard).val()),
		quantidadeItem = '<p>Quantidade <span class="quantidade-selecionada">' + quantidade + '</span>	</p>',
		preco = $('.preco-item').eq(idCard).html().replace(',','.'),
		precoItem = '<p>Valor Unitário <span class="valor-unitario">R$ ' + preco.replace('.',',') + '</span></p>',
		totalItem = '<p>Total do Item <span class="total-item">R$ ' + String((quantidade * preco).toFixed(2)).replace('.',',') + '</span></p>';

		// aplicação do html gerado dinamicamente no código
		$("#itens").append(containerItemPedido);
		$("." + id_daPeca).append(nomeItem);
		$("." + id_daPeca).append(quantidadeItem);
		$("." + id_daPeca).append(precoItem);
		$("." + id_daPeca).append(totalItem);

		subtotalResumido();
		calcularSubtotal();
	}

	function recalcularQuantidade(quantidade, preco) {
		$("." + id_daPeca + "> p > .quantidade-selecionada").html(quantidade);
		$("." + id_daPeca + "> p > .total-item").html("R$ " + String((quantidade * preco).toFixed(2)).replace('.', ','));

		calcularSubtotal();
	}

	function calcularSubtotal(){
		var subtotal = 0;
		if ($('.total-item').text() !== undefined){
			for (i = 0; i < $('.valor-unitario').length; i++){
				subtotal += parseFloat($('.total-item').eq(i).text().replace(',','.').replace('R$ ', ''));
			}
		}
		 // exibir o valor na forma monetária corretamente 
		$('#subtotal').html('R$ ' + String((subtotal).toFixed(2)).replace('.', ','));

		
	}

	$("#expandir-subtotal").click(function() {
		expandirSubtotal();
	});

	// função para manter o conteúdo do subtotal oculto ao adicionar ou subtrair peças
	function subtotalResumido(){
		alturaDiv = $('#itens').outerHeight();
		$('#subtotal-container').css({
			'box-shadow': '0 4px 4px 0 rgba(16,55,101,0.35)',
			transform: 'translateY(-' + alturaDiv + 'px)',
			transition: 'none'
		});
		$('.subtotal').css('transform', 'translateY(0)');
	}

	// exibir/ocultar todas as peças selecionadas numa lista na aba lateral
	function expandirSubtotal(){
		$('#subtotal-container').css('transition', '');

		if ($('#expandir-subtotal').hasClass('fechar-submenu')) {
			$('#subtotal-container, a, body').removeClass('active');
			$('.menu-subtotal').attr('src', 'img/icones/menu-subtotal.svg');
			$('#expandir-subtotal').removeClass('fechar-submenu');

		} else{

			$('#subtotal-container, a, body').addClass('active');
			$('.menu-subtotal').attr('src', 'img/icones/x-branco.svg');
			$('#expandir-subtotal').addClass('fechar-submenu');
		}
	}



// função para 'segurar' o card quando clicado e exibir botão de continuar na tela para ir para o inventário

	$('.card-colecao, .card-peca').on('click', function (){
		$('a#continuar').css({
			'opacity': '1',
			'pointer-events': 'all'
		})

		$('.card-colecao').removeClass('active');
		$(this).addClass('active');
	})
	
// fim funções para assistente de pedido > escolha de peça

// funções para a tela de checkout
	
	// faz com que o mapa do google dentro do iframe tenha a largura da janela
	$('iframe').attr('width', $(window).width());

	// troca cor do botão de confirmar endereço ao clicar neste
	$('#confirmar-endereco').click(function(e){
		e.preventDefault();
		$(this).addClass('validado');
		$('.secondary').addClass('validado');
	})

	

	// controla os estilos de clique da escolha de frete
	$('.frete').on('click', function(){
		$('.frete')
			.removeClass('checked')
			.addClass('unchecked')
		;

		$(this)
			.addClass('checked')
		;
	})

// fim de funções para a tela de checkout
});
