<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="language" content="de" />
<meta name="author" content="Gameforge AG" />
<meta name="publisher" content="Gameforge AG" />
<meta name="copyright" content="Gameforge AG" />
<meta name="page-type" content="Browsergame, Browser game" />
<meta name="page-topic" content="Browser game, strategy game, online game" />
<meta name="audience" content="all" />
<meta name="Expires" content="never" />
<meta name="Keywords" content="Ikariam, antique world, strategy game, play for free, online game, role play game, browser game, game"/>
<meta name="Description" content="Ikariam is a free browser game. The task is to lead a nation through the ancient world, building up towns, trade and conquer islands." />
<meta name="robots" content="index,follow" />
<meta name="Revisit" content="After 14 days" />
<title>Ikariam - Live the ancient world!</title>
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
		<link href="/skin/complete-0.1.8.css" rel="stylesheet" type="text/css" media="screen" />
		<script type="text/javascript" src="/js/complete-0.1.8.js"></script>


			<script type="text/javascript">
var xajaxRequestUri="http://s3.ikariam.org/index.php?view=worldmap_iso";
var xajaxDebug=false;
var xajaxStatusMessages=false;
var xajaxWaitCursor=true;
var xajaxDefinedGet=0;
var xajaxDefinedPost=1;
var xajaxLoaded=false;
function xajax_getMapData(){return xajax.call("getMapData", arguments, 1);}
	</script>
	<script type="text/javascript" src="/js/xajax_js/xajax.js"></script>
	<script type="text/javascript">
window.setTimeout(function () { if (!xajaxLoaded) { alert('Error: the xajax Javascript file could not be included. Perhaps the URL is incorrect?\nURL: /js/xajax_js/xajax.js'); } }, 6000);
	</script>
		<script type="text/javascript">
		/* <![CDATA[ */

		var Event = YAHOO.util.Event,
		Dom   = YAHOO.util.Dom,
		lang  = YAHOO.lang;

		var LocalizationStrings = new Array();
		LocalizationStrings['timeunits'] = new Array();
		LocalizationStrings['timeunits']['short'] = new Array();
		LocalizationStrings['timeunits']['short']['day'] = 'D';
		LocalizationStrings['timeunits']['short']['hour'] = 'h';
		LocalizationStrings['timeunits']['short']['minute'] = 'm';
		LocalizationStrings['timeunits']['short']['second'] = 's';

        LocalizationStrings['language']                     = 'en';
        LocalizationStrings['decimalPoint']               = '.';
        LocalizationStrings['thousandSeperator']     = ',';

		/**
		* switches one item on and the other off.. but only if they share the same groupname.
		*/
		selectGroup = {
			groups:new Array(), //[groupname]=item
			getGroup:function(group) {
				if(typeof(this.groups[group]) == "undefined") {
					this.groups[group] = new Object();
					this.groups[group].activeItem = "undefined";
					this.groups[group].onActivate = function(obj) {};
					this.groups[group].onDeactivate = function(obj) {};
					}
				return this.groups[group];
			},
			activate:function(obj, group) {
				g = this.getGroup(group);
				if(typeof(g.activeItem) != "undefined") {
					g.onDeactivate(g.activeItem);
					}
				g.activeItem=obj;
				g.onActivate(obj);
			}
		};
		selectGroup.getGroup('cities').onActivate = function(obj) {
			YAHOO.util.Dom.addClass(obj.parentNode, "selected");
		}
		selectGroup.getGroup('cities').onDeactivate = function(obj) {
			YAHOO.util.Dom.removeClass(obj.parentNode, "selected");
		}

		/**
		 * - will COPY all child nodes of the source-node that are marked with a CSS class to be child nodes of the target.
		 * - will purge all children of the TARGET element that are marked the same special CSS class at each call, so previously copied will be deleted before copying new
		 * - expects either an Id or an object.
		 */
		function showInContainer(source, target, exchangeClass) {
			//objects or Id-strings, i don't care
			if(typeof source == "string") { source = Dom.get(source); }
			if(typeof target == "string") {target = Dom.get(target); }
			if(typeof exchangeClass != "string") { alert("Error: IKARIAM.showInContainer -> Forgot to add an exchangeClass?"); }
			//removal
			for(i=0; i<target.childNodes.length; i++) {
				if(typeof(target.childNodes[i].className) != "undefined" && target.childNodes[i].className==exchangeClass) {
					target.removeChild(target.childNodes[i]);
				}
			}
			//clone new
			for(i=0; i<source.childNodes.length; i++) {
				if(typeof(source.childNodes[i].className) != "undefined" && source.childNodes[i].className==exchangeClass) {
					clone = source.childNodes[i].cloneNode(true);
					target.insertBefore(clone, target.firstChild.nextSibling);
				}
			}
		}

		selectedCity = -1;
		function selectCity(cityNum, cityId, viewAble) {
		    if(selectedCity == cityNum) {
		        if(viewAble) document.location.href="?view=city&id="+cityId;
		        else document.location.href="#";
		    } else {
		        selectedCity = cityNum;
		    }
			showInContainer("cityLocation"+cityNum,"information", "cityinfo");
			showInContainer("cityLocation"+cityNum,"actions", "cityactions");
			var container = document.getElementById("cities");
			var citySelectedClass = "selected";
		}

		//IE6 CSS Background-Flicker fix
		(function(){
			/*Use Object Detection to detect IE6*/
			var  m = document.uniqueID /*IE*/
			&& document.compatMode  /*>=IE6*/
			&& !window.XMLHttpRequest /*<=IE6*/
			&& document.execCommand ;
			try{
				if(!!m){
					m("BackgroundImageCache", false, true) /* = IE6 only */
				}
			}catch(oh){};
		})();
		/* ]]> */

		function myConfirm(message, target) {
		    bestaetigt = window.confirm (message);
		    if (bestaetigt == true)
              window.location.href = target;
		}

		</script>
	</head>
	<body id="worldmap_iso">
		<script type="text/javascript" src="/js/wz_tooltip.js"></script>
		<div id="container">
			<div id="container2">
				<div id="header">
					<h1>Ikariam</h1>
					<h2>Live the ancient world!</h2>
				</div>

<script type='text/javascript'>
m = new Array;m[0] = new Array;m[1] = new Array;m[2] = new Array;m[3] = new Array;m[4] = new Array;m[5] = new Array;m[6] = new Array;m[7] = new Array;m[8] = new Array;m[9] = new Array;m[10] = new Array;m[11] = new Array;m[12] = new Array;m[13] = new Array;m[14] = new Array;m[15] = new Array;m[16] = new Array;m[17] = new Array;m[18] = new Array;m[19] = new Array;m[20] = new Array;m[21] = new Array;m[22] = new Array;m[23] = new Array;m[24] = new Array;m[25] = new Array;m[26] = new Array;m[27] = new Array;m[28] = new Array;m[29] = new Array;m[30] = new Array;m[31] = new Array;m[32] = new Array;m[33] = new Array;m[34] = new Array;m[35] = new Array;m[36] = new Array;m[37] = new Array;m[38] = new Array;m[39] = new Array;m[40] = new Array;m[41] = new Array;m[42] = new Array;m[43] = new Array;m[44] = new Array;m[45] = new Array;m[46] = new Array;m[47] = new Array;m[48] = new Array;m[49] = new Array;m[50] = new Array;m[51] = new Array;m[52] = new Array;m[53] = new Array;m[54] = new Array;m[55] = new Array;m[56] = new Array;m[57] = new Array;m[58] = new Array;m[59] = new Array;m[60] = new Array;m[61] = new Array;m[62] = new Array;m[63] = new Array;m[64] = new Array;m[65] = new Array;m[66] = new Array;m[67] = new Array;m[68] = new Array;m[69] = new Array;m[70] = new Array;m[71] = new Array;m[72] = new Array;m[73] = new Array;m[74] = new Array;m[75] = new Array;m[76] = new Array;m[77] = new Array;m[78] = new Array;m[79] = new Array;m[80] = new Array;m[81] = new Array;m[82] = new Array;m[83] = new Array;m[84] = new Array;m[85] = new Array;m[86] = new Array;m[87] = new Array;m[88] = new Array;m[88][59]=new Array(2524,1,3,'Tharios', '3', 15);m[88][60]=new Array(2523,4,1,'Taphoios', '4', 11);m[88][66]=new Array(2512,1,5,'Ledeios', '2', 16);m[88][67]=new Array(2509,2,8,'Etooos', '1', 15);m[88][68]=new Array(2508,1,5,'Schuirios', '8', 10);m[88][70]=new Array(2501,2,8,'Realtyios', '9', 15);m[88][71]=new Array(2500,1,7,'Moruos', '6', 12);m[89] = new Array;m[89][59]=new Array(2526,3,4,'Doegoios', '5', 11);m[89][60]=new Array(2525,2,6,'Peurdoios', '4', 15);m[89][61]=new Array(2527,4,5,'Ziaghuios', '3', 10);m[89][63]=new Array(3234,2,8,'Sauloios', '9', 10);m[89][64]=new Array(3233,3,4,'Zhilios', '2', 10);m[89][70]=new Array(2503,4,1,'Pereuos', '1', 12);m[89][71]=new Array(2502,3,8,'Lyeyos', '9', 13);m[90] = new Array;m[90][58]=new Array(2531,3,4,'Queeitia', '7', 12);m[90][59]=new Array(2530,4,1,'Pasios', '9', 0);m[90][60]=new Array(2529,1,7,'Ranuios', '2', 10);m[90][61]=new Array(2528,3,5,'Tronios', '10', 10);m[90][63]=new Array(3236,1,5,'Riliios', '7', 10);m[90][64]=new Array(3235,4,6,'Lemaios', '8', 11);m[90][65]=new Array(3237,1,7,'Nasoios', '6', 10);m[90][67]=new Array(3231,2,2,'Buroos', '8', 15);m[90][68]=new Array(3232,1,6,'Zhenios', '8', 10);m[90][70]=new Array(2505,2,6,'Hateetia', '8', 13);m[90][71]=new Array(2504,1,3,'Breyrios', '3', 14);m[91] = new Array;m[91][58]=new Array(2532,1,6,'Maidios', '8', 10);m[91][59]=new Array(2533,2,6,'Worayos', '4', 16);m[91][64]=new Array(3239,3,7,'Nikios', '8', 2);m[91][65]=new Array(3238,2,7,'Unditia', '5', 10);m[91][67]=new Array(3230,4,5,'Reileos', '4', 11);m[91][68]=new Array(3229,3,6,'Serouos', '2', 10);m[92] = new Array;m[92][61]=new Array(3249,1,5,'Nysatia', '1', 10);m[92][62]=new Array(3248,4,1,'Teamios', '10', 1);m[92][64]=new Array(3247,1,8,'Rhonios', '4', 1);m[92][65]=new Array(3246,4,8,'Slezios', '5', 1);m[92][67]=new Array(3226,2,2,'Bicios', '6', 11);m[92][68]=new Array(3225,1,7,'Llukios', '5', 10);m[92][69]=new Array(3222,2,5,'Traevaos', '1', 10);m[92][70]=new Array(3221,1,3,'Skeleos', '8', 10);m[92][72]=new Array(3218,1,7,'Piecaios', '9', 10);m[93] = new Array;m[93][58]=new Array(3256,4,7,'Leirios', '7', 0);m[93][59]=new Array(3253,1,6,'Yerutia', '3', 1);m[93][60]=new Array(3252,4,7,'Taneuos', '3', 0);m[93][61]=new Array(3251,3,6,'Emyos', '2', 0);m[93][62]=new Array(3250,2,2,'Sereeos', '10', 1);m[93][67]=new Array(3227,3,7,'Ceuzios', '4', 1);m[93][68]=new Array(3228,4,8,'Deanios', '7', 1);m[93][69]=new Array(3223,3,8,'Seudios', '4', 10);m[93][70]=new Array(3224,4,8,'Banaeos', '7', 2);m[93][72]=new Array(3219,2,6,'Beeryios', '4', 11);m[94] = new Array;m[94][58]=new Array(3258,2,8,'Skelios', '1', 2);m[94][59]=new Array(3255,3,8,'Hunuios', '7', 0);m[94][60]=new Array(3254,2,7,'Omeutia', '10', 1);m[94][64]=new Array(3911,3,4,'Lumios', '3', 0);m[94][65]=new Array(3910,2,2,'Kimytia', '9', 0);m[95] = new Array;m[95][62]=new Array(3914,2,2,'Bozios', '7', 1);m[95][63]=new Array(3913,1,5,'Cladios', '3', 1);m[95][64]=new Array(3912,4,1,'Yeraios', '10', 0);m[95][65]=new Array(3909,1,8,'Issayos', '6', 10);m[95][66]=new Array(3906,2,8,'Yereos', '9', 0);m[95][67]=new Array(3905,1,7,'Gosoos', '7', 0);m[95][69]=new Array(3901,1,7,'Isuos', '3', 0);m[95][70]=new Array(3899,3,6,'Noekiios', '3', 0);m[95][71]=new Array(3897,1,3,'Eldaios', '2', 0);m[95][72]=new Array(3895,3,8,'Slykoos', '9', 0);m[96] = new Array;m[96][58]=new Array(3922,4,1,'Kotios', '10', 0);m[96][59]=new Array(3919,1,3,'Ruisiios', '5', 1);m[96][60]=new Array(3918,4,1,'Smeildaios', '3', 0);m[96][62]=new Array(3915,3,5,'Thacios', '4', 0);m[96][63]=new Array(3916,4,5,'Shaisios', '4', 0);m[96][64]=new Array(3917,2,8,'Clotios', '6', 1);m[96][66]=new Array(3908,4,1,'Woekeios', '2', 0);m[96][67]=new Array(3907,3,5,'Beleutia', '8', 0);m[96][69]=new Array(3902,2,5,'Isios', '3', 0);m[96][70]=new Array(3900,4,1,'Whoraos', '1', 1);m[96][71]=new Array(3898,2,2,'Ceroeos', '6', 0);m[96][72]=new Array(3896,4,1,'Nyios', '7', 0);m[97] = new Array;m[97][58]=new Array(3924,2,5,'Onutia', '9', 0);m[97][59]=new Array(3921,3,7,'Aditia', '1', 0);m[97][60]=new Array(3920,2,8,'Ardiatia', '4', 0);m[97][71]=new Array(3904,1,3,'Lifiios', '6', 0);m[97][72]=new Array(3903,3,7,'Coekios', '5', 0);m[98] = new Array;m[98][62]=new Array(4555,1,6,'Quoghyios', '5', 0);m[98][63]=new Array(4553,2,5,'Tyxios', '1', 0);m[98][64]=new Array(4551,1,3,'Sweifios', '5', 0);m[98][65]=new Array(4549,2,2,'Lyeeos', '10', 1);m[98][66]=new Array(4547,1,8,'Taieuos', '1', 0);m[98][68]=new Array(4540,2,6,'Foukios', '8', 0);m[98][69]=new Array(4539,3,7,'Schokios', '1', 0);m[99] = new Array;m[99][58]=new Array(4567,2,6,'Jeduios', '2', 0);m[99][59]=new Array(4569,4,8,'Slierios', '9', 0);m[99][60]=new Array(4571,2,2,'Iryos', '9', 0);m[99][62]=new Array(4556,4,8,'Theriatia', '8', 0);m[99][63]=new Array(4554,3,7,'Verytia', '6', 0);m[99][64]=new Array(4552,4,1,'Slaydoos', '4', 0);m[99][65]=new Array(4550,3,4,'Samoetia', '2', 1);m[99][66]=new Array(4548,4,1,'Iroeos', '6', 0);m[99][68]=new Array(4542,4,7,'Shymios', '5', 0);m[99][69]=new Array(4541,1,5,'Rhethoos', '8', 0);m[99][70]=new Array(4545,2,7,'Ghaotia', '10', 1);m[99][72]=new Array(4536,1,8,'Sletios', '2', 10);m[100] = new Array;m[100][58]=new Array(4568,3,6,'Maebios', '2', 0);m[100][59]=new Array(4570,1,3,'Cryhios', '9', 0);m[100][60]=new Array(4572,3,4,'Tanotia', '7', 1);m[100][65]=new Array(4558,2,6,'Saemaios', '7', 0);m[100][66]=new Array(4557,1,3,'Sigoios', '2', 0);m[100][68]=new Array(4544,2,2,'Eneaos', '2', 1);m[100][69]=new Array(4543,3,4,'Bikios', '4', 0);m[100][70]=new Array(4546,4,7,'Dodios', '3', 0);m[100][72]=new Array(4537,4,8,'Garetia', '9', 2);m[101] = new Array;m[102] = new Array;m[103] = new Array;m[104] = new Array;m[105] = new Array;m[106] = new Array;m[107] = new Array;m[108] = new Array;m[109] = new Array;m[110] = new Array;m[111] = new Array;m[112] = new Array;m[113] = new Array;m[114] = new Array;m[115] = new Array;m[116] = new Array;m[117] = new Array;m[118] = new Array;m[119] = new Array;m[120] = new Array;m[121] = new Array;m[122] = new Array;m[123] = new Array;m[124] = new Array;m[125] = new Array;m[126] = new Array;m[127] = new Array;m[128] = new Array;m[129] = new Array;m[130] = new Array;m[131] = new Array;m[132] = new Array;m[133] = new Array;m[134] = new Array;m[135] = new Array;m[136] = new Array;m[137] = new Array;m[138] = new Array;m[139] = new Array;m[140] = new Array;m[141] = new Array;m[142] = new Array;m[143] = new Array;m[144] = new Array;m[145] = new Array;m[146] = new Array;m[147] = new Array;m[148] = new Array;m[149] = new Array;m[150] = new Array;m[151] = new Array;m[152] = new Array;m[153] = new Array;m[154] = new Array;m[155] = new Array;m[156] = new Array;m[157] = new Array;m[158] = new Array;m[159] = new Array;m[160] = new Array;m[161] = new Array;m[162] = new Array;m[163] = new Array;m[164] = new Array;m[165] = new Array;m[166] = new Array;m[167] = new Array;m[168] = new Array;m[169] = new Array;m[170] = new Array;m[171] = new Array;m[172] = new Array;m[173] = new Array;m[174] = new Array;m[175] = new Array;m[176] = new Array;m[177] = new Array;m[178] = new Array;m[179] = new Array;m[180] = new Array;m[181] = new Array;m[182] = new Array;m[183] = new Array;m[184] = new Array;m[185] = new Array;m[186] = new Array;m[187] = new Array;m[188] = new Array;m[189] = new Array;m[190] = new Array;m[191] = new Array;m[192] = new Array;m[193] = new Array;m[194] = new Array;m[195] = new Array;m[196] = new Array;m[197] = new Array;m[198] = new Array;m[199] = new Array;m[200] = new Array;m[201] = new Array;m[202] = new Array;m[203] = new Array;m[204] = new Array;m[205] = new Array;m[206] = new Array;m[207] = new Array;m[208] = new Array;m[209] = new Array;MAXSIZE = 8;
halfMaxSize = Math.floor(MAXSIZE/2);

start_x=95;
start_y=65;

center_x=95;
center_y=65;

center_x_begin=95;
center_y_begin=65;

wonder_status=1;
tradegood_status=1;
city_status=1;

IE = (navigator.appName!='Microsoft Internet Explorer')?0:1;

tradegoodText = new Array();
tradegoodText[1] = 'Wine';
tradegoodText[2] = 'Marble';
tradegoodText[3] = 'Crystal Glass';
tradegoodText[4] = 'Sulphur';

wonderText = new Array();
wonderText[1] = 'Hephaistos&#xB4; Forge';
wonderText[2] = 'Temple of Gaia';
wonderText[3] = 'Garden of Dionysus';
wonderText[4] = 'Temple of Athene';
wonderText[5] = 'Temple of Hermes';
wonderText[6] = 'Ares&#xB4; Stronghold';
wonderText[7] = 'Temple of Poseidon';
wonderText[8] = 'Colossus';

markCoordX = -1;
markCoordY = -1;

ownIslandJS = new Array();
ownIslandJS[0] = new Array();
ownIslandJS[0][0] = 95;
ownIslandJS[0][1] = 65;

var scrollMapId = null;
var mapScrollProgress = 0;

function startMapScroll(x, y) {
	stopMapScroll();



	mapScrollProgress = 0;
	scrollMapId = window.setInterval('mapScroll(' + x + ', ' + y + ')', 70);	
}

function stopMapScroll() {
	if(scrollMapId) {
		window.clearInterval(scrollMapId);
		scrollMapId = null;
	}
}

function mapScroll(x, y)
{
	mapScrollProgress += 0.2;
	if(mapScrollProgress >= 1) {
		mapScrollProgress = 1;
		
		stopMapScroll();
	}
	
	var p = Math.sin(mapScrollProgress*1.57079632);
	//var ap = p-1;
	
	var x_mod = 0;
	var y_mod = 0;
	
	//northwest
	if(x == -1 && y == 0) {
		x_mod = 120;
		y_mod = 60;		
	}
	//north
	else if(x == -1 && y == -1) {
		x_mod = 0;
		y_mod = 120;
	}
	//northeast
	else if(x == 0 && y == -1) {
		x_mod = -120;
		y_mod =60;
	}
	//west
	else if(x == -1 && y == 1) {
		x_mod = 240;
		y_mod = 0;
	}
	//east
	else if(x == 1 && y == -1) {
		x_mod = -240;
		y_mod = 0;
	}
	//southwest
	else if(x == 0 && y == 1) {
		x_mod = 120;
		y_mod = -60;
	}
	//south
	else if(x == 1 && y == 1) {
		x_mod = 0;
		y_mod = -120;
	}
	
	//southeast	
	else if(x == 1 && y == 0) {
		x_mod = -120;
		y_mod = -60;
	}
	
	x_mod *= p;
	y_mod *= p; 
	document.getElementById('worldmap').style.left = x_mod+'px';
	document.getElementById('worldmap').style.top = y_mod+'px';
	if(mapScrollProgress == 1) {
		if (center_x+3 < start_x ||
		    center_x-3 > start_x ||
		    center_y+3 < start_y ||
		    center_y-3 > start_y){
		    	
		    	//Get new Mapdata by ajax request and repaint the map
		    	xajax_getMapData(center_x,center_y);
		  		start_x=center_x;
		    	start_y=center_y;
		} else {
			//repaint the map
		    center_map();
		}
	}
}





function getOceanClass(x, y) {
    var klasse = 'ocean1';
    
    if( (Math.abs((x+y*3)%4))==0) klasse = 'ocean2';
    
    if( (Math.abs((x+y*4)%5))==0) klasse = 'ocean3';
    
    if( (Math.abs((x+y*5)%12))==0) klasse = 'ocean_feature1';
    
    if( (Math.abs((x+y*6)%13))==0) klasse = 'ocean_feature2';
    
    if( (Math.abs((x+y*7)%12))==0) klasse = 'ocean_feature3';
    
    if( (Math.abs((x+y*8)%13))==0) klasse = 'ocean_feature4';
    
    //alert(klasse);
    return klasse;
}

function jumpToCoord() {
    center_x= parseInt(document.navInputForm.xcoord.value);
    center_y= parseInt(document.navInputForm.ycoord.value);
    move(0,0);
}

function jumpToCoordWithParams(x, y) {
    center_x=x;
    center_y=y;
    move(0,0);
}

function mark(x,y) {
    
    tile = document.getElementById('tile_'+x+'_'+y);
    var shortName = tile.className.substring(0, 5);
    if(shortName != 'ocean') {
       
        //alert(tile.islandName + ' , ' + center_x+ '|' + center_y + ' , ' + x + '|' + y);
        //alert(m[tile.coordX][tile.coordY][3]);
        // document.getElementById('islandActions').className = 'nohidden';
        document.getElementById('islandInfos').className = 'nohidden';
        document.getElementById('islandName').innerHTML = ''+tile.islandName;
        document.getElementById('tradegoodLabel').innerHTML = '<a href="/index.php?view=informations&articleId=10013&mainId=10013">'+tradegoodText[tile.tradegoodId]+ '</a>';
        document.getElementById('wonderLabel').innerHTML = '<a href="/index.php?view=wonderDetail&wonderId='+tile.wonderId+'">'+wonderText[tile.wonderId]+'</a';
        document.getElementById('islandBread').innerHTML = '<a href="javaScript:void(null);" onclick="jumpToCoordWithParams('+ tile.coordX +','+ tile.coordY +');"  class="island" title="Centre map to this island">' + tile.islandName + ' [' + tile.coordX +':' + tile.coordY + ']</a>';
        document.getElementById('worldBread').innerHTML = 'World &gt;';
//        document.getElementById('zoom').href = "?view=island&id="+tile.islandId;
        if(markCoordX == tile.coordX && markCoordY == tile.coordY) {
            document.location.href="?view=island&id="+tile.islandId;
        }
        markCoordX = tile.coordX;
        markCoordY = tile.coordY;
        center_map();
    }
}

function center_map(){
	
	document.getElementById('worldmap').style.left = '0px';
	document.getElementById('worldmap').style.top = '0px';
	
	map = document.getElementById('worldmap');
	areamap = document.getElementById('clickMap');
	area= areamap.firstChild;
	if(area.nodeType == 3) area = area.nextSibling;
	tile = map.firstChild;
	if(tile.nodeType == 3) tile = tile.nextSibling;
	//alert(tile.id);
	document.navInputForm.inputXCoord.value= center_x;
	document.navInputForm.inputYCoord.value= center_y;
	
    for	(i=0;i<=MAXSIZE;i++){
		for (j=0;j<=MAXSIZE;j++){
			wonder = tile.firstChild;
			tradegood = wonder.nextSibling;
			cities = tradegood.nextSibling;
			marking = cities.nextSibling;
			own = marking.nextSibling;
			//coords = marking.id.split('_');
			//lupe = document.getElementById('magnify_'+(coords[1])+'_'+(coords[2]));
			lupe = own.nextSibling;			
			if( (center_x+halfMaxSize-i) >=0 && (center_y+halfMaxSize-j) > 0 && typeof(m[center_x+halfMaxSize-i][center_y+halfMaxSize-j])=='object') {
				tile.title = 'suppe' + m[center_x+halfMaxSize-i][center_y+halfMaxSize-j][3];
				tile.alt = 'suppe' + m[center_x+halfMaxSize-i][center_y+halfMaxSize-j][3];
			    tile.className='island'+m[center_x+halfMaxSize-i][center_y+halfMaxSize-j][4];	
				tile.islandName = m[center_x+halfMaxSize-i][center_y+halfMaxSize-j][3];	
				tile.islandId = m[center_x+halfMaxSize-i][center_y+halfMaxSize-j][0];
				tile.tradegoodId = m[center_x+halfMaxSize-i][center_y+halfMaxSize-j][1];
				tile.wonderId = m[center_x+halfMaxSize-i][center_y+halfMaxSize-j][2];	
				tile.coordX=(center_x+halfMaxSize-i);
				tile.coordY=(center_y+halfMaxSize-j);
				wonder.className='wonder wonder'+m[center_x+halfMaxSize-i][center_y+halfMaxSize-j][2];
				tradegood.className='tradegood tradegood'+m[center_x+halfMaxSize-i][center_y+halfMaxSize-j][1];
				cities.innerHTML=m[center_x+halfMaxSize-i][center_y+halfMaxSize-j][5];
				cities.className='cities';

				if((center_x+halfMaxSize-i) == markCoordX && (center_y+halfMaxSize-j) == markCoordY) {
				   
				     marking.className = 'islandMarked';
				     area.className = 'cursor';
	    			 area.href= '#';				     
				     if (IE==1){
						 lupe.className = 'magnify'; 
				     }
				     
				} else {
				    marking.className = 'islandNotMarked';
			        area.className = '';
			        area.href= 'javaScript:void(null);';
			        if (IE==1 && typeof(lupe)=='object'){
						lupe.className = ''; 			        				    
			        }
			        
				}
				
				for(a=0;a<1;a++){
			        if(ownIslandJS[a][0]==(center_x+halfMaxSize-i) && ownIslandJS[a][1]==(center_y+halfMaxSize-j)){    // wenn eigene insel
    			        own.className = 'ownIslandMarked';  
    			        break;
    			    }
    			    else {
    			        own.className = '';
    			    }
			    }
				
				area.title = m[center_x+halfMaxSize-i][center_y+halfMaxSize-j][3];
				
			} else {
			    area.alt = 'Ocean';
			    area.title = 'Ocean';
			    area.className = '';			    
				tile.className = ''+getOceanClass(center_x+halfMaxSize-i, center_y+halfMaxSize-j);
				wonder.className='hide_background';
				tradegood.className='hide_background';	
				cities.innerHTML='';
				cities.className='hide_background';	
				marking.className = 'hide_background';
				own.className = '';	
		        if (IE==1){
					lupe.className = ''; 			        				    
		        }					
			}
			tile = tile.nextSibling;
			if(tile.nodeType == 3) tile = tile.nextSibling;
			area = area.nextSibling;
			//alert(tile.id);
		}
	}	
}

function move(x,y){
	
	if(mapScrollProgress > 0) {
		if (center_x+3 < start_x ||
		    center_x-3 > start_x ||
		    center_y+3 < start_y ||
		    center_y-3 > start_y){
		    	
		    	//Get new Mapdata by ajax request and repaint the map
		    	xajax_getMapData(center_x,center_y);
		  		start_x=center_x;
		    	start_y=center_y;
		} else {
			//repaint the map
		    center_map();
		}
	}
	
	
	
	center_x += x;
	center_y += y;
	
	
	
	
	/**
	* insert soft Scrolling here 
	* But only if |x| <= 1 && |y| <= 1
	*
	*/
	startMapScroll(x, y);
	
	return;
	if (center_x+3 < start_x ||
	    center_x-3 > start_x ||
	    center_y+3 < start_y ||
	    center_y-3 > start_y){
	    	
	    	//Get new Mapdata by ajax request and repaint the map
	    	xajax_getMapData(center_x,center_y);
	  		start_x=center_x;
	    	start_y=center_y;
	} else {
		//repaint the map
	    center_map();
	}
}


/**
* Called from Ajax. Inserts a new Map Tile to the data array.
*/
function addToMap(x,y,a,b,c,d,e,f){
	m[x][y]=new Array (a,b,c,d,e,f);
}

function switch_wonder(){
	wonder_status= (wonder_status+1)%2;
	for	(j=0;j<=MAXSIZE;j++){
		for (i=0;i<=MAXSIZE;i++){
			wonder = document.getElementById('wonder_'+i+'_'+j);
			wonder.style.visibility = (wonder_status) ? 'visible':'hidden';
		}
	}	
}

function switch_tradegood(){
	tradegood_status= (tradegood_status+1)%2;
	if(tradegood_status==0) document.getElementById('buttonTradegood').className='deactivated';
	else document.getElementById('buttonTradegood').className='';
	for	(j=0;j<=MAXSIZE;j++){
		for (i=0;i<=MAXSIZE;i++){
			tradegood= document.getElementById('tradegood_'+i+'_'+j);
			tradegood.style.visibility = (tradegood_status) ? 'visible':'hidden';
		}
	}	
}

function switch_cities(){
	city_status= (city_status+1)%2;
	if(city_status==0) document.getElementById('buttonCities').className='deactivated';
	else document.getElementById('buttonCities').className='';
	for	(j=0;j<=MAXSIZE;j++){
		for (i=0;i<=MAXSIZE;i++){
			cities= document.getElementById('cities_'+i+'_'+j);
			cities.style.visibility = (city_status) ? 'visible':'hidden';
		}
	}	
}

window.onload=function() {
    center_map();
    mark(halfMaxSize,halfMaxSize);
}

</script>
<!--<script type="text/javascript" src="js/worldmap/worldmap.js"></script>-->
<div id="breadcrumbs">
    <h3>You are here:</h3>
    <span id="worldBread" class="world">World</span>
    <span id="islandBread" class="island"></span>
</div>

<!-- all items going to the left side get class dynamic -->
	<div id="navigation" class="dynamic">
		<h3 class="header">Navigation</h3>
		<div class="content">
		
			<form name="navInputForm" action="javaScript:void(null);" onsubmit="jumpToCoord();">
			<div id="mapCoordInput">
				<label for="inputXCoord" class="x">X:</label>
				<input class="x" id="inputXCoord" type="text" name="xcoord"  maxlength=4 value="95" />
				<label for="inputYCoord" class="y">Y:</label>
				<input class="y" id="inputYCoord" type="text" name="ycoord"  maxlength=4 value="65" />
				<input class="submitButton" type="image" src="skin/img/blank.gif" name="submit" />
			</div>
			</form>
			
			<div id="mapControls">
				<ul class="visibility">
					<li><a href="#" onClick='switch_tradegood();' id="buttonTradegood"></a></li>
					<li><a href="#" onClick='switch_cities();' id="buttonCities"></a></li>
				</ul>
				<ul class="scrolling">
					<li class="nw"><a href="#" onClick="move(-1,0); return false;"></a></li>
					<li class="n"><a href="#" onClick="move(-1,-1); return false;"></a></li>
					<li class="ne"><a href="#" onClick="move(0,-1); return false;"></a></li>
					<li class="w"><a href="#" onClick="move(-1,1); return false;"></a></li>
					<li class="e"><a href="#" onClick="move(1,-1); return false;"></a> </li>
					<li class="sw"><a href="#" onClick="move(0,1); return false;"></a></li>
					<li class="s"><a href="#" onClick="move(1,1); return false;"></a></li>
					<li class="se"><a href="#" onClick="move(1,0); return false;"></a></li>
				</ul>
			</div>
			
		</div>
		<div class="footer"></div>
	</div>


	<div id="information" class="dynamic">
		<h3 id="islandName" class="header">Info</h3>
		<div class="content">
			<table id="islandInfos">
				<tr><th>Trade good:</th><td id="tradegoodLabel" class=label></td></tr>
				<tr><th>Wonder:</th><td id="wonderLabel"  class="label"></td></tr>
			</table>
		</div>
		<div class="footer"></div>
	</div>
    

<!-- the main view. take care that it stretches. -->
<div id="mainview">
<div id='scrollcover'>
<div id='worldmap'>
    <div align='center' alt=''  valign='middle' id='tile_0_0' style='z-index:10000;position:absolute; width:240px; height:120px; left:250px; bottom:-310px;'><div id='wonder_0_0' ></div><div id='tradegood_0_0' ></div><div id='cities_0_0'></div><div id='marking_0_0'></div><div id='own_0_0'></div><div id='magnify_0_0'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_0_1' style='z-index:9999;position:absolute; width:240px; height:120px; left:370px; bottom:-250px;'><div id='wonder_0_1' ></div><div id='tradegood_0_1' ></div><div id='cities_0_1'></div><div id='marking_0_1'></div><div id='own_0_1'></div><div id='magnify_0_1'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_0_2' style='z-index:9998;position:absolute; width:240px; height:120px; left:490px; bottom:-190px;'><div id='wonder_0_2' ></div><div id='tradegood_0_2' ></div><div id='cities_0_2'></div><div id='marking_0_2'></div><div id='own_0_2'></div><div id='magnify_0_2'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_0_3' style='z-index:9997;position:absolute; width:240px; height:120px; left:610px; bottom:-130px;'><div id='wonder_0_3' ></div><div id='tradegood_0_3' ></div><div id='cities_0_3'></div><div id='marking_0_3'></div><div id='own_0_3'></div><div id='magnify_0_3'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_0_4' style='z-index:9996;position:absolute; width:240px; height:120px; left:730px; bottom:-70px;'><div id='wonder_0_4' ></div><div id='tradegood_0_4' ></div><div id='cities_0_4'></div><div id='marking_0_4'></div><div id='own_0_4'></div><div id='magnify_0_4'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_0_5' style='z-index:9995;position:absolute; width:240px; height:120px; left:850px; bottom:-10px;'><div id='wonder_0_5' ></div><div id='tradegood_0_5' ></div><div id='cities_0_5'></div><div id='marking_0_5'></div><div id='own_0_5'></div><div id='magnify_0_5'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_0_6' style='z-index:9994;position:absolute; width:240px; height:120px; left:970px; bottom:50px;'><div id='wonder_0_6' ></div><div id='tradegood_0_6' ></div><div id='cities_0_6'></div><div id='marking_0_6'></div><div id='own_0_6'></div><div id='magnify_0_6'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_0_7' style='z-index:9993;position:absolute; width:240px; height:120px; left:1090px; bottom:110px;'><div id='wonder_0_7' ></div><div id='tradegood_0_7' ></div><div id='cities_0_7'></div><div id='marking_0_7'></div><div id='own_0_7'></div><div id='magnify_0_7'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_0_8' style='z-index:9992;position:absolute; width:240px; height:120px; left:1210px; bottom:170px;'><div id='wonder_0_8' ></div><div id='tradegood_0_8' ></div><div id='cities_0_8'></div><div id='marking_0_8'></div><div id='own_0_8'></div><div id='magnify_0_8'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_1_0' style='z-index:9991;position:absolute; width:240px; height:120px; left:130px; bottom:-250px;'><div id='wonder_1_0' ></div><div id='tradegood_1_0' ></div><div id='cities_1_0'></div><div id='marking_1_0'></div><div id='own_1_0'></div><div id='magnify_1_0'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_1_1' style='z-index:9990;position:absolute; width:240px; height:120px; left:250px; bottom:-190px;'><div id='wonder_1_1' ></div><div id='tradegood_1_1' ></div><div id='cities_1_1'></div><div id='marking_1_1'></div><div id='own_1_1'></div><div id='magnify_1_1'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_1_2' style='z-index:9989;position:absolute; width:240px; height:120px; left:370px; bottom:-130px;'><div id='wonder_1_2' ></div><div id='tradegood_1_2' ></div><div id='cities_1_2'></div><div id='marking_1_2'></div><div id='own_1_2'></div><div id='magnify_1_2'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_1_3' style='z-index:9988;position:absolute; width:240px; height:120px; left:490px; bottom:-70px;'><div id='wonder_1_3' ></div><div id='tradegood_1_3' ></div><div id='cities_1_3'></div><div id='marking_1_3'></div><div id='own_1_3'></div><div id='magnify_1_3'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_1_4' style='z-index:9987;position:absolute; width:240px; height:120px; left:610px; bottom:-10px;'><div id='wonder_1_4' ></div><div id='tradegood_1_4' ></div><div id='cities_1_4'></div><div id='marking_1_4'></div><div id='own_1_4'></div><div id='magnify_1_4'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_1_5' style='z-index:9986;position:absolute; width:240px; height:120px; left:730px; bottom:50px;'><div id='wonder_1_5' ></div><div id='tradegood_1_5' ></div><div id='cities_1_5'></div><div id='marking_1_5'></div><div id='own_1_5'></div><div id='magnify_1_5'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_1_6' style='z-index:9985;position:absolute; width:240px; height:120px; left:850px; bottom:110px;'><div id='wonder_1_6' ></div><div id='tradegood_1_6' ></div><div id='cities_1_6'></div><div id='marking_1_6'></div><div id='own_1_6'></div><div id='magnify_1_6'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_1_7' style='z-index:9984;position:absolute; width:240px; height:120px; left:970px; bottom:170px;'><div id='wonder_1_7' ></div><div id='tradegood_1_7' ></div><div id='cities_1_7'></div><div id='marking_1_7'></div><div id='own_1_7'></div><div id='magnify_1_7'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_1_8' style='z-index:9983;position:absolute; width:240px; height:120px; left:1090px; bottom:230px;'><div id='wonder_1_8' ></div><div id='tradegood_1_8' ></div><div id='cities_1_8'></div><div id='marking_1_8'></div><div id='own_1_8'></div><div id='magnify_1_8'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_2_0' style='z-index:9982;position:absolute; width:240px; height:120px; left:10px; bottom:-190px;'><div id='wonder_2_0' ></div><div id='tradegood_2_0' ></div><div id='cities_2_0'></div><div id='marking_2_0'></div><div id='own_2_0'></div><div id='magnify_2_0'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_2_1' style='z-index:9981;position:absolute; width:240px; height:120px; left:130px; bottom:-130px;'><div id='wonder_2_1' ></div><div id='tradegood_2_1' ></div><div id='cities_2_1'></div><div id='marking_2_1'></div><div id='own_2_1'></div><div id='magnify_2_1'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_2_2' style='z-index:9980;position:absolute; width:240px; height:120px; left:250px; bottom:-70px;'><div id='wonder_2_2' ></div><div id='tradegood_2_2' ></div><div id='cities_2_2'></div><div id='marking_2_2'></div><div id='own_2_2'></div><div id='magnify_2_2'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_2_3' style='z-index:9979;position:absolute; width:240px; height:120px; left:370px; bottom:-10px;'><div id='wonder_2_3' ></div><div id='tradegood_2_3' ></div><div id='cities_2_3'></div><div id='marking_2_3'></div><div id='own_2_3'></div><div id='magnify_2_3'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_2_4' style='z-index:9978;position:absolute; width:240px; height:120px; left:490px; bottom:50px;'><div id='wonder_2_4' ></div><div id='tradegood_2_4' ></div><div id='cities_2_4'></div><div id='marking_2_4'></div><div id='own_2_4'></div><div id='magnify_2_4'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_2_5' style='z-index:9977;position:absolute; width:240px; height:120px; left:610px; bottom:110px;'><div id='wonder_2_5' ></div><div id='tradegood_2_5' ></div><div id='cities_2_5'></div><div id='marking_2_5'></div><div id='own_2_5'></div><div id='magnify_2_5'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_2_6' style='z-index:9976;position:absolute; width:240px; height:120px; left:730px; bottom:170px;'><div id='wonder_2_6' ></div><div id='tradegood_2_6' ></div><div id='cities_2_6'></div><div id='marking_2_6'></div><div id='own_2_6'></div><div id='magnify_2_6'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_2_7' style='z-index:9975;position:absolute; width:240px; height:120px; left:850px; bottom:230px;'><div id='wonder_2_7' ></div><div id='tradegood_2_7' ></div><div id='cities_2_7'></div><div id='marking_2_7'></div><div id='own_2_7'></div><div id='magnify_2_7'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_2_8' style='z-index:9974;position:absolute; width:240px; height:120px; left:970px; bottom:290px;'><div id='wonder_2_8' ></div><div id='tradegood_2_8' ></div><div id='cities_2_8'></div><div id='marking_2_8'></div><div id='own_2_8'></div><div id='magnify_2_8'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_3_0' style='z-index:9973;position:absolute; width:240px; height:120px; left:-110px; bottom:-130px;'><div id='wonder_3_0' ></div><div id='tradegood_3_0' ></div><div id='cities_3_0'></div><div id='marking_3_0'></div><div id='own_3_0'></div><div id='magnify_3_0'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_3_1' style='z-index:9972;position:absolute; width:240px; height:120px; left:10px; bottom:-70px;'><div id='wonder_3_1' ></div><div id='tradegood_3_1' ></div><div id='cities_3_1'></div><div id='marking_3_1'></div><div id='own_3_1'></div><div id='magnify_3_1'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_3_2' style='z-index:9971;position:absolute; width:240px; height:120px; left:130px; bottom:-10px;'><div id='wonder_3_2' ></div><div id='tradegood_3_2' ></div><div id='cities_3_2'></div><div id='marking_3_2'></div><div id='own_3_2'></div><div id='magnify_3_2'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_3_3' style='z-index:9970;position:absolute; width:240px; height:120px; left:250px; bottom:50px;'><div id='wonder_3_3' ></div><div id='tradegood_3_3' ></div><div id='cities_3_3'></div><div id='marking_3_3'></div><div id='own_3_3'></div><div id='magnify_3_3'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_3_4' style='z-index:9969;position:absolute; width:240px; height:120px; left:370px; bottom:110px;'><div id='wonder_3_4' ></div><div id='tradegood_3_4' ></div><div id='cities_3_4'></div><div id='marking_3_4'></div><div id='own_3_4'></div><div id='magnify_3_4'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_3_5' style='z-index:9968;position:absolute; width:240px; height:120px; left:490px; bottom:170px;'><div id='wonder_3_5' ></div><div id='tradegood_3_5' ></div><div id='cities_3_5'></div><div id='marking_3_5'></div><div id='own_3_5'></div><div id='magnify_3_5'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_3_6' style='z-index:9967;position:absolute; width:240px; height:120px; left:610px; bottom:230px;'><div id='wonder_3_6' ></div><div id='tradegood_3_6' ></div><div id='cities_3_6'></div><div id='marking_3_6'></div><div id='own_3_6'></div><div id='magnify_3_6'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_3_7' style='z-index:9966;position:absolute; width:240px; height:120px; left:730px; bottom:290px;'><div id='wonder_3_7' ></div><div id='tradegood_3_7' ></div><div id='cities_3_7'></div><div id='marking_3_7'></div><div id='own_3_7'></div><div id='magnify_3_7'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_3_8' style='z-index:9965;position:absolute; width:240px; height:120px; left:850px; bottom:350px;'><div id='wonder_3_8' ></div><div id='tradegood_3_8' ></div><div id='cities_3_8'></div><div id='marking_3_8'></div><div id='own_3_8'></div><div id='magnify_3_8'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_4_0' style='z-index:9964;position:absolute; width:240px; height:120px; left:-230px; bottom:-70px;'><div id='wonder_4_0' ></div><div id='tradegood_4_0' ></div><div id='cities_4_0'></div><div id='marking_4_0'></div><div id='own_4_0'></div><div id='magnify_4_0'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_4_1' style='z-index:9963;position:absolute; width:240px; height:120px; left:-110px; bottom:-10px;'><div id='wonder_4_1' ></div><div id='tradegood_4_1' ></div><div id='cities_4_1'></div><div id='marking_4_1'></div><div id='own_4_1'></div><div id='magnify_4_1'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_4_2' style='z-index:9962;position:absolute; width:240px; height:120px; left:10px; bottom:50px;'><div id='wonder_4_2' ></div><div id='tradegood_4_2' ></div><div id='cities_4_2'></div><div id='marking_4_2'></div><div id='own_4_2'></div><div id='magnify_4_2'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_4_3' style='z-index:9961;position:absolute; width:240px; height:120px; left:130px; bottom:110px;'><div id='wonder_4_3' ></div><div id='tradegood_4_3' ></div><div id='cities_4_3'></div><div id='marking_4_3'></div><div id='own_4_3'></div><div id='magnify_4_3'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_4_4' style='z-index:9960;position:absolute; width:240px; height:120px; left:250px; bottom:170px;'><div id='wonder_4_4' ></div><div id='tradegood_4_4' ></div><div id='cities_4_4'></div><div id='marking_4_4'></div><div id='own_4_4'></div><div id='magnify_4_4'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_4_5' style='z-index:9959;position:absolute; width:240px; height:120px; left:370px; bottom:230px;'><div id='wonder_4_5' ></div><div id='tradegood_4_5' ></div><div id='cities_4_5'></div><div id='marking_4_5'></div><div id='own_4_5'></div><div id='magnify_4_5'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_4_6' style='z-index:9958;position:absolute; width:240px; height:120px; left:490px; bottom:290px;'><div id='wonder_4_6' ></div><div id='tradegood_4_6' ></div><div id='cities_4_6'></div><div id='marking_4_6'></div><div id='own_4_6'></div><div id='magnify_4_6'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_4_7' style='z-index:9957;position:absolute; width:240px; height:120px; left:610px; bottom:350px;'><div id='wonder_4_7' ></div><div id='tradegood_4_7' ></div><div id='cities_4_7'></div><div id='marking_4_7'></div><div id='own_4_7'></div><div id='magnify_4_7'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_4_8' style='z-index:9956;position:absolute; width:240px; height:120px; left:730px; bottom:410px;'><div id='wonder_4_8' ></div><div id='tradegood_4_8' ></div><div id='cities_4_8'></div><div id='marking_4_8'></div><div id='own_4_8'></div><div id='magnify_4_8'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_5_0' style='z-index:9955;position:absolute; width:240px; height:120px; left:-350px; bottom:-10px;'><div id='wonder_5_0' ></div><div id='tradegood_5_0' ></div><div id='cities_5_0'></div><div id='marking_5_0'></div><div id='own_5_0'></div><div id='magnify_5_0'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_5_1' style='z-index:9954;position:absolute; width:240px; height:120px; left:-230px; bottom:50px;'><div id='wonder_5_1' ></div><div id='tradegood_5_1' ></div><div id='cities_5_1'></div><div id='marking_5_1'></div><div id='own_5_1'></div><div id='magnify_5_1'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_5_2' style='z-index:9953;position:absolute; width:240px; height:120px; left:-110px; bottom:110px;'><div id='wonder_5_2' ></div><div id='tradegood_5_2' ></div><div id='cities_5_2'></div><div id='marking_5_2'></div><div id='own_5_2'></div><div id='magnify_5_2'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_5_3' style='z-index:9952;position:absolute; width:240px; height:120px; left:10px; bottom:170px;'><div id='wonder_5_3' ></div><div id='tradegood_5_3' ></div><div id='cities_5_3'></div><div id='marking_5_3'></div><div id='own_5_3'></div><div id='magnify_5_3'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_5_4' style='z-index:9951;position:absolute; width:240px; height:120px; left:130px; bottom:230px;'><div id='wonder_5_4' ></div><div id='tradegood_5_4' ></div><div id='cities_5_4'></div><div id='marking_5_4'></div><div id='own_5_4'></div><div id='magnify_5_4'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_5_5' style='z-index:9950;position:absolute; width:240px; height:120px; left:250px; bottom:290px;'><div id='wonder_5_5' ></div><div id='tradegood_5_5' ></div><div id='cities_5_5'></div><div id='marking_5_5'></div><div id='own_5_5'></div><div id='magnify_5_5'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_5_6' style='z-index:9949;position:absolute; width:240px; height:120px; left:370px; bottom:350px;'><div id='wonder_5_6' ></div><div id='tradegood_5_6' ></div><div id='cities_5_6'></div><div id='marking_5_6'></div><div id='own_5_6'></div><div id='magnify_5_6'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_5_7' style='z-index:9948;position:absolute; width:240px; height:120px; left:490px; bottom:410px;'><div id='wonder_5_7' ></div><div id='tradegood_5_7' ></div><div id='cities_5_7'></div><div id='marking_5_7'></div><div id='own_5_7'></div><div id='magnify_5_7'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_5_8' style='z-index:9947;position:absolute; width:240px; height:120px; left:610px; bottom:470px;'><div id='wonder_5_8' ></div><div id='tradegood_5_8' ></div><div id='cities_5_8'></div><div id='marking_5_8'></div><div id='own_5_8'></div><div id='magnify_5_8'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_6_0' style='z-index:9946;position:absolute; width:240px; height:120px; left:-470px; bottom:50px;'><div id='wonder_6_0' ></div><div id='tradegood_6_0' ></div><div id='cities_6_0'></div><div id='marking_6_0'></div><div id='own_6_0'></div><div id='magnify_6_0'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_6_1' style='z-index:9945;position:absolute; width:240px; height:120px; left:-350px; bottom:110px;'><div id='wonder_6_1' ></div><div id='tradegood_6_1' ></div><div id='cities_6_1'></div><div id='marking_6_1'></div><div id='own_6_1'></div><div id='magnify_6_1'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_6_2' style='z-index:9944;position:absolute; width:240px; height:120px; left:-230px; bottom:170px;'><div id='wonder_6_2' ></div><div id='tradegood_6_2' ></div><div id='cities_6_2'></div><div id='marking_6_2'></div><div id='own_6_2'></div><div id='magnify_6_2'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_6_3' style='z-index:9943;position:absolute; width:240px; height:120px; left:-110px; bottom:230px;'><div id='wonder_6_3' ></div><div id='tradegood_6_3' ></div><div id='cities_6_3'></div><div id='marking_6_3'></div><div id='own_6_3'></div><div id='magnify_6_3'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_6_4' style='z-index:9942;position:absolute; width:240px; height:120px; left:10px; bottom:290px;'><div id='wonder_6_4' ></div><div id='tradegood_6_4' ></div><div id='cities_6_4'></div><div id='marking_6_4'></div><div id='own_6_4'></div><div id='magnify_6_4'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_6_5' style='z-index:9941;position:absolute; width:240px; height:120px; left:130px; bottom:350px;'><div id='wonder_6_5' ></div><div id='tradegood_6_5' ></div><div id='cities_6_5'></div><div id='marking_6_5'></div><div id='own_6_5'></div><div id='magnify_6_5'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_6_6' style='z-index:9940;position:absolute; width:240px; height:120px; left:250px; bottom:410px;'><div id='wonder_6_6' ></div><div id='tradegood_6_6' ></div><div id='cities_6_6'></div><div id='marking_6_6'></div><div id='own_6_6'></div><div id='magnify_6_6'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_6_7' style='z-index:9939;position:absolute; width:240px; height:120px; left:370px; bottom:470px;'><div id='wonder_6_7' ></div><div id='tradegood_6_7' ></div><div id='cities_6_7'></div><div id='marking_6_7'></div><div id='own_6_7'></div><div id='magnify_6_7'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_6_8' style='z-index:9938;position:absolute; width:240px; height:120px; left:490px; bottom:530px;'><div id='wonder_6_8' ></div><div id='tradegood_6_8' ></div><div id='cities_6_8'></div><div id='marking_6_8'></div><div id='own_6_8'></div><div id='magnify_6_8'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_7_0' style='z-index:9937;position:absolute; width:240px; height:120px; left:-590px; bottom:110px;'><div id='wonder_7_0' ></div><div id='tradegood_7_0' ></div><div id='cities_7_0'></div><div id='marking_7_0'></div><div id='own_7_0'></div><div id='magnify_7_0'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_7_1' style='z-index:9936;position:absolute; width:240px; height:120px; left:-470px; bottom:170px;'><div id='wonder_7_1' ></div><div id='tradegood_7_1' ></div><div id='cities_7_1'></div><div id='marking_7_1'></div><div id='own_7_1'></div><div id='magnify_7_1'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_7_2' style='z-index:9935;position:absolute; width:240px; height:120px; left:-350px; bottom:230px;'><div id='wonder_7_2' ></div><div id='tradegood_7_2' ></div><div id='cities_7_2'></div><div id='marking_7_2'></div><div id='own_7_2'></div><div id='magnify_7_2'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_7_3' style='z-index:9934;position:absolute; width:240px; height:120px; left:-230px; bottom:290px;'><div id='wonder_7_3' ></div><div id='tradegood_7_3' ></div><div id='cities_7_3'></div><div id='marking_7_3'></div><div id='own_7_3'></div><div id='magnify_7_3'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_7_4' style='z-index:9933;position:absolute; width:240px; height:120px; left:-110px; bottom:350px;'><div id='wonder_7_4' ></div><div id='tradegood_7_4' ></div><div id='cities_7_4'></div><div id='marking_7_4'></div><div id='own_7_4'></div><div id='magnify_7_4'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_7_5' style='z-index:9932;position:absolute; width:240px; height:120px; left:10px; bottom:410px;'><div id='wonder_7_5' ></div><div id='tradegood_7_5' ></div><div id='cities_7_5'></div><div id='marking_7_5'></div><div id='own_7_5'></div><div id='magnify_7_5'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_7_6' style='z-index:9931;position:absolute; width:240px; height:120px; left:130px; bottom:470px;'><div id='wonder_7_6' ></div><div id='tradegood_7_6' ></div><div id='cities_7_6'></div><div id='marking_7_6'></div><div id='own_7_6'></div><div id='magnify_7_6'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_7_7' style='z-index:9930;position:absolute; width:240px; height:120px; left:250px; bottom:530px;'><div id='wonder_7_7' ></div><div id='tradegood_7_7' ></div><div id='cities_7_7'></div><div id='marking_7_7'></div><div id='own_7_7'></div><div id='magnify_7_7'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_7_8' style='z-index:9929;position:absolute; width:240px; height:120px; left:370px; bottom:590px;'><div id='wonder_7_8' ></div><div id='tradegood_7_8' ></div><div id='cities_7_8'></div><div id='marking_7_8'></div><div id='own_7_8'></div><div id='magnify_7_8'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_8_0' style='z-index:9928;position:absolute; width:240px; height:120px; left:-710px; bottom:170px;'><div id='wonder_8_0' ></div><div id='tradegood_8_0' ></div><div id='cities_8_0'></div><div id='marking_8_0'></div><div id='own_8_0'></div><div id='magnify_8_0'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_8_1' style='z-index:9927;position:absolute; width:240px; height:120px; left:-590px; bottom:230px;'><div id='wonder_8_1' ></div><div id='tradegood_8_1' ></div><div id='cities_8_1'></div><div id='marking_8_1'></div><div id='own_8_1'></div><div id='magnify_8_1'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_8_2' style='z-index:9926;position:absolute; width:240px; height:120px; left:-470px; bottom:290px;'><div id='wonder_8_2' ></div><div id='tradegood_8_2' ></div><div id='cities_8_2'></div><div id='marking_8_2'></div><div id='own_8_2'></div><div id='magnify_8_2'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_8_3' style='z-index:9925;position:absolute; width:240px; height:120px; left:-350px; bottom:350px;'><div id='wonder_8_3' ></div><div id='tradegood_8_3' ></div><div id='cities_8_3'></div><div id='marking_8_3'></div><div id='own_8_3'></div><div id='magnify_8_3'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_8_4' style='z-index:9924;position:absolute; width:240px; height:120px; left:-230px; bottom:410px;'><div id='wonder_8_4' ></div><div id='tradegood_8_4' ></div><div id='cities_8_4'></div><div id='marking_8_4'></div><div id='own_8_4'></div><div id='magnify_8_4'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_8_5' style='z-index:9923;position:absolute; width:240px; height:120px; left:-110px; bottom:470px;'><div id='wonder_8_5' ></div><div id='tradegood_8_5' ></div><div id='cities_8_5'></div><div id='marking_8_5'></div><div id='own_8_5'></div><div id='magnify_8_5'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_8_6' style='z-index:9922;position:absolute; width:240px; height:120px; left:10px; bottom:530px;'><div id='wonder_8_6' ></div><div id='tradegood_8_6' ></div><div id='cities_8_6'></div><div id='marking_8_6'></div><div id='own_8_6'></div><div id='magnify_8_6'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_8_7' style='z-index:9921;position:absolute; width:240px; height:120px; left:130px; bottom:590px;'><div id='wonder_8_7' ></div><div id='tradegood_8_7' ></div><div id='cities_8_7'></div><div id='marking_8_7'></div><div id='own_8_7'></div><div id='magnify_8_7'></div></div>
        <div align='center' alt=''  valign='middle' id='tile_8_8' style='z-index:9920;position:absolute; width:240px; height:120px; left:250px; bottom:650px;'><div id='wonder_8_8' ></div><div id='tradegood_8_8' ></div><div id='cities_8_8'></div><div id='marking_8_8'></div><div id='own_8_8'></div><div id='magnify_8_8'></div></div>
    
<img src="skin/img/blank.gif" alt="" usemap="#clickMap" style="display:block; position:absolute; z-index:11000; width:720px; height:440px; top:-20px;" />
</div>
<!-- end worldmap data -->



<!-- start clickable area map -->
<map id="clickMap" name="clickMap">
<area shape='poly' id='area_0_0' coords='250,710,370,770,490,710,370,650' onclick='mark(0,0);' href='javaScript:void(null);' />
<area shape='poly' id='area_0_1' coords='370,650,490,710,610,650,490,590' onclick='mark(0,1);' href='javaScript:void(null);' />
<area shape='poly' id='area_0_2' coords='490,590,610,650,730,590,610,530' onclick='mark(0,2);' href='javaScript:void(null);' />
<area shape='poly' id='area_0_3' coords='610,530,730,590,850,530,730,470' onclick='mark(0,3);' href='javaScript:void(null);' />
<area shape='poly' id='area_0_4' coords='730,470,850,530,970,470,850,410' onclick='mark(0,4);' href='javaScript:void(null);' />
<area shape='poly' id='area_0_5' coords='850,410,970,470,1090,410,970,350' onclick='mark(0,5);' href='javaScript:void(null);' />
<area shape='poly' id='area_0_6' coords='970,350,1090,410,1210,350,1090,290' onclick='mark(0,6);' href='javaScript:void(null);' />
<area shape='poly' id='area_0_7' coords='1090,290,1210,350,1330,290,1210,230' onclick='mark(0,7);' href='javaScript:void(null);' />
<area shape='poly' id='area_0_8' coords='1210,230,1330,290,1450,230,1330,170' onclick='mark(0,8);' href='javaScript:void(null);' />
<area shape='poly' id='area_1_0' coords='130,650,250,710,370,650,250,590' onclick='mark(1,0);' href='javaScript:void(null);' />
<area shape='poly' id='area_1_1' coords='250,590,370,650,490,590,370,530' onclick='mark(1,1);' href='javaScript:void(null);' />
<area shape='poly' id='area_1_2' coords='370,530,490,590,610,530,490,470' onclick='mark(1,2);' href='javaScript:void(null);' />
<area shape='poly' id='area_1_3' coords='490,470,610,530,730,470,610,410' onclick='mark(1,3);' href='javaScript:void(null);' />
<area shape='poly' id='area_1_4' coords='610,410,730,470,850,410,730,350' onclick='mark(1,4);' href='javaScript:void(null);' />
<area shape='poly' id='area_1_5' coords='730,350,850,410,970,350,850,290' onclick='mark(1,5);' href='javaScript:void(null);' />
<area shape='poly' id='area_1_6' coords='850,290,970,350,1090,290,970,230' onclick='mark(1,6);' href='javaScript:void(null);' />
<area shape='poly' id='area_1_7' coords='970,230,1090,290,1210,230,1090,170' onclick='mark(1,7);' href='javaScript:void(null);' />
<area shape='poly' id='area_1_8' coords='1090,170,1210,230,1330,170,1210,110' onclick='mark(1,8);' href='javaScript:void(null);' />
<area shape='poly' id='area_2_0' coords='10,590,130,650,250,590,130,530' onclick='mark(2,0);' href='javaScript:void(null);' />
<area shape='poly' id='area_2_1' coords='130,530,250,590,370,530,250,470' onclick='mark(2,1);' href='javaScript:void(null);' />
<area shape='poly' id='area_2_2' coords='250,470,370,530,490,470,370,410' onclick='mark(2,2);' href='javaScript:void(null);' />
<area shape='poly' id='area_2_3' coords='370,410,490,470,610,410,490,350' onclick='mark(2,3);' href='javaScript:void(null);' />
<area shape='poly' id='area_2_4' coords='490,350,610,410,730,350,610,290' onclick='mark(2,4);' href='javaScript:void(null);' />
<area shape='poly' id='area_2_5' coords='610,290,730,350,850,290,730,230' onclick='mark(2,5);' href='javaScript:void(null);' />
<area shape='poly' id='area_2_6' coords='730,230,850,290,970,230,850,170' onclick='mark(2,6);' href='javaScript:void(null);' />
<area shape='poly' id='area_2_7' coords='850,170,970,230,1090,170,970,110' onclick='mark(2,7);' href='javaScript:void(null);' />
<area shape='poly' id='area_2_8' coords='970,110,1090,170,1210,110,1090,50' onclick='mark(2,8);' href='javaScript:void(null);' />
<area shape='poly' id='area_3_0' coords='-110,530,10,590,130,530,10,470' onclick='mark(3,0);' href='javaScript:void(null);' />
<area shape='poly' id='area_3_1' coords='10,470,130,530,250,470,130,410' onclick='mark(3,1);' href='javaScript:void(null);' />
<area shape='poly' id='area_3_2' coords='130,410,250,470,370,410,250,350' onclick='mark(3,2);' href='javaScript:void(null);' />
<area shape='poly' id='area_3_3' coords='250,350,370,410,490,350,370,290' onclick='mark(3,3);' href='javaScript:void(null);' />
<area shape='poly' id='area_3_4' coords='370,290,490,350,610,290,490,230' onclick='mark(3,4);' href='javaScript:void(null);' />
<area shape='poly' id='area_3_5' coords='490,230,610,290,730,230,610,170' onclick='mark(3,5);' href='javaScript:void(null);' />
<area shape='poly' id='area_3_6' coords='610,170,730,230,850,170,730,110' onclick='mark(3,6);' href='javaScript:void(null);' />
<area shape='poly' id='area_3_7' coords='730,110,850,170,970,110,850,50' onclick='mark(3,7);' href='javaScript:void(null);' />
<area shape='poly' id='area_3_8' coords='850,50,970,110,1090,50,970,-10' onclick='mark(3,8);' href='javaScript:void(null);' />
<area shape='poly' id='area_4_0' coords='-230,470,-110,530,10,470,-110,410' onclick='mark(4,0);' href='javaScript:void(null);' />
<area shape='poly' id='area_4_1' coords='-110,410,10,470,130,410,10,350' onclick='mark(4,1);' href='javaScript:void(null);' />
<area shape='poly' id='area_4_2' coords='10,350,130,410,250,350,130,290' onclick='mark(4,2);' href='javaScript:void(null);' />
<area shape='poly' id='area_4_3' coords='130,290,250,350,370,290,250,230' onclick='mark(4,3);' href='javaScript:void(null);' />
<area shape='poly' id='area_4_4' coords='250,230,370,290,490,230,370,170' onclick='mark(4,4);' href='javaScript:void(null);' />
<area shape='poly' id='area_4_5' coords='370,170,490,230,610,170,490,110' onclick='mark(4,5);' href='javaScript:void(null);' />
<area shape='poly' id='area_4_6' coords='490,110,610,170,730,110,610,50' onclick='mark(4,6);' href='javaScript:void(null);' />
<area shape='poly' id='area_4_7' coords='610,50,730,110,850,50,730,-10' onclick='mark(4,7);' href='javaScript:void(null);' />
<area shape='poly' id='area_4_8' coords='730,-10,850,50,970,-10,850,-70' onclick='mark(4,8);' href='javaScript:void(null);' />
<area shape='poly' id='area_5_0' coords='-350,410,-230,470,-110,410,-230,350' onclick='mark(5,0);' href='javaScript:void(null);' />
<area shape='poly' id='area_5_1' coords='-230,350,-110,410,10,350,-110,290' onclick='mark(5,1);' href='javaScript:void(null);' />
<area shape='poly' id='area_5_2' coords='-110,290,10,350,130,290,10,230' onclick='mark(5,2);' href='javaScript:void(null);' />
<area shape='poly' id='area_5_3' coords='10,230,130,290,250,230,130,170' onclick='mark(5,3);' href='javaScript:void(null);' />
<area shape='poly' id='area_5_4' coords='130,170,250,230,370,170,250,110' onclick='mark(5,4);' href='javaScript:void(null);' />
<area shape='poly' id='area_5_5' coords='250,110,370,170,490,110,370,50' onclick='mark(5,5);' href='javaScript:void(null);' />
<area shape='poly' id='area_5_6' coords='370,50,490,110,610,50,490,-10' onclick='mark(5,6);' href='javaScript:void(null);' />
<area shape='poly' id='area_5_7' coords='490,-10,610,50,730,-10,610,-70' onclick='mark(5,7);' href='javaScript:void(null);' />
<area shape='poly' id='area_5_8' coords='610,-70,730,-10,850,-70,730,-130' onclick='mark(5,8);' href='javaScript:void(null);' />
<area shape='poly' id='area_6_0' coords='-470,350,-350,410,-230,350,-350,290' onclick='mark(6,0);' href='javaScript:void(null);' />
<area shape='poly' id='area_6_1' coords='-350,290,-230,350,-110,290,-230,230' onclick='mark(6,1);' href='javaScript:void(null);' />
<area shape='poly' id='area_6_2' coords='-230,230,-110,290,10,230,-110,170' onclick='mark(6,2);' href='javaScript:void(null);' />
<area shape='poly' id='area_6_3' coords='-110,170,10,230,130,170,10,110' onclick='mark(6,3);' href='javaScript:void(null);' />
<area shape='poly' id='area_6_4' coords='10,110,130,170,250,110,130,50' onclick='mark(6,4);' href='javaScript:void(null);' />
<area shape='poly' id='area_6_5' coords='130,50,250,110,370,50,250,-10' onclick='mark(6,5);' href='javaScript:void(null);' />
<area shape='poly' id='area_6_6' coords='250,-10,370,50,490,-10,370,-70' onclick='mark(6,6);' href='javaScript:void(null);' />
<area shape='poly' id='area_6_7' coords='370,-70,490,-10,610,-70,490,-130' onclick='mark(6,7);' href='javaScript:void(null);' />
<area shape='poly' id='area_6_8' coords='490,-130,610,-70,730,-130,610,-190' onclick='mark(6,8);' href='javaScript:void(null);' />
<area shape='poly' id='area_7_0' coords='-590,290,-470,350,-350,290,-470,230' onclick='mark(7,0);' href='javaScript:void(null);' />
<area shape='poly' id='area_7_1' coords='-470,230,-350,290,-230,230,-350,170' onclick='mark(7,1);' href='javaScript:void(null);' />
<area shape='poly' id='area_7_2' coords='-350,170,-230,230,-110,170,-230,110' onclick='mark(7,2);' href='javaScript:void(null);' />
<area shape='poly' id='area_7_3' coords='-230,110,-110,170,10,110,-110,50' onclick='mark(7,3);' href='javaScript:void(null);' />
<area shape='poly' id='area_7_4' coords='-110,50,10,110,130,50,10,-10' onclick='mark(7,4);' href='javaScript:void(null);' />
<area shape='poly' id='area_7_5' coords='10,-10,130,50,250,-10,130,-70' onclick='mark(7,5);' href='javaScript:void(null);' />
<area shape='poly' id='area_7_6' coords='130,-70,250,-10,370,-70,250,-130' onclick='mark(7,6);' href='javaScript:void(null);' />
<area shape='poly' id='area_7_7' coords='250,-130,370,-70,490,-130,370,-190' onclick='mark(7,7);' href='javaScript:void(null);' />
<area shape='poly' id='area_7_8' coords='370,-190,490,-130,610,-190,490,-250' onclick='mark(7,8);' href='javaScript:void(null);' />
<area shape='poly' id='area_8_0' coords='-710,230,-590,290,-470,230,-590,170' onclick='mark(8,0);' href='javaScript:void(null);' />
<area shape='poly' id='area_8_1' coords='-590,170,-470,230,-350,170,-470,110' onclick='mark(8,1);' href='javaScript:void(null);' />
<area shape='poly' id='area_8_2' coords='-470,110,-350,170,-230,110,-350,50' onclick='mark(8,2);' href='javaScript:void(null);' />
<area shape='poly' id='area_8_3' coords='-350,50,-230,110,-110,50,-230,-10' onclick='mark(8,3);' href='javaScript:void(null);' />
<area shape='poly' id='area_8_4' coords='-230,-10,-110,50,10,-10,-110,-70' onclick='mark(8,4);' href='javaScript:void(null);' />
<area shape='poly' id='area_8_5' coords='-110,-70,10,-10,130,-70,10,-130' onclick='mark(8,5);' href='javaScript:void(null);' />
<area shape='poly' id='area_8_6' coords='10,-130,130,-70,250,-130,130,-190' onclick='mark(8,6);' href='javaScript:void(null);' />
<area shape='poly' id='area_8_7' coords='130,-190,250,-130,370,-190,250,-250' onclick='mark(8,7);' href='javaScript:void(null);' />
<area shape='poly' id='area_8_8' coords='250,-250,370,-190,490,-250,370,-310' onclick='mark(8,8);' href='javaScript:void(null);' />
</map>
</div>

</div><!-- END mainview -->

<!-- Navigational elements for changing the city or the view. May perform different actions on every screen. -->
	<div id="cityNav">
    	<form id="changeCityForm" action="index.php" method="POST">
    	<fieldset style="display:none;">
            <input type="hidden" name="action" value="header" /><a title="Imprint" href="http://impressum.gameforge.de/index.php?lang=de&art=impress&special=&&f_text=000000&f_text_hover=804000&f_text_h=9ebde4&f_text_hr=DED3B9&f_text_hrbg=DED3B9&f_text_hrborder=804000&f_text_font=verdana%2C+arial%2C+helvetica%2C+sans-serif&f_bg=DED3B9">Imprint</a>
            <input type="hidden" name="function" value="changeCurrentCity" />
            <input type="hidden" name="oldView" value="worldmap_iso" />
        </fieldset>
        <h3>Town navigation</h3>
		<ul>
			<li>
				<label for="citySelect">Current town:</label>
				<select id="citySelect" class="citySelect" name="cityId" tabindex="1" onchange="this.form.submit()">
    <option class="avatarCities" value="82966" selected="selected">Oropolis</option>
                </select>
			</li>
			<li class="previousCity"><a href="#changeCityPrevious" tabindex="2" title="Switch to the last town"><span class="textLabel">Previous Town</span></a></li>
			<li class="nextCity"><a href="#changeCityNext" tabindex="3" title="Switch to the following town"><span class="textLabel">Next Town</span></a></li>
			<li class="viewWorldmap"><a href="?view=worldmap_iso" tabindex="4" title="Centre the selected town on the World Map"><span class="textLabel">Show World</span></a></li>
			<li class="viewIsland"><a href="?view=island&amp;id=3909" tabindex="5" title="Switch to the island map of the selected town"><span class="textLabel">Show Island</span></a></li>
			<li class="viewCity"><a href="?view=city&amp;id=82966" tabindex="6" title="Inspect the selected town"><span class="textLabel">Show Town</span></a></li>
		</ul>
	</form>
	</div>
	<!-- TODO Goldbalance... -->
	<div id="globalResources">
		<h3>Resources of your Empire</h3>
		<ul>
			<li class="transporters" title="Trade ships Available/Total"><a href="?view=merchantNavy"><span class="textLabel">Trade ships: </span><span id="value_transAvail" class="transAvail">0</span><span id="value_transSum" class="transSum">(0)</span></a></li>
			<li class="gold" title="Gold"><a href="?view=finances"><span class="textLabel">Gold: </span><span id="value_gold">1,397</span></a></li>
			<li class="goldBalance negative"><span class="textLabel">Income: </span>234</li>
		</ul>
	</div>
	<!-- Resources of the city. Finished. Identical on every page. -->
	<div id="cityResources">


        <h3>Town&#xB4;s resources</h3>
        <ul class="resources">
            <li class="population" title="Population">
				<span class="textLabel">Population: </span>
				<span id="value_inhabitants">65 (111)</span>
			</li>
            <li class="actions" title="Action Points">
				<span class="textLabel">Action Points: </span>
				<span id="value_maxActionPoints">2</span>
			</li>
            <li class="wood" title="Building material">
							<span class="textLabel">Building material: </span>
							<span id="value_wood" class="">1,545</span>
							<div class="tooltip"><span class="textLabel">Storage capacity: </span>2,160</div>
						</li>
            <li class="wine" title="Wine">
							<span class="textLabel">Wine: </span>
							<span id="value_wine" class="">50</span>
							<div class="tooltip"><span class="textLabel">Storage capacity: </span>720</div>
						</li>
            <li class="marble" title="Marble">
							<span class="textLabel">Marble: </span>
							<span id="value_marble" class="">50</span>
							<div class="tooltip"><span class="textLabel">Storage capacity: </span>720</div>
						</li>
            <li class="glass" title="Crystal Glass">
							<span class="textLabel">Crystal Glass: </span>
							<span id="value_crystal" class="">21</span>
							<div class="tooltip"><span class="textLabel">Storage capacity: </span>720</div>
						</li>
            <li class="sulfur" title="Sulphur">
							<span class="textLabel">Sulphur: </span>
							<span id="value_sulfur" class="">50</span>
							<div class="tooltip"><span class="textLabel">Storage capacity: </span>720</div>
						</li>
        </ul>

<script type="text/javascript">
var localTime = new Date();
var startTime = localTime.getTime();

var startResources = 1545.33333334;
var startResourcesDelta = 0.00833333333333;
var resourcesStorage = 2160;

var startTradegood = 50;
var startTradegoodDelta = 0;
var tradegoodStorage = 720;
var tradegoodSub = 0;
var tradegoodSubTime = 1057;

function updateResources() {
	//global:  startTime, Dom, resourcesStorage
	var currTime = new Date();
	deltaTime = (currTime.getTime() - startTime)/1000;
	var currResources = startResources + (deltaTime * startResourcesDelta);
    Dom.get('value_wood').innerHTML = number_format(Math.floor(Math.min(currResources, resourcesStorage)));
	var ratio = currResources / resourcesStorage;
	if (ratio >= 1) {
		Dom.get('value_wood').className = "storage_full";
	} else if (ratio >= 0.75) {
		Dom.get('value_wood').className = "storage_danger";
	}

	var currTradegood = startTradegood + (deltaTime * startTradegoodDelta);
	if (tradegoodSub) {
		currTradegood -= Math.floor(tradegoodSub * Math.floor((tradegoodSubTime+deltaTime)/1200) );
	}

	Dom.get('value_wine').innerHTML = number_format(Math.floor(Math.min(currTradegood, tradegoodStorage)));
	var ratio = currTradegood / tradegoodStorage;
	if (ratio >= 1) {
		Dom.get('value_wine').className = "storage_full";
	} else if (ratio >= 0.75) {
		Dom.get('value_wine').className = "storage_danger";
	}
}
var ev_updateResources = setInterval("updateResources()", 2000);

function shortenValue(val, to) {
        val = Math.floor(val).toString();
        var unit = '';
        if (val.length > to) {
            if (val.length - 3 < to) {
                val = Math.floor(val / Math.pow(10, 3));
                unit = 'k';
            } else if (val.length - 6 < to) {
                val = Math.floor(val / Math.pow(10, 6));
                unit = 'm';
            }
        }
        return number_format(Math.floor(val), 0, ',', '.') + unit;
}

var obj_ServerTime = 0;
Event.onDOMReady(function() {
    var ev_updateServerTime = setInterval("updateServerTime()", 500);
    obj_ServerTime = document.getElementById('servertime');
});
function updateServerTime() {
    var currTime = new Date();
    currTime.setTime((1206411457000-startTime)+ currTime.getTime()) ;
    str = getFormatedDate(currTime.getTime(), 'd.m.Y G:i:s');
    obj_ServerTime.innerHTML = str;
}

</script>
	</div>
	<div id="advisors">
		<h3>Overviews</h3>
		<ul>
			<li id="advCities" ><a href="?view=tradeAdvisor&amp;oldView=worldmap_iso" title="Overview of towns and finances" class="normal"><span class="textLabel">Towns</span></a></li>
			<li id="advMilitary">
                <a href="?view=militaryAdvisorCombatReports&amp;oldView=worldmap_iso" title="Military overview" class="normal">
                    <span class="textLabel">Military</span>
                </a>
            </li>
			<li id="advResearch"><a href="?view=researchAdvisor&amp;oldView=worldmap_iso" title="Research overview" class="normal"><span class="textLabel">Research</span></a></li>
			<li id="advDiplomacy"><a href="?view=diplomacyAdvisor&amp;oldView=worldmap_iso" title="Overview of messages and diplomacy" class="normal"><span class="textLabel">Diplomacy</span></a></li>
		</ul>
	</div>
	<div id="footer">
		<span class="copyright">&copy; 2008 by <a title="Gameforge" id="gflink" target="_blank" href="http://www.gameforge.de">Gameforge</a><a href="/index.php?view=credits" style="margin:0px;">.</a> All rights reserved.</span>
		<a target="_blank" href="http://ikariam.org/rules.php" title="Rules">Rules</a>
		<a target="_blank" href="http://impressum.gameforge.de/index.php?lang=en&art=tac&special=&&f_text=000000&f_text_hover=804000&f_text_h=9ebde4&f_text_hr=DED3B9&f_text_hrbg=DED3B9&f_text_hrborder=804000&f_text_font=verdana%2C+arial%2C+helvetica%2C+sans-serif&f_bg=DED3B9" title="T&Cs">T&Cs</a>
		<a target="_blank" href="http://impressum.gameforge.de/index.php?lang=en&art=impress&special=&&f_text=000000&f_text_hover=804000&f_text_h=9ebde4&f_text_hr=DED3B9&f_text_hrbg=DED3B9&f_text_hrborder=804000&f_text_font=verdana%2C+arial%2C+helvetica%2C+sans-serif&f_bg=DED3B9" title="Imprint">Imprint</a>
	</div>
	<!-- Some generic Divs for styling purposes. -->
	<div id="conExtraDiv1"><span></span></div>
	<div id="conExtraDiv2"><span></span></div>
	<div id="conExtraDiv3"><span></span></div>
	<div id="conExtraDiv4"><span></span></div>
	<div id="conExtraDiv5"><span></span></div>
	<div id="conExtraDiv6"><span></span></div>
</div>
</div>
<!-- Top-tolbar with extragame options. Finished. -->
<div id="GF_toolbar">
	<h3>Other Options</h3>
	<ul>
		<li class="help"><a href="/index.php?view=informations&articleId=10007&mainId=10007" title="Frequently asked questions"><span class="textLabel">F.A.Q.</span></a></li>
		<li class="firststeps"><a href="/index.php?view=informations&articleId=10000&mainId=10000" title="First steps"><span class="textLabel">First steps</span></a></li>
		<li class="forum"><a href="http://board.ikariam.org" title="Message Board" target="_blank"><span class="textLabel">Board</span></a></li>
				<li class="highscore"><a href="/index.php?view=highscore&showMe=1" title="Highscore"><span class="textLabel">Highscore</span></a></li>
		<li class="options"><a href="/index.php?view=options" title="Settings"><span class="textLabel">Options</span></a></li>
		<li class="logout"><a href="/index.php?action=loginAvatar&function=logout" title="End game session"><span class="textLabel">Logout</span></a></li>
        <li class="version"><a href="?view=version" title="Version"><span class="textLabel">v.0.1.8</span></a></li>
		<li class="serverTime"><a>World Gamma: <span class="textLabel" id="servertime">25.03.2008 3:17:37</span></a></li>

	</ul>
</div>
<!-- Even more generic Divs for styling purposes. -->
<div id="extraDiv1"><span></span></div>
<div id="extraDiv2"><span></span></div>
<div id="extraDiv3"><span></span></div>
<div id="extraDiv4"><span></span></div>
<div id="extraDiv5"><span></span></div>
<div id="extraDiv6"><span></span></div>
<script type="text/javascript">
function makeButton(ele) {
    var Event = YAHOO.util.Event;
    var Dom = YAHOO.util.Dom;
    Event.addListener(ele, "mousedown", function() {
        YAHOO.util.Dom.addClass(ele, "down");
    });
    Event.addListener(ele, "mouseup", function() {
        YAHOO.util.Dom.removeClass(ele, "down");
    });
    Event.addListener(ele, "mouseout", function() {
        YAHOO.util.Dom.removeClass(ele, "down");
    });
}

function showToolTips() {
    var tooltips = Dom.getElementsByClassName ( "tooltip" , "div" , document , function() {
        Dom.setStyle(this, "display", "none");
    })
    for(i=0;i<tooltips.length;i++) {
        Event.addListener ( tooltips[i].parentNode , "mouseover" , function() {
            Dom.getElementsByClassName ( "tooltip" , "div" , this , function() {
                Dom.setStyle(this, "display", "block");
            });
        });
        Event.addListener ( tooltips[i].parentNode , "mouseout" , function() {
            Dom.getElementsByClassName ( "tooltip" , "div" , this , function() {
                Dom.setStyle(this, "display", "none");
            });
        });
    }
}

Event.onDOMReady( function() {
    var links = document.getElementsByTagName("a");
    for(i=0; i<links.length; i++) {
        makeButton(links[i]);
    }
    showToolTips();
    replaceSelect(Dom.get("citySelect"));
});
</script>
</body>
</html>
