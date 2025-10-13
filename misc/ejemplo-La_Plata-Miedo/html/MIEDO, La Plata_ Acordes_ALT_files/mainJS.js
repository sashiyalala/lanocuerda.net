var LC = 'https://lacuerda.net/'; var LC_ACO = 'https://acordes.lacuerda.net/'; var LC_USER='', LC_LANG = 'ES';
var w=window; var DO=document; var mLoginAct=null; var MSIE = (navigator.userAgent.indexOf('MSIE')!=-1) ? true:false;
ck=unescape(DO.cookie); i=ck.indexOf('lc_user'); if (i!=-1) { e=ck.indexOf(';',i+8); LC_USER=(e!=-1)?ck.substr(i+8,e-i-8):ck.substr(i+8); }
IAPP_PREF = "https://m.lacuerda.net/iapp.php?esweb=1&";
var TIPOS = ['R','T','B','K','D','H'];
var tTypes = {'R': 'Letra y Acordes', 'T':'Tablatura', 'B':'Tab p/Bajo', 'K':'Teclados', 'H':'Armónica', 'D':'Batería'};
var tmTypes = { 'R': '', 'T':'[tab]', 'B':'[bajo]', 'K':'[piano]', 'H':'[armónica]', 'D':'[batería]'};
var tmmTypes = { 'R': '', 'T':'[tab]', 'B':'[bajo]', 'K':'[pia]', 'H':'[armo]', 'D':'[bat]'};

w.googletag = w.googlatg || {cmd:[]};
function GE(elm) { return DO.getElementById(elm); }
function GS(elm) { return DO.getElementById(elm).style; }
function PI(elm) { return parseInt(elm,10) }
function show(elm) { GS(elm).display = ''; }
function hide(elm) { GS(elm).display = 'none'; }
function HTML(elm, newdata) { if (typeof(newdata)!="undefined") GE(elm).innerHTML=newdata; else return GE(elm).innerHTML; }
function ADS(u,o) { s=DO.createElement('script'); s.type='text/javascript'; s.charset='UTF-8'; s.async=true; s.src=u; if (typeof(o)!="undefined") s.onload=o; DO.getElementsByTagName("head")[0].appendChild(s); }

var LS = localStorage;
function lsGet(key) { return localStorage.getItem(key); }
function lsSet(key,val) { localStorage.removeItem(key); localStorage.setItem(key,val); } // <-- esta era lsChange
function lsDel(key) { localStorage.removeItem(key); }

function mShTop() {
	cont = "<div id='mTop'>";
	cont += (typeof(mMini)!="undefined") ? "" : "<div id='mtMenuBut' onclick='toogleMenu()'><div></div></div>";
	cont += "<div id='mtLogo'"+((typeof(mMini)!="undefined") ? " style='width:100%; text-align:center'" : "")+">";
	cont += "<a href='"+LC+"' title='Tablaturas y Acordes de Guitarra'><img src='//dzxlbnxeq55l2.cloudfront.net/IMG/newlogo.png' ></a></div>";
	cont += "<div class=mtSecs>";
	cont += "<a href='"+LC_ACO+"tabs/' title='Canciones en Guitarra'>canciones</a> &nbsp;&nbsp;&nbsp;&nbsp;";
	cont += "<a href='https://lacuerda.net/Recursos/acordes/' title='Acordes Guitarra'>acordes</a> &nbsp;&nbsp;&nbsp;&nbsp;";
	cont += "<a href='https://lacuerda.net/Recursos/afinador/' title='Afinador de Guitarra'>afinador</a> &nbsp;&nbsp;&nbsp;&nbsp;";
	cont += "<a href='javascript:goFavs()'>favoritos</a> &nbsp;&nbsp;&nbsp;&nbsp;";
	cont += "<a href='//guitarra.lacuerda.net'>guitarra</a> &nbsp;&nbsp;&nbsp;&nbsp;";
	cont += "<a href='//piano.lacuerda.net'>piano</a> &nbsp;&nbsp;&nbsp;&nbsp;";
	cont += "<a href='//videos.lacuerda.net'>videos</a></div>";
	if (typeof(mMini)=="undefined") {
		cont += "<div id='mtBusc'><form name='mForm' action='/busca.php' method='get'><input type=hidden name=canc value=0>";
		cont += "<em onclick='mEnvio()' class='mtBuscImg'><span class='lupa' style='display:block!important; background-color:transparent!important; background-image:none!important'>&#9906;</span></em>";
		cont += "<input id='mtBuscExp' type='text' name='exp' autocorrect='off' autocapitalize='off' placeholder='Buscar Artista y/o Canción' onfocus='mExpF()' onblur='mExpB()'>";
		cont += "</form></div><div id='mtBuscBut' onclick='toogleBusca()'><div></div></div>";
	}
	cont += "</div>";
	HTML('mTopCont',cont);

if (LC_USER!='') {
	out = "<div id='mUsr' style='padding-right:0'><a href='"+LC+"Favoritos/'>Mis favoritos</a> &nbsp;<a href='"+LC+"/Usuarios/perfil.php?dest="+LC_USER+"&s=80'>Mi perfil</a> &nbsp;<a href='"+LC+"Usuarios/login.php?action=logout'>Salir</a> &nbsp;&nbsp;"
	out += "&#8592;&nbsp;&nbsp;"+LC_USER;
	out += "<img src='"+LC+"/Usuarios/avatar.php?a="+LC_USER+"&s=80'></div>";
//	out += "</div>";
	HTML('mHead',HTML('mHead')+out);
}
else {
	out =  "<div id='mSel'></div>";
	out += "<div id='mLan' class='lanES' onclick='langChange()'></div>"
	out += "<div id='mLgn' onclick='mLogin()'>Conexión</div>";
	out += "<div id='mReg' onclick='w.location=\""+LC+"Usuarios/registro.php\"'>Inscripción</div>";
	HTML('mHead',HTML('mHead') + out);
}
}

function langChange(lg) {
	chk = LC_LANG;

	if (typeof(lg) != "undefined") {
		if (lg == chk) {
			GS('mSel').display = "";
			show('mLgn');
			show('mReg');
			show('mLan');
			return;
		}

		var hn = w.location.hostname.substr(0,w.location.hostname.indexOf('.'));
		if (hn == 'acordes' || hn == 'chords' || hn =='cifras') {
			var wl = w.location.href;
			switch(lg) {
				case 'ES': w.location.hostname = 'acordes.lacuerda.net'; break;
				case 'EN': w.location.hostname = 'chords.lacuerda.net'; break;
				case 'PT': w.location.hostname = 'cifras.lacuerda.net'; break;
			}
		}
		else {
			w.location = LC_HOST+"?lang="+lg;
		}
		return;
	}

	var langList = ['PT', 'EN', 'ES'];
	out = "<div class='mLan lan"+chk+"' style='text-decoration:underline; color:#000' onclick='langChange(\""+chk+"\")'></div>";
	for (i = 0; i < langList.length; i++) {
		l = langList[i];
		if (l == chk) continue;
		out += "<div class='mLan lan"+l+"' onclick='langChange(\""+l+"\")'></div>";
	}

	HTML('mSel', out);
	hide('mLgn');
	hide('mReg');
	hide('mLan');
	GS('mSel').display = "block";
//	setTimeout(function() {GS('mSel').marginTop = 0},50);
}

var expFocus = false;
function mExpF() { expFocus = true; }
function mExpB() { expFocus = false; }


function mEnvio() { DO.forms.mForm.submit(); }

function mLogin() { popData = {url:LC+'/Usuarios/login.php',w:300,h:300}; ADS("/TRAN/utilPop.js"); }

function goFavs() {
if (document.cookie.indexOf('lc_user')==-1) { mLoginAct=function() {w.location=LC+'Favoritos/';}; mLogin(); } else w.location=LC+'Favoritos/'; }

function calImg(d) { img=Math.floor(d[1]/0.5)*5; if (img>90) img=90; if(img<55) img=55;
	if (d[2]==0) { img='00';txt='N/A (0 opiniones)'; dsc='N/A <em>(0)</em>';}
	else { txt=d[1]+' ('+d[2]+' opiniones)'; dsc = d[1]+"<em>/10 ("+d[2]+")</em>"; }
	return ['cal'+img, txt, dsc];
}



// NUEVO 2020
var menuShow = 0;
function toogleMenu() {
	if (menuShow == 0) {
		show('mMask');
		GE('mLeft').style.setProperty("-webkit-transition", "none");
		GS('mLeft').top = (44 - PI(w.innerHeight))+'px';

		GS('mLeft').display='block';
		GE('mLeft').style.setProperty("-webkit-transition", "top 0.15s linear");
		setTimeout('GS("mLeft").top = "44px"',5);
		menuShow = 1;
	}
	else {
		hide('mMask');
		GS('mLeft').top = (44 - PI(w.innerHeight))+'px';
		setTimeout(function() { GS('mLeft').display=''; GS('mLeft').top = ''; },200);
		menuShow = 0;
	}
}

var buscaShow = 0;
function toogleBusca() {
	if (buscaShow == 0) {
		hide("mtLogo");
		GS('mtBusc').display = "block";
		buscaShow = 1;
	}
	else {
		GS('mtBusc').display = "";
		show("mtLogo");
		buscaShow = 0;
	}
}

function maskMsg(msg, mtop) {
	add = (typeof(mtop) != "undeinfed") ? " style='margin-top:"+mtop+"px'" : "";
	HTML('mMask', '<div'+add+'>'+msg+'</div>');
	show('mMask');
	setTimeout("GS('mMask').opacity = 0", 2000);
	setTimeout(function() { hide('mMask'); GS('mMask').opacity = "";}, 3000);
}

function showLoader() {
	HTML('mMask', '<div><img src="//dzxlbnxeq55l2.cloudfront.net/IMG/loader2.gif"></div>');
	show('mMask');
}
function hideLoader() { HTML('mMask', ''); hide('mMask'); }


var esBest = 0;
function bandList(hdir,b) {
	esBest = b;
	show('t_loader');
	var best = (b == 1) ? "&best=1" : "";
	ADS(IAPP_PREF+'b='+hdir+best, gotBandList);
}

function gotBandList() {
	var add = (esBest == 1) ? ".shtml" : "";
	var out = "<div id=rList class='rList'><ul>\n";
	for (i=0; i < res['items'].length; i++) {
		item =  res['items'][i];
		out += "<li onclick='w.location=\""+item['url']+add+"\"'><em class=a>"+item['txt']+"</em></li>\n";
		}
	out += "</ul></div>\n";

	if (res['items'].length >= 10) out += "<div class='rListBot' onclick=\"GE('rList').scrollTop = GE('rList').scrollTop + 34;\">&mapstodown;</div>\n";

	HTML('tNav', out);
	if (GE('t_loader') != null) hide('t_loader');
	if (GE('mlOpt3') == null) { GE('mlOpt1').className = 'big sel'; GE('mlOpt2').className = ''; }
	else { GE('mlOpt1').className = ''; GE('mlOpt2').className = 'sel'; GE('mlOpt3').className = ''; }
}

function listHist() {
	var ind = JSON.parse(lsGet('lc_hind'));
	var dat = JSON.parse(lsGet('lc_hdat'));

	if (ind == null) {
		var out = "<div style='margin:0 auto; border-top:1px solid #888; height:60px; padding-top:10px; color:#888; font-size:11px; line-height:1.3; text-align:center'>Desde aquí puedes acceder rápidamente a las últimas canciones que has consultado</div>";
		out += "<ul class=tList><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
	}
	else {
		var out = "<div class='rList rbList'><ul>\n";
		for (i=0; i< ind.length; i++) {
			d = dat[ind[i]];
			add = (d['t']=='R') ? '' : " <font style='font-size:8px; line-height:6px; color:#060'>"+tmmTypes[d['t']]+"</font>";
			out += "<li onclick='w.location=\""+d['u']+".shtml\"'><a href='javascript:'>";
			out += d['r']+add+"<em>"+d['b']+"</em></a></li>\n";
			}
		out += "</ul></div>\n";
	}
	HTML('tNav', out);
	if (GE('mlOpt3') == null) { GE('mlOpt1').className = 'big'; GE('mlOpt2').className = 'sel'; }
	else { GE('mlOpt1').className = ''; GE('mlOpt2').className = ''; GE('mlOpt3').className = 'sel'; }
}

function showPops() {
	HTML('tNav', popList);
	if (GE('t_loader') != null) hide('t_loader');
	if (GE('mlOpt3') == null) { GE('mlOpt1').className = 'big sel'; GE('mlOpt2').className = ''; }
	else { GE('mlOpt1').className = 'sel'; GE('mlOpt2').className = ''; GE('mlOpt3').className = ''; }
}

function tShare(n) {
	u = ['https://www.facebook.com/sharer.php?u=', 'http://twitter.com/intent/tweet?source=sharethiscom&url=', 'https://plus.google.com/share?url='];
	w.open(u[n]+w.location.href,'blank','titlebar=0,menubar=0,width=640,height=500');
}


function lc_gotMessage(e) {
	var cmd = e.data;
	if (e.data == null || typeof(e.data) != "string") return;
	switch (true) {
		case (cmd == "loader"): showLoader(); break;

		case (cmd.substr(0,5) == 'login'):
			if (cmd.length > 5) {
				var loginData = JSON.parse(cmd.substr(11));
				LC_USER = loginData['apodo'];
				lsSet('favs_'+loginData['apodo'], loginData['favs']);
			}
			if (mLoginAct!=null) { popCtl.stop(); mLoginAct(); } else w.location.reload();
		  break;

		case (cmd == 'popclose'): try { popCtl.stop(); } catch(err) {} break;

		case (cmd == 'gotcalif'): try { gotCalif(); } catch(err) {} break;
	}
}
w.addEventListener("message", lc_gotMessage, false);

function aaxStart() {
	if ( typeof(window.google_jobrunner) !== "undefined" ) return;
	// AAX AD RECOVERY
	(function () {
	window.aax = window.aax || {};
	var aax = window.aax;
	aax.initTime = new Date().getTime(); aax.pubId = "AAX8H5GPU";
	aax.ver = "1.2";
	aax.hst = window.location.hostname;
	var aaxEndpoint = "https://c.aaxads.com/aax.js?pub=" + aax.pubId + "&hst=" +
	aax.hst + "&ver=" + aax.ver;
	function loadScript(endpoint) {
	var scriptTag = document.createElement("script"),
	placeTag = document.getElementsByTagName("script")[0]; scriptTag.type = "text/javascript";
	scriptTag.async = true;
	scriptTag.src = endpoint; placeTag.parentNode.insertBefore(scriptTag, placeTag);
	}
	loadScript(aaxEndpoint); })();
}
setTimeout("aaxStart()", 5000);
