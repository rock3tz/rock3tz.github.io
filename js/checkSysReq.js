var valor = 0;
var checkFlash = 10.3;
var ieMinVersion = 9.0;
var ieMaxVersion = 11.0;
var screenMinWidth = 1024;
var screenMinHeight = 768;
var lang;
var ieNumVs;

$(document).ready(function()
{
	$('#flashContent').delay(500).fadeIn(1000, "swing");
    $.ajax({
        type: "GET",
        url: "curso.xml",
        dataType: "xml",
        success: parseXml,
        error: launchMain
    });
});

function scoFrameStatus()
{
	var temp = [];
	
	//check Formare version
	if(window.parent.frameAberta == undefined)
	{
		temp[0] = window.parent.isPaneCollapsed(); //LMS4
		temp[1] = 4;
	}
	else
	{
		temp[0] = window.parent.frameAberta;  //LMS3
		temp[1] = 3;
	}
		
		
	return temp;
}

function parseXml(xml)
{
    $(xml).find("parametros").each(function()
    {
        lang = $(this).attr("lingua");
    });
    firstParams();
    checkParams();
}

function firstParams()
{
	if (lang == "pt")
	{
		document.getElementById('td_title_main').innerHTML = 'REQUISITOS DE SISTEMA';
    	document.getElementById('td_title').innerHTML = 'PARA UMA CORRECTA VISUALIZAÇÃO DO CONTEÚDO RECOMENDA-SE:';
    	document.getElementById('td1').innerHTML = 'SISTEMA OPERATIVO<br/><span class="topLefBoard2" border="0">Recomendado | Windows 7 ou superior</span>';
    	document.getElementById('td2').innerHTML = 'INTERNET EXPLORER<br/><span class="topLefBoard2" border="0">Recomendado | Internet Explorer 9 ou superior</span>';
		document.getElementById('td3').innerHTML = 'FLASH PLAYER<br/><span class="topLefBoard2" border="0">Mínimo | Flash Player 10.3</span>';
		document.getElementById('td4').innerHTML = 'RESOLUÇÃO DE ECRÃ<br/><span class="topLefBoard2" border="0">Recomendado | 1024 x 768 px</span>';
		document.getElementById('td5').innerHTML = 'COOKIES<br/><span class="topLefBoard2" border="0">Recomendado | Suporte para Cookies</span>';
		document.getElementById('btn').src = "./images/bt_pt.png";
		//document.getElementById('btn').src = "./images/bt_pt2.png";
	}
	else if (lang == "en")
	{
		document.getElementById('td_title_main').innerHTML = 'SYSTEM REQUIREMENTS';
    	document.getElementById('td_title').innerHTML = "FOR BEST EXPERIENCE WE RECOMMEND THE FOLLOWING:";
		document.getElementById('td1').innerHTML = 'OPERATING SYSTEM<br/><span class="topLefBoard2" border="0">Recommended | Windows 7 or later</span>';
		document.getElementById('td2').innerHTML = 'INTERNET EXPLORER<br/><span class="topLefBoard2" border="0">Recommended | Internet Explorer 9 or higher</span>';
		document.getElementById('td3').innerHTML = 'FLASH PLAYER<br/><span class="topLefBoard2" border="0">Minimum | Flash Player 10.3</span>';
		document.getElementById('td4').innerHTML = 'SCREEN RESOLUTION<br/><span class="topLefBoard2" border="0">Recommended | 1024 x 768 px</span>';
		document.getElementById('td5').innerHTML = 'COOKIES<br/><span class="topLefBoard2" border="0">Recommended | Cookies Support</span>';
		document.getElementById('btn').src = "./images/bt_en.png";
		//document.getElementById('btn').src = "./images/bt_en2.png";
	}
}

function checkParams()
{
	verOS();
	checkVersion();
	outputPlayerversion();
	verScreen();
	verCookies();
	resultado();
}

// WINDOWS
function verOS()
{
    var agt = navigator.userAgent.toLowerCase(); // OS Name

    if ((agt.indexOf("windows nt 5.1")!=-1) || (agt.indexOf("windows xp")!=-1))
    {
    	document.getElementById('tda').innerHTML = '<img src="images/right.png">';
    	document.getElementById('tda1').innerHTML = 'WINDOWS XP';
        valor += 1;
    }
    else if ((agt.indexOf("windows nt 6.0")!=-1) || (agt.indexOf("windows vista")!=-1))
    {
    	document.getElementById('tda').innerHTML = '<img src="images/right.png">';
    	document.getElementById('tda1').innerHTML = 'WINDOWS VISTA';
    	valor += 1;
    }
    else if ((agt.indexOf("windows nt 6.1")!=-1) || (agt.indexOf("windows 7")!=-1))
    {
    	document.getElementById('tda').innerHTML = '<img src="images/right.png">';
        document.getElementById('tda1').innerHTML = 'WINDOWS 7';
        valor += 1;
    }
    else if ((agt.indexOf("windows nt 6.2")!=-1) || (agt.indexOf("windows 8")!=-1))
    {
    	document.getElementById('tda').innerHTML = '<img src="images/right.png">';
        document.getElementById('tda1').innerHTML = 'WINDOWS 8';
        valor += 1;
    }
	else if ((agt.indexOf("windows nt 6.3")!=-1) || (agt.indexOf("windows 8.1")!=-1))
    {
    	document.getElementById('tda').innerHTML = '<img src="images/right.png">';
        document.getElementById('tda1').innerHTML = 'WINDOWS 8.1';
        valor += 1;
    }
    else if ((agt.indexOf("windows nt 10")!=-1) || (agt.indexOf("windows 10")!=-1))
    {
        document.getElementById('tda').innerHTML = '<img src="images/right.png">';
        document.getElementById('tda1').innerHTML = 'WINDOWS 10';
        valor += 1;
    }
    else
    {
    	document.getElementById('tda').innerHTML = '<img src="images/alert.png">';
    	if(lang == "en") document.getElementById('tda1').innerHTML = '<span class="alerta">NOT USING WINDOWS</span>';
    	if(lang == "pt") document.getElementById('tda1').innerHTML = '<span class="alerta">NÃO ESTÁ A USAR WINDOWS</span>';
    }
}

// BROWSER
function getInternetExplorerVersion()
{
	// Returns the version of Internet Explorer or a -1
    // (indicating the use of another browser).
    var rv = -1; // Return value assumes failure.
	
	//detecta ate ao 10
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
	    var ua = navigator.userAgent;
	    //var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	    var re = /MSIE\s([\d]+)/; /*  /Trident\/\d\.\d/   IE>=8*/
	    if (re.exec(ua) != null)
	    rv = parseFloat(RegExp.$1);
		
		if(rv == 7)
		{
			if(ua.indexOf("Trident") != -1)
				rv = 9;
		}
    }
	else //validar se é o IE11
	{
		var ua = navigator.userAgent;
	    //var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	    var re = /Trident\/\d\.\d/;
	    
		if (re.exec(ua) != null)
		{
			var stringResultado = re.exec(ua);
		
			var versao = stringResultado[0].substring(stringResultado[0].indexOf("/")+1);
		
			rv = parseFloat(versao)+4;
		}
	}
    ieNumVs = rv;
    return rv;
	
}
function checkVersion()
{
	var ver = getInternetExplorerVersion();

    if(lang == "en")
    {
    	var msg = "<img src='images/alert.png'>";
    	var msg1 = "<td class='middleRightBoard'><span class='alerta'>NOT USING INTERNET EXPLORER</span>";
    }
    if(lang == "pt")
    {
    	var msg = "<img src='images/alert.png'>";
    	var msg1 = "<span class='alerta'>NÃO ESTÁ A USAR O INTERNET EXPLORER<\/span>";
    }

    if (ver > -1)
    {
        if (ver >= ieMinVersion && ver <= ieMaxVersion)
        {
            msg = "<img src='images/right.png'>";
            msg1 = "INTERNET EXPLORER " + ieNumVs;
        }
        else
        {
           msg = "<img src='images/alert.png'>";
           msg1 = "<span class='alerta'>INTERNET EXPLORER " + ieNumVs + "</span>";
           //document.getElementById('btn_holder').style.visibility="hidden";
        }
    }
	valor += 1;
   document.getElementById('tdb').innerHTML = msg;
   document.getElementById('tdb1').innerHTML = msg1;
}

// FLASH
function outputPlayerversion()
{
	var playerVersion = swfobject.getFlashPlayerVersion(); // returns a JavaScript object
	
	var fplayer = parseFloat(playerVersion.major + "." + playerVersion.minor); 
	if (fplayer >= checkFlash)
    {
    	document.getElementById('tdc').innerHTML = "<img src='images/right.png'>";
    	document.getElementById('tdc1').innerHTML = "FLASH PLAYER " + fplayer;
    	valor += 1;
    }
    else if(fplayer < checkFlash && playerVersion.major != 0)
    {
    	document.getElementById('tdc').innerHTML = "<img src='images/wrong.png'>";
    	document.getElementById('tdc1').innerHTML = "<span class='erro'>FLASH PLAYER "+ fplayer + " *</span>";
    	document.getElementById('btn_holder').style.visibility="hidden";
    	valor += 1;
		
		var browser = get_browser();
		if(browser.name.indexOf("Chrome") == 0) {
			location.href='embed.html';
		}
    }
    else
    {
    	document.getElementById('tdc').innerHTML = "<img src='images/wrong.png'>";
    	if(lang == "en") document.getElementById('tdc1').innerHTML = "<span class='erro'>NOT INSTALLED *</span>";
    	if(lang == "pt") document.getElementById('tdc1').innerHTML = "<span class='erro'>NÃO INSTALADO *</span>";
    	document.getElementById('btn_holder').style.visibility="hidden";
    	valor += 1;
		
		var browser = get_browser();
		if(browser.name.indexOf("Chrome") == 0) {
			location.href='embed.html';
		}
    }
}

//SCREEN
function verScreen()
{
    if (screen.width >= screenMinWidth && screen.height >= screenMinHeight)
    {
    	document.getElementById('tdd').innerHTML = "<img src='images/right.png'>";
    	document.getElementById('tdd1').innerHTML = screen.width + " x " + screen.height + " px";
    	valor += 1;
    }
    else
    {
    	document.getElementById('tdd').innerHTML = "<img src='images/alert.png'>";
    	document.getElementById('tdd1').innerHTML = "<span class='alerta'>" + screen.width + " x "+ screen.height + "<\/span>";
    }
}

//COOKIES
function verCookies()
{
    if(lang == "en")
    {
        if (navigator.cookieEnabled)
        {
        	document.getElementById('tde').innerHTML = "<img src='images/right.png'>";
        	document.getElementById('tde1').innerHTML = "COOKIES SUPPORTED";
        	valor += 1;
        }
        else
        {
        	document.getElementById('tde').innerHTML = "<img src='images/alert.png'>";
        	document.getElementById('tde1').innerHTML = "<span class='alerta'>COOKIES NOT SUPPORTED<\/span>";
        }
    }
    if(lang == "pt")
    {
        if (navigator.cookieEnabled)
        {
        	document.getElementById('tde').innerHTML = "<img src='images/right.png'>";
        	document.getElementById('tde1').innerHTML = "COOKIES SUPORTADOS";
        	valor += 1;
        }
        else
        {
        	document.getElementById('tde').innerHTML = "<img src='images/alert.png'>";
        	document.getElementById('tde1').innerHTML = "<span class='alerta'>COOKIES NÃO SUPORTADOS<\/span>";
        }
    }
}

function resultado()
{
   // if( valor < 5)
    //if( valor < 5)
    if(document.getElementById('btn_holder').style.visibility=="hidden")
    {
    	if(lang == "en") document.getElementById('result').innerHTML = "* CONTACT HELPDESK: &nbsp;&nbsp;&nbsp;&nbsp 1. hdesk@tap.pt &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; 2. ext. 39393 &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; 3. +351 2104489393";
    	if(lang == "pt") document.getElementById('result').innerHTML = "* CONTACTAR O HELPDESK: &nbsp;&nbsp;&nbsp;&nbsp 1. hdesk@tap.pt &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; 2. ext. 39393 &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; 3. +351 2104489393";
    	//alert("SOMETHING IS WRONG");
    }
    else if(valor == 5)
    {
    	launchMain();
    	//alert("EVERYTHING IS FINE");
    }
}
function get_browser() {
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
}
