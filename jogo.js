
var timerId=null;

function iniciaJogo(){
	var url = window.location.search;
	var nivel_jogo = url.replace("?","") //replace subscreve 
	
	
	//nivel facil - 120s
	//nivel normal - 60s
	//nivel dicifil - 30s
	var tempo_segundos=0;
	
	if(nivel_jogo==1){
		tempo_segundos=120;
	}
	if(nivel_jogo==2){
		tempo_segundos=60;
		}
	if(nivel_jogo==3){
		tempo_segundos=30;
	}
	
	//insere segundos na tag span
	document.getElementById('cronometro').innerHTML = tempo_segundos;
	
	var qtde_baloes = 80;
	criarBaloes(qtde_baloes);
	
	//mostra quantidade de balões
	document.getElementById('baloes_inteiros').innerHTML=qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML=0; //iniciar jogo sem balão estourado
	contagem_tempo(tempo_segundos);
}

function criarBaloes(qtde_baloes){
	for(var i=1; i<=qtde_baloes; i++){
		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin='10px';
		
		balao.id = 'b'+i; //botão para cada balao
		
		balao.onclick = function(){estourar(this);}
		document.getElementById('cenario').appendChild(balao);
	}
}
function estourar(e){
	var id_balao = e.id;
	document.getElementById(id_balao).setAttribute("onclick","");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	pontuacao(-1);
}

function pontuacao(acao){
	//recuperar valores
	var baloes_inteiros=document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados=document.getElementById('baloes_estourados').innerHTML;
	
	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);
	
	baloes_inteiros = baloes_inteiros+acao;
	baloes_estourados = baloes_estourados-acao;
	
	var baloes_inteiros=document.getElementById('baloes_inteiros').innerHTML=baloes_inteiros;
	var baloes_estourados=document.getElementById('baloes_estourados').innerHTML=baloes_estourados;
	
	statusJogo(baloes_inteiros)
}

function contagem_tempo(tempo){
	tempo-=1; //oposto acumulador, tempo - 1
	if(tempo==-1){
		clearTimeout(timerId); // para execução
		game_over();
		return false;
	}
	document.getElementById('cronometro').innerHTML = tempo;
	timerId = setTimeout("contagem_tempo("+tempo+")",1000);
}

function game_over(){
	
	alert('Game Over');
}

function statusJogo(baloes_inteiros){
if(baloes_inteiros==0){
	alert('Parabéns!');
	pararJogo();
	}
}

function pararJogo(){
	clearTimeout(timerId);
}