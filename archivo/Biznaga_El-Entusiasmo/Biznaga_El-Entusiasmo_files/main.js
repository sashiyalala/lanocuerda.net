var myAdsTarget = "lc_tfuse";
var trcal = [];

var showTime=0; var expF=0;
function autor() { Pop('/TRAN/popAutor.php?code='+ocod, 300, 240); }
function calf()  { Pop(LC+"TRAN/popCalif.php?esweb=1&codigo="+ocod+"&lang="+LC_LANG, 260,270); }
function amigo(u) { Pop(LC+'Usuarios/popInfo.php?tcode='+ocod+'&u='+u, 350, 200); }
function coms() { ADS('/TRAN/utilComs.php?tcode='+ocod); }
//function text() { uri = w.location.href; nl=uri.substr(0,uri.indexOf('.shtml'))+'.txt'; w.location=nl.replace("cuerda.net/","cuerda.net/TXT/"); }

function favo() { if (DO.cookie.indexOf('lc_user')==-1) mLogin(); else { show('t_loader'); ADS(LC+'TRAN/popFavo.php?codigo='+ocod); } }

function text() {
	uri = w.location.href;
	uri = uri.replace(/\/tabs\/(_num|[a-z])\//, '/');
	ver=ocod.substr(ocod.length-1,1);
	pref=uri.substr(0,uri.indexOf('.shtml'));
	if (pref.indexOf('-') != -1) pref=uri.substr(0,uri.indexOf('-'));
	add = (ver =='1')?'':('-'+ver);
	w.location=pref.replace('cuerda.net/', 'cuerda.net/TXT/')+add+'.txt';
}

function favoSetStar(on) {
	GE('favoImg').className = (on == 1) ? "butCmd starOn" : "butCmd starOff";
}

var LC_FAVS = (LC_USER=='') ? null : lsGet('favs_'+LC_USER);
if (LC_FAVS == null) LC_FAVS = '|';

function fillHead(v) {
	for (i = 0; i < trcal.length; i++) if (trcal[i][3] == v) break;
	if (typeof(trcal[i]) == "undefined") trcal[i] = ['R', 0, 0, 1];
	img=calImg(trcal[i]);
	GE('tH2cal').className = 'cal '+img[0];
	GE('tH2cal').title=img[1];
	HTML('tH2txt', img[2])
	HTML('tH1span', tmTypes[trcal[i][0]]);
	HTML('tCode', ocod);
	if (oclb != '') {
		var colabs = oclb.split(' ');
		out = "";
		for (i=0; i < colabs.length; i++) {
			item = colabs[i];
			lk = item.substr(0,item.indexOf(';'));
			nm = item.substr(item.indexOf(';')+1);
			if (i == 0) out += 'Enviado por <a href="javascript:amigo(\''+lk+'\')">'+nm+'</a>';
			else if (i == 1) out += ', basado en <a href="javascript:amigo(\''+lk+'\')">'+nm+'</a>';
			else out += ', <a href="javascript:amigo(\'A:'+lk+'\')">'+nm+'</a>';
		}
		HTML('tColab', out)
	}
	if (LC_FAVS.indexOf(ocod) != -1) favoSetStar(1); else favoSetStar(0);
}

function tCal(d) {
	if (typeof(d) == "undefined") d = verAct();
	fillHead(d);
	trcal.sort(function(a, b) { return (b[1] - a[1]); })

	var newcal = [];
	for (t = 0; t < TIPOS.length; t++)
		for (i=0; i<trcal.length; i++) if (trcal[i][0] == TIPOS[t]) newcal.push(trcal[i]);
	trcal = newcal;

	var calData;
	var out = "<ul id='tList'>\n";
	for (i=0; i < trcal.length; i++) {
		calData = calImg(trcal[i]);
		addsty = (trcal[i][3] == d) ? "#ccc" : "transparent";
		out += "<li id='versLi"+trcal[i][3]+"' style='background:"+addsty+"' onclick='switchVersion(" + trcal[i][3] + ")' title='" + calData[1] + "'>";
		out += "<div class='tlLeft ti" + trcal[i][0] + "'></div><div class='tlMid'>" + tTypes[trcal[i][0]] + "</div>";
		out += "<div class='tlRight tlr" + calData[0].substr(3) +"'></div></li>\n";
	}
	for (i = trcal.length; i < 9; i++) out += "<li></li>";
	out += "</ul>\n";
	HTML('tNav', out);
//	setTimeout("GS('versLi"+d+"').background='#ccc'",100);
	GE('mlOpt1').className = 'sel'; GE('mlOpt2').className = ''; GE('mlOpt3').className = '';
}

var popData = {};
function Pop(url,w,h) {
	popData = {url:url,w:w,h:h};
	if (typeof(popCtl) == 'undefined') ADS('/TRAN/utilPop.js');
	else popCtl.start(popData);
}
//function PopEnd() { DO.getElementById('popcont').innerHTML = ''; }

function divBarAdd(id) {
	return;
	if (HTML('t_bspace')=="") HTML('t_bspace','<hr>');
	ga = DO.createElement('div'); ga.id = id; ga.className='t_tbar';
	GE("t_body").appendChild(ga);
}

function divBarHide(elm) { elm.parentNode.style.display='none'; }

var diagLaunchTgt = null;
function showDiag(evt) {
	if (MSIE == true) { e = w.event; tgt = e.srcElement; }
	else { e = evt; tgt = e.target; }
	if (tgt.tagName != "A" && tgt.tagName != "IMG") return;
	if (typeof(toolDiag) != 'undefined') { toolDiag.chordStart(tgt); return; }
	diagLaunchTgt = tgt; ADS('/TRAN/toolDiag.js');
}


function tFuse(art,sng) {
	var opts = {
		artist: art,
		song: sng,
		adunit_id: 39382407,
		div_id: "cf_async_" + Math.floor((Math.random() * 999999999)),
		hostname: "srv.tonefuse.com"
	};
	document.write('<div id="'+opts.div_id+'"></div>');var c=function(){cf.showAsyncAd(opts)};if(window.cf)c();else{cf_async=!0;var r=document.createElement("script"),s=document.getElementsByTagName("script")[0];r.async=!0;r.src="//"+opts.hostname+"/showads/showad.js";r.readyState?r.onreadystatechange=function(){if("loaded"==r.readyState||"complete"==r.readyState)r.onreadystatechange=null,c()}:r.onload=c;s.parentNode.insertBefore(r,s)};
}


ck = DO.cookie;

var kDownCmdKey = false;
function kDown(evt) {
	if (expF==1) return; evt = (evt) ? evt : ((w.event) ? event : null); if (evt == null) return;
  switch (evt.keyCode) {
		case 13: addCSS('full'); break;
		case 80: if (evt.ctrlKey || kDownCmdKey == true) { evt.preventDefault(); addCSS('print'); return false; } break;
		case 27: if (cssElm != null) printEnd(); break;
		case 91:
		case 93: if (evt.keyCode == 91 || evt.keyCode == 93) kDownCmdKey = true; return;
		default: return;
	}
	return false;
}
function kUp(evt) { if (evt.keyCode == 91 || evt.keyCode == 93) kDownCmdKey = false; }


function expFocus() { expF=1; }
function expBlur() { expF=0; }

function checkIfMobile() {
	UA = navigator.userAgent;
	RF = DO.referrer;
	if ((RF.indexOf("google")!= -1 || RF.indexOf('lacuerda.net')==-1) && UA.match(/iPod|iPhone|iPad|Android/)) {
		w.location.replace('http://m.lacuerda.net/itrans.php?t='+ocod);
/*
		var out =  "<div id=tSwitch onclick=\"w.location='http://m.lacuerda.net/itrans.php?t="+ocod+"'\"><center>\n";
		out += "<table><tr><td><img src=\"http://lacuerda.net/Promo/appicon90.png\"></td>\n";
		out += "<td>Cambia a la <font color=#f00>Versión Móvil</font></td>\n";
		out += "<td class=t3 ontouchstart=\"hide('tSwitch'); return false\">&nbsp;&nbsp;[X]</td></tr></table></center></div>\n";
		DO.body.innerHTML = out + DO.body.innerHTML;
*/
	}
}

var floatMin=320;
function tFloat() { de = DO.documentElement;
wt = (DO.all) ? de.scrollTop : w.pageYOffset; mt = de.scrollHeight - GE('f_float').offsetHeight - 50;
bt = (wt < floatMin) ? floatMin : wt+5; if (bt > mt) bt = mt; bs = GS('f_float'); bs.position='absolute'; bs.top = bt+'px';
setTimeout('tFloat()', 100);
}

function preload() {
	tCal();
	HTML('toolmenu', tMenu);
	HTML('tExplain', tHelp);
	if (typeof(LS['cmdBar']) == "undefined" || lsGet('cmdBar') == 1) {
		cmdBarToggle();
		setTimeout(function() { GS("tExplain").opacity=0; helpState=false; },5000);
	}

	if (typeof(LS.myFont) == "undefined") lsSet('myFont', '');
	if (typeof(LS.myColor) == "undefined") lsSet('myColor', '');
	if (typeof(LS.mySize) == "undefined") lsSet('mySize', '100');
	setFont();

	loaded();
}



function loaded() {
	var reqVer = (w.location.hash != '') ? PI(w.location.hash.substr(1)) : null;
	if (reqVer != null && reqVer != verAct()) {
		newurl = (ourl.indexOf('-') != -1) ? ourl.substr(0,ourl.indexOf('-')) : ourl;
		newurl += (reqVer == 1) ? "" : "-"+reqVer;
		w.location = newurl+'.shtml';
	}

	ADS(LC+"UTIL/cal.php?c=" + ocod.substr(0,ocod.length-1), function() { tCal(); });

	DO.onkeydown=kDown; DO.onkeyup=kUp; obj=DO.forms.mForm.exp;
	obj.setAttribute('onfocus','mExpF(); expF=true;'); obj.setAttribute('onblur','mExpB(); expF=false;');
	tgtevt = (typeof(w.ontouchstart) == "undefined") ? "click" : "touchend";
	GE('t_body').addEventListener(tgtevt, function(e) {showDiag(e)})
	DO.addEventListener('scroll', function(e) { fixCmds() })
	if (tgtevt=="touchend") GE('t_body').setAttribute('class', 't_bchord');
	histAdd();

	if (GE("ytFrame") != null) GE("ytFrame").src = ytVid;
}



var styleEl = null, fontsInCache = [];

function setFont() {
	if (styleEl != null) { DO.head.removeChild(styleEl); styleEl = null; }
	if (LS.myFont != '' && fontsInCache.indexOf(LS.myFont) == -1)  {
		linkEl = DO.createElement('link');
		linkEl.href = "https://fonts.googleapis.com/css2?family="+LS.myFont+"&display=swap";
		linkEl.rel = "stylesheet";
		DO.head.appendChild(linkEl);
		fontsInCache[LS.myFont] = 1;
	}

	if (LS.myFont == '' && LS.myColor == '' && LS.mySize == '100') return;

	styleEl = DO.createElement('style');
	DO.head.appendChild(styleEl);
	styleEl.appendChild(document.createTextNode(''));

	out = (LS.myFont != '') ? 'font-family:"'+LS.myFont.replace('+',' ')+'"; ' : '';
	out += (LS.mySize != '100') ? 'font-size:'+LS.mySize+'%; ' : '';
	styleEl.sheet.insertRule('#t_body pre { '+out+' }', 0);
	if (LS.myColor != '') styleEl.sheet.insertRule('#t_body a { color:#'+LS.myColor+' }', 1);
}




var headBuf = null, cssElm = null;
function addCSS(fn) {
	headBuf = HTML('mHead');
	var out = "";
	if (fn == "print") {
		out += "<div>&nbsp;</div>";
		out += "<div style='width:900px'><img src='//dzxlbnxeq55l2.cloudfront.net/IMG/lacuerda-bn.png'></div>";
	}
	out += "<div class='close' onclick='printEnd()'>&times;</div>";
	setStyle('/reload.php?fn=TRAN/'+fn+'.css');
	HTML('mHead', out);
	if (fn == "full") showTime = true;
	if (fn == "print") setTimeout("w.print()", 750);
}

function setStyle(s) {
  cssElm = DO.createElement('link'); cssElm.rel = 'stylesheet'; cssElm.href = s; cssElm.id='temaElm';
  var headID = DO.getElementsByTagName("head")[0];
  headID.appendChild(cssElm);
  HILITE_COLOR='#eee';
	return;
}

function printEnd() {
	HTML('mHead', headBuf);
	var headID = DO.getElementsByTagName("head")[0];
  headID.removeChild(cssElm);
}



// *************************************
// Nuevo2020
// *************************************

var cmdBarShow = false;
var cmdBarSec = "";

function fixCmds() {
	if (w.scrollY > 275) {
		GS('tranCmds').position = "fixed";
		GS('tranCmds').top = "30px";
		GS('tExplain').position = "fixed";
		GS('tExplain').top = "30px";
	} else {
		GS('tranCmds').position = "";
		GS('tranCmds').top = "";
		GS('tExplain').position = "";
		GS('tExplain').top = "";
	}

	if (w.scrollY > 485) {
		GS('ban160').position = "fixed";
		GS('ban160').top = "30px";
	} else {
		GS('ban160').position = "";
		GS('ban160').top = "";
	}

}


function cmdBarToggle() {
	if (cmdBarShow == false) {
		for (i=1; i<10; i++) {
			try { GS('butHrm'+i).marginTop = (45*i) + "px"; }
			catch(e) { break; }
		}
		cmdBarShow = true;
		setTimeout('helpShow(true)',250);
	}
	else {
		helpShow(false);
		for (i=1; i<10; i++) {
			try { GS('butHrm'+i).marginTop = "0"; }
			catch(e) { break; }
		}
		cmdBarShow = false;
	}
	lsSet('cmdBar', ((cmdBarShow == true) ? "1":"0"));
}


var buttonsAreOn = false;
function buttonShow() {
	if (buttonsAreOn == false) {
		for (i=1; i<10; i++) {
			if (GE('butHrm'+i) == null) break;
			GS('butHrm'+i).marginTop = (45*i) + "px";
		}
		buttonsAreOn = true;
	}
	else {
		if (helpIsOn == true) setTimeout('helpShow(false)',0);
		var i = 1;
		for (i=1; i<6; i++)
			GS('butHrm'+i).marginTop = "0";
		buttonsAreOn = false;
	}
}

var helpState = false;
var helpCnt = 0;
function helpShow(helpIsOn) {
//	HTML("t_body",(helpCnt++)+'helpShow:'+cmdBarShow+' '+helpIsOn+' '+helpState+"<br>\n"+HTML("t_body"));

	if (cmdBarShow == false || helpState == helpIsOn) return false;
	if (helpIsOn == true) {
		show('tExplain');
		setTimeout("GS('tExplain').opacity=0.90",10);
		helpState = true;
	}
	else {
		GS('tExplain').opacity = 0;
		setTimeout("hide('tExplain')", 100);
		helpState = false;
	}
	return false;
}

var tBars = {}, tHelps = {};
function bar(b) {
//	var n = 'bar'+b;
//	if (GE(n) == null) { ADS('/TRAN/tool'+b+'.js'); return; }
	var n = b;
	GE('toolsButton').className = 'butCmd';
	HTML('toolsButton', "<img src='//cdn.lacuerda.net/IMG/Tran/loader-blk.gif'>");
	if (typeof(tBars[b]) == "undefined") { ADS('/reload.php?fn=TRAN/tool'+b+'.js'); return; }
//	acn = (GS(n).display == 'none') ? 'init' : 'stop';
	acn = 'init';
	setTimeout('tool'+b+'.'+acn+'()',1);
}

var cambiaNot = false;
function notacion() {
	if (typeof(toolTran) == "undefined") { cambiaNot = true; bar('Tran'); }
	else {
		toolTran.proc(1000);
	}
}


var tMenu = "<div id='toolMenu'>";
tMenu += "	<div class='butCmd bTbox' id='toolsButton' style='z-index:10' onclick='cmdBarToggle()'></div>";
tMenu += "	<div id='butHrm1' class='butCmd bDesf' onclick='return bar(\"Desf\")'></div>";
tMenu += "  <div id='butHrm2' class='butCmd bDiag' onclick='return bar(\"Diag\")'></div>";
tMenu += "	<div id='butHrm3' class='butCmd bTran' onclick='return bar(\"Tran\")'></div>";
tMenu += "	<div id='butHrm4' class='butCmd' onclick='return notacion()'><em class='small'>C&raquo;Do</em></div>";
tMenu += "	<div id='butHrm5' class='butCmd bForm' onclick='return bar(\"Form\")'></div>";
tMenu += "</div>";

var tHelp = "Mostrar/Ocultar Menú&nbsp;<br>";
tHelp += "Desfile Automático&nbsp;<br>";
tHelp += "Diagramas de Acordes&nbsp;<br>";
tHelp += "Cambio de Tono&nbsp;<br>";
tHelp += "Cifrado Inglés/Latino&nbsp;<br>";
tHelp += "Formato del Texto&nbsp;<br>";

function mainMenu() {
	HTML('tranCmds', tMenu);
	setTimeout("HTML('tExplain', tHelp)",200);
	buttonsAreOn = false;
	setTimeout(buttonShow,50);

}

function switchVersion(num) {
	var pref = ocod.substr(0, ocod.length-1);
	var act = verAct();
	if (num == act) return;

	show('t_loader');
	ADS(IAPP_PREF+'t='+pref+num, gotTrans);
	GS('versLi'+act).background="#fff";
}

function gotTrans() {
	HTML("t_body", "<PRE>"+res.body+"</PRE>");
	ocod = res['rolacode'];
	odes = res['acolist'].replace(/#/g,'@');
	oclb = res['colab'];
	oband = res['banda'];
	orola = res['cancion'];
	otipo = res['tipo'];
	ouri = '/'+res['homedir']+'/'+res['fname']+((PI(res['ntrans'])==1)?'':'-'+res['ntrans']);
	v = verAct();
	fillHead(v);
	histAdd();

	if (typeof(toolDiag)!="undefined") {
		stt = GS('t_diag').display;
		toolDiag.dictReady = false;
		toolDiag.change();
	}
	hide('t_loader');

	var act = PI(ocod.substr(ocod.length-1));
	GS('versLi'+act).background="#ccc";
	w.location = '#'+res.ntrans;
}


function gotCalif() {
	var now = new Date().getTime();
	ADS(LC+"UTIL/cal.php?c="+ocod.substr(0,ocod.length-1)+"&tstamp="+now, function() { tCal(); });
}

function verAct() { return PI(ocod.substr(ocod.length-1)); }

function histAdd() {
	if (typeof(LS.lc_hind) == "undefined") { lsSet('lc_hind', "[]"); lsSet('lc_hdat', "{}"); }
	var ind = JSON.parse(LS.lc_hind);
	var dat = JSON.parse(LS.lc_hdat);
	pos = ind.indexOf(ocod);
	if (pos != -1) ind.splice(pos,1);
	ind.unshift(ocod);
	if (typeof(dat[ocod]) == 'undefined') dat[ocod] = {'b':oband, 'r':orola, 't':otipo, 'u':ourl };

	if (ind.length > 10) {
		out = ind.pop();
		delete dat[out];
	}

	lsDel('lc_hind');
	lsDel('lc_hdat');
	lsSet('lc_hind', JSON.stringify(ind));
	lsSet('lc_hdat', JSON.stringify(dat));
}
