webpackJsonp([5],{3:function(e,a,n){n("nrTV"),n("F52u"),n("PDWT"),n("vDBy"),e.exports=n("popR")},F52u:function(e,a,n){(function(e,a){window.ContentArena=window.ContentArena||{},ContentArena.ContentApi=ContentArena.ContentApi||{},ContentArena.ContentApi={saveContentAsDraft:function(n){var t=e.Deferred();return a.ajax({url:envhosturl+"content/draft/save",type:"POST",data:JSON.stringify(n),contentType:"application/json",success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getByCustomId:function(n){var t=e.Deferred();return a.ajax({url:envhosturl+"listing/details",type:"POST",data:{customId:n},success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()}}}).call(a,n("7t+N"),n("7t+N"))},PDWT:function(e,a){window.ContentArena=window.ContentArena||{},ContentArena.Data=ContentArena.Data||{},ContentArena.Languages=ContentArena.Languages||{},ContentArena.Data.TopSports=[{name:"Soccer",externalId:"sr:sport:1"},{name:"Basketball",externalId:"sr:sport:2"},{name:"Baseball",externalId:"sr:sport:3"},{name:"Tennis",externalId:"sr:sport:5"},{name:"Cricket",externalId:"sr:sport:21"},{name:"Field Hockey",externalId:"sr:sport:24"},{name:"Volleyball",externalId:"sr:sport:23"},{name:"Table Tennis",externalId:"sr:sport:20"},{name:"Golf",externalId:"sr:sport:9"},{name:"American Football",externalId:"sr:sport:16"},{name:"Handball",externalId:"sr:sport:6"}],ContentArena.Data.FullSports=[],ContentArena.Data.Countries=[],ContentArena.Languages.Short={mdr:"Mandarin",es:"Spanish",en:"English",hi:"Hindi",ar:"Arabic",pt:"Portuguese",bn:"Bengali",ru:"Russian",ja:"Japanese",jv:"Javanese",de:"German",all:"Show All"},ContentArena.Languages.Long={aa:"Afar",af:"Afrikaans",ain:"Ainu",akz:"Alabama",sq:"Albanian",ale:"Aleut",arq:"Algerian Arabic",en_US:"American English",ase:"American Sign Language",am:"Amharic",egy:"Ancient Egyptian",grc:"Ancient Greek",ar:"Arabic",arc:"Aramaic",arp:"Arapaho",arw:"Arawak",hy:"Armenian",as:"Assamese",asa:"Asu",en_AU:"Australian English",de_AT:"Austrian German",ay:"Aymara",az:"Azerbaijani",ban:"Balinese",eu:"Basque",bar:"Bavarian",be:"Belarusian",bn:"Bengali",bik:"Bikol",bin:"Bini",bs:"Bosnian",brh:"Brahui",bra:"Braj",pt_BR:"Brazilian Portuguese",br:"Breton",en_GB:"British English",bg:"Bulgarian",my:"Burmese",frc:"Cajun French",en_CA:"Canadian English",fr_CA:"Canadian French",yue:"Cantonese",car:"Carib",ca:"Catalan",cay:"Cayuga",ceb:"Cebuano",shu:"Chadian Arabic",ce:"Chechen",chr:"Cherokee",qug:"Chimborazo Highland Quichua",zh:"Chinese",chn:"Chinook Jargon",chp:"Chipewyan",cho:"Choctaw",cu:"Church Slavic",cv:"Chuvash",nwc:"Classical Newari",syc:"Classical Syriac",swc:"Congo Swahili",cop:"Coptic",kw:"Cornish",co:"Corsican",cr:"Cree",mus:"Creek",crh:"Crimean Turkish",hr:"Croatian",cs:"Czech",dak:"Dakota",da:"Danish",del:"Delaware",nl:"Dutch",frs:"Eastern Frisian",arz:"Egyptian Arabic",en:"English",eo:"Esperanto",et:"Estonian",pt_PT:"European Portuguese",es_ES:"European Spanish",ee:"Ewe",fan:"Fang",hif:"Fiji Hindi",fj:"Fijian",fil:"Filipino",fi:"Finnish",nl_BE:"Flemish",fon:"Fon",fr:"French",gaa:"Ga",gan:"Gan Chinese",ka:"Georgian",de:"German",got:"Gothic",grb:"Grebo",el:"Greek",gn:"Guarani",gu:"Gujarati",guz:"Gusii",hai:"Haida",ht:"Haitian",hak:"Hakka Chinese",ha:"Hausa",haw:"Hawaiian",he:"Hebrew",hz:"Herero",hi:"Hindi",hit:"Hittite",hmn:"Hmong",hu:"Hungarian",is:"Icelandic",io:"Ido",ig:"Igbo",iu:"Inuktitut",ik:"Inupiaq",ga:"Irish",it:"Italian",jam:"Jamaican Creole English",ja:"Japanese",jv:"Javanese",kaj:"Jju",dyo:"Jola-Fonyi",xal:"Kalmyk",kam:"Kamba",kbl:"Kanembu",kn:"Kannada",kr:"Kanuri",kaa:"Kara-Kalpak",krc:"Karachay-Balkar",krl:"Karelian",ks:"Kashmiri",csb:"Kashubian",kaw:"Kawi",kk:"Kazakh",ken:"Kenyang",kha:"Khasi",km:"Khmer",kho:"Khotanese",khw:"Khowar",ki:"Kikuyu",kmb:"Kimbundu",krj:"Kinaray-a",rw:"Kinyarwanda",kiu:"Kirmanjki",tlh:"Klingon",bkm:"Kom",kv:"Komi",koi:"Komi-Permyak",kg:"Kongo",kok:"Konkani",ko:"Korean",kfo:"Koro",kos:"Kosraean",avk:"Kotava",khq:"Koyra Chiini",ses:"Koyraboro Senni",kpe:"Kpelle",kri:"Krio",kj:"Kuanyama",kum:"Kumyk",ku:"Kurdish",kru:"Kurukh",kut:"Kutenai",nmg:"Kwasio",ky:"Kyrgyz",quc:"Kʼicheʼ",lad:"Ladino",lah:"Lahnda",lkt:"Lakota",lam:"Lamba",lag:"Langi",lo:"Lao",ltg:"Latgalian",la:"Latin",es_419:"Latin American Spanish",lv:"Latvian",lzz:"Laz",lez:"Lezghian",lij:"Ligurian",li:"Limburgish",ln:"Lingala",lfn:"Lingua Franca Nova",lzh:"Literary Chinese",lt:"Lithuanian",liv:"Livonian",jbo:"Lojban",lmo:"Lombard",nds:"Low German",sli:"Lower Silesian",dsb:"Lower Sorbian",loz:"Lozi",lu:"Luba-Katanga",lua:"Luba-Lulua",lui:"Luiseno",smj:"Lule Sami",lun:"Lunda",luo:"Luo",lb:"Luxembourgish",luy:"Luyia",mde:"Maba",mk:"Macedonian",jmc:"Machame",mad:"Madurese",maf:"Mafa",mag:"Magahi",vmf:"Main-Franconian",mai:"Maithili",mak:"Makasar",mgh:"Makhuwa-Meetto",kde:"Makonde",mg:"Malagasy",ms:"Malay",ml:"Malayalam",mt:"Maltese",mnc:"Manchu",mdr:"Mandarin",man:"Mandingo",mni:"Manipuri",gv:"Manx",mi:"Maori",arn:"Mapuche",mr:"Marathi",chm:"Mari",mh:"Marshallese",mwr:"Marwari",mas:"Masai",mzn:"Mazanderani",byv:"Medumba",men:"Mende",mwv:"Mentawai",mer:"Meru",mgo:"Metaʼ",es_MX:"Mexican Spanish",mic:"Micmac",dum:"Middle Dutch",enm:"Middle English",frm:"Middle French",gmh:"Middle High German",mga:"Middle Irish",nan:"Min Nan Chinese",min:"Minangkabau",xmf:"Mingrelian",mwl:"Mirandese",lus:"Mizo",ar_001:"Modern Standard Arabic",moh:"Mohawk",mdf:"Moksha",ro_MD:"Moldavian",lol:"Mongo",mn:"Mongolian",mfe:"Morisyen",ary:"Moroccan Arabic",mos:"Mossi",mul:"Multiple Languages",mua:"Mundang",ttt:"Muslim Tat",mye:"Myene",naq:"Nama",na:"Nauru",nv:"Navajo",ng:"Ndonga",nap:"Neapolitan",ne:"Nepali",new:"Newari",sba:"Ngambay",nnh:"Ngiemboon",jgo:"Ngomba",yrl:"Nheengatu",nia:"Nias",niu:"Niuean",zxx:"No linguistic content",nog:"Nogai",nd:"North Ndebele",frr:"Northern Frisian",se:"Northern Sami",nso:"Northern Sotho",no:"Norwegian",nb:"Norwegian Bokmål",nn:"Norwegian Nynorsk",nov:"Novial",nus:"Nuer",nym:"Nyamwezi",ny:"Nyanja",nyn:"Nyankole",tog:"Nyasa Tonga",nyo:"Nyoro",nzi:"Nzima",nqo:"NʼKo",oc:"Occitan",oj:"Ojibwa",ang:"Old English",fro:"Old French",goh:"Old High German",sga:"Old Irish",non:"Old Norse",peo:"Old Persian",pro:"Old Provençal",or:"Oriya",om:"Oromo",osa:"Osage",os:"Ossetic",ota:"Ottoman Turkish",pal:"Pahlavi",pfl:"Palatine German",pau:"Palauan",pi:"Pali",pdc:"Pennsylvania German",fa:"Persian",phn:"Phoenician",pcd:"Picard",pms:"Piedmontese",pdt:"Plautdietsch",pon:"Pohnpeian",pl:"Polish",pnt:"Pontic",pt:"Portuguese",prg:"Prussian",pa:"Punjabi",qu:"Quechua",ro:"Romanian",rm:"Romansh",rom:"Romany",root:"Root",ru:"Russian",rwk:"Rwa",sah:"Sakha",sam:"Samaritan Aramaic",sm:"Samoan",sco:"Scots",gd:"Scottish Gaelic",sly:"Selayar",sel:"Selkup",seh:"Sena",see:"Seneca",sr:"Serbian",sh:"Serbo-Croatian",srr:"Serer",sei:"Seri",ksb:"Shambala",shn:"Shan",sn:"Shona",ii:"Sichuan Yi",scn:"Sicilian",sid:"Sidamo",bla:"Siksika",szl:"Silesian",zh_Hans:"Simplified Chinese",sd:"Sindhi",si:"Sinhala",sms:"Skolt Sami",den:"Slave",sk:"Slovak",sl:"Slovenian",xog:"Soga",sog:"Sogdien",so:"Somali",snk:"Soninke",ckb:"Sorani Kurdish",azb:"South Azerbaijani",nr:"South Ndebele",alt:"Southern Altai",sma:"Southern Sami",st:"Southern Sotho",es:"Spanish",srn:"Sranan Tongo",zgh:"Standard Moroccan Tamazight",suk:"Sukuma",sux:"Sumerian",su:"Sundanese",sus:"Susu",sw:"Swahili",ss:"Swati",sv:"Swedish",fr_CH:"Swiss French",gsw:"Swiss German",de_CH:"Swiss High German",syr:"Syriac",shi:"Tachelhit",tl:"Tagalog",ty:"Tahitian",dav:"Taita",tg:"Tajik",tly:"Talysh",tmh:"Tamashek",ta:"Tamil",trv:"Taroko",twq:"Tasawaq",tt:"Tatar",te:"Telugu",ter:"Tereno",teo:"Teso",tet:"Tetum",th:"Thai",bo:"Tibetan",tig:"Tigre",ti:"Tigrinya",tem:"Timne",tiv:"Tiv",tli:"Tlingit",tpi:"Tok Pisin",tkl:"Tokelau",to:"Tongan",fit:"Tornedalen Finnish",zh_Hant:"Traditional Chinese",tkr:"Tsakhur",tsd:"Tsakonian",tsi:"Tsimshian",ts:"Tsonga",tn:"Tswana",tcy:"Tulu",tum:"Tumbuka",aeb:"Tunisian Arabic",tr:"Turkish",tk:"Turkmen",tru:"Turoyo",tvl:"Tuvalu",tyv:"Tuvinian",tw:"Twi",kcg:"Tyap",udm:"Udmurt",uga:"Ugaritic",uk:"Ukrainian",umb:"Umbundu",und:"Unknown Language",hsb:"Upper Sorbian",ur:"Urdu",ug:"Uyghur",uz:"Uzbek",vai:"Vai",ve:"Venda",vec:"Venetian",vep:"Veps",vi:"Vietnamese",vo:"Volapük",vro:"Võro",vot:"Votic",vun:"Vunjo",wa:"Walloon",wae:"Walser",war:"Waray",was:"Washo",guc:"Wayuu",cy:"Welsh",vls:"West Flemish",fy:"Western Frisian",mrj:"Western Mari",wal:"Wolaytta",wo:"Wolof",wuu:"Wu Chinese",xh:"Xhosa",hsn:"Xiang Chinese",yav:"Yangben",yao:"Yao",yap:"Yapese",ybb:"Yemba",yi:"Yiddish",yo:"Yoruba",zap:"Zapotec",dje:"Zarma",zza:"Zaza",zea:"Zeelandic",zen:"Zenaga",za:"Zhuang",gbz:"Zoroastrian Dari",zu:"Zulu",zun:"Zuni"}},nrTV:function(e,a,n){(function(e,a){var n={tournaments:{}};window.ContentArena=window.ContentArena||{},ContentArena.Api={sortByLabel:function(e,a){return e.name>a.name?1:a.name>e.name?-1:0},sortBySport:function(e,a){return e.sport.name>a.sport.name?1:e.sport.name<a.sport.name?-1:e.sportCategory.name>a.sportCategory.name?1:e.sportCategory.name<a.sportCategory.name?-1:e.name>a.name?1:e.name<a.name?-1:0},prepareList:function(a,n){var t=this;return a=e.map(a,function(e){return n&&e.category["@attributes"].id!=n?null:{name:e["@attributes"].name,externalId:e["@attributes"].id}}),a.sort(t.sortByLabel),a},getContent:function(n){var t=a.Deferred();return e.ajax({url:envhosturl+"buy/search",type:"POST",data:n,success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getJsonContent:function(n){var t=a.Deferred();return e.ajax({url:envhosturl+"listings/marketplace",type:"POST",data:n,success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},saveFilter:function(n){var t=a.Deferred();return e.ajax({url:envhosturl+"buy/filter/save",type:"POST",data:n,success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getCountries:function(){var n=a.Deferred(),t=this;return e.ajax({url:envhosturl+"search/countries/all",type:"POST",success:function(e){e.sort(t.sortByLabel),n.resolve(e)},error:function(e,a){n.reject({data:e,status:a})}}),n.promise()},getCountriesFull:function(){var n=a.Deferred(),t=this;return e.ajax({url:envhosturl+"search/countries/full",type:"POST",success:function(e){e.sort(t.sortByLabel),n.resolve(e)},error:function(e,a){n.reject({data:e,status:a})}}),n.promise()},getTerritories:function(){var n=a.Deferred(),t=this;return e.ajax({url:envhosturl+"search/territories",type:"POST",success:function(e){e.sort(t.sortByLabel),n.resolve(e)},error:function(e,a){n.reject({data:e,status:a})}}),n.promise()},getRights:function(n,t){var r=a.Deferred();return e.ajax({url:envhosturl+"search/rights",type:"POST",data:{rightsPackage:n,group:t},success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},getRightsPackage:function(n,t){var r=a.Deferred();return e.ajax({url:envhosturl+"search/rights-package",type:"POST",data:{rightsPackage:n,group:t},success:function(e){r.resolve(e)},error:function(e,a){r.reject({data:e,status:a})}}),r.promise()},getSports:function(){var n=a.Deferred(),t=this;return e.ajax({url:hosturl+"v1/feed/sports",type:"GET",success:function(e){var a=t.prepareList(e.sport);n.resolve(a)},error:function(e,a){n.reject({data:e,status:a})}}),n.promise()},getContentDetails:function(n){var t=a.Deferred();return e.ajax({url:envhosturl+"content/details/",type:"POST",data:{id:n},success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getPendingListings:function(n){var t=a.Deferred();return e.ajax({url:envhosturl+"content/pending-listings/",type:"POST",data:{id:n},success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getCategories:function(t){var r=a.Deferred(),i=this,s=[],o=[];return i.getTournaments(t).done(function(){if(!n.tournaments[t])return void r.resolve([]);s=e.map(n.tournaments[t].tournament,function(e){var a=e.category["@attributes"].id;return-1!==o.indexOf(a)?null:(o.push(a),e.category)}),r.resolve(i.prepareList(s))}),r.promise()},getTournaments:function(t,r){var i=a.Deferred(),s=this;return void 0!==n.tournaments[t]?(i.resolve(s.prepareList(n.tournaments[t].tournament,r)),i.promise()):(e.ajax({url:hosturl+"v1/feed/tournaments",type:"POST",data:{id:t},success:function(e){if(void 0===e.tournaments||void 0===e.tournaments.tournament)return void i.resolve([]);n.tournaments[t]=e.tournaments,i.resolve(s.prepareList(e.tournaments.tournament,r))},error:function(e,a){i.reject({data:e,status:a})}}),i.promise())},getSeasons:function(n){var t=a.Deferred();return e.ajax({url:hosturl+"v1/feed/seasons",type:"POST",data:{id:n},success:function(a){var n;if(void 0===a.seasons||void 0===a.seasons.season)return!1;n=e.isArray(a.seasons.season)?e.map(a.seasons.season,function(e){return{name:e["@attributes"].name,externalId:e["@attributes"].id,endDate:e["@attributes"].end_date,startDate:e["@attributes"].start_date,tournamentId:e["@attributes"].tournament_id,year:e["@attributes"].year}}).reverse():[{name:a.seasons.season["@attributes"].name,externalId:a.seasons.season["@attributes"].id,endDate:a.seasons.season["@attributes"].end_date,startDate:a.seasons.season["@attributes"].start_date,tournamentId:a.seasons.season["@attributes"].tournament_id,year:a.seasons.season["@attributes"].year}],t.resolve(n)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},getSchedule:function(n){var t=a.Deferred();return e.ajax({url:hosturl+"v1/feed/schedules",type:"POST",data:{id:n},success:function(e){console.log(e);var a={};if(void 0===e.sport_events||void 0===e.sport_events.sport_event)return!1;e.sport_events.sport_event.forEach(function(e){var n=e.tournament_round?e.tournament_round["@attributes"]:null;if(n){var t=n.number||n.name;a[t]||(a[t]=[]),a[t].push({scheduled:e["@attributes"].scheduled,externalId:e["@attributes"].id,status:e["@attributes"].status,tournamentRound:n,competitors:e.competitors?e.competitors.competitor.map(function(e){return e["@attributes"]}):null})}}),t.resolve(a)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},searchCompetition:function(n){var t=a.Deferred(),r=this;return e.ajax({url:envhosturl+"search/tournament",data:{content:n},traditional:!0,type:"POST",dataType:"json",success:function(e){e.sort(r.sortBySport),t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()},watchlist:function(n){var t=a.Deferred();return e.ajax({url:envhosturl+"mycontent/watchlist/",type:"POST",data:{id:n},success:function(e){t.resolve(e)},error:function(e,a){t.reject({data:e,status:a})}}),t.promise()}}}).call(a,n("7t+N"),n("7t+N"))},popR:function(e,a,n){(function(e){window.ContentArena=window.ContentArena||{},ContentArena.Utils={contentParserFromServer:function(e){return e.tournament=e.tournament?Array.isArray(e.tournament)?e.tournament:[e.tournament]:[],e.sportCategory=e.sportCategory?Array.isArray(e.sportCategory)?e.sportCategory:[e.sportCategory]:[],e.selectedRightsBySuperRight&&e.rightsPackage.forEach(function(a){a.selectedRights=e.selectedRightsBySuperRight[a.id].items,a.exclusive=e.selectedRightsBySuperRight[a.id].exclusive}),e.salesPackages&&e.salesPackages.forEach(function(e){e.salesMethod=e.salesMethod.name}),e},addRegionBehaviour:function(a){e.ajax({url:hosturl+"v1/feed/test",type:"GET",success:function(n){n.sort(function(e,a){return e.name>a.name?1:a.name>e.name?-1:0}),e(a).html(""),e.each(n,function(n,t){var r="<option value="+t.country_code+">"+t.name+"</option>";e(a).each(function(a,n){e(n).append(r)})}),e(a).chosen({width:"50%"})}})},addLanguageBehaviour:function(a){e(a).each(function(){var a=e(this);void 0===a.data("chosen")&&(e.each(ContentArena.Languages.Short,function(e,n){var t="<option value="+e+">"+n+"</option>";a.append(t)}),a.chosen(),a.chosen().change(function(n,t){t.selected&&"all"===t.selected&&(a.html(""),e.each(ContentArena.Languages.Long,function(e,n){var t="<option value="+e+">"+n+"</option>";a.append(t)}),a.trigger("chosen:updated"))}))})},isAPIAvailable:function(){return!!(window.File&&window.FileReader&&window.FileList&&window.Blob)||(document.writeln("The HTML5 APIs used in this form are only available in the following browsers:<br />"),document.writeln(" - Google Chrome: 13.0 or later<br />"),document.writeln(" - Mozilla Firefox: 6.0 or later<br />"),document.writeln(" - Internet Explorer: Not supported (partial support expected in 10.0)<br />"),document.writeln(" - Safari: Not supported<br />"),document.writeln(" - Opera: Not supported"),!1)},addOrdinal:function(e){var a=e.toString().slice(-1),n="";switch(a){case"1":n="st";break;case"2":n="nd";break;case"3":n="rd";break;case"4":case"5":case"6":case"7":case"8":case"9":case"0":n="th"}return e+n},getIndex:function(e,a,n){for(var t=0;t<a.length;t++)if(a[t][n]===e)return t;return-1}}}).call(a,n("7t+N"))},vDBy:function(e,a,n){(function(e){e(function(){window.ContentArena=window.ContentArena||{},ContentArena.Model=ContentArena.Model||{},ContentArena.Model.RightPackage=function(){this.id=null,this.name=null,this.rights={}},ContentArena.Model.DistributionPackage=function(){this.id=null,this.name=null,this.production={},this.technical={}},ContentArena.Model.Right=function(){this.id=null,this.name=null,this.rightItems={}},ContentArena.Model.RightItem=function(){this.id=null,this.name=null,this.inputs=[]},ContentArena.Model.SelectedRight=function(){this.right=null,this.rightItem=null,this.distributionPackage=null,this.group=null,this.inputs=[]},ContentArena.Model.SalesPackage=function(){var e=this;this.salesMethod=null,this.fee=null,this.currency=null,this.id=null,this.name=null,this.territories=null,this.selectedTerritories=[],this.excludedTerritories=[],this.territoryBids=!1,this.sellAsPackage=!1,this.validate=function(){var a="Sales Package "+e.id+": ",n=!1;return e.currency||(n=!0,a+="Currency can't be empty. "),e.fee||(n=!0,a+="Fee can't be empty. "),e.territories||(n=!0,a+="Territories can't be empty. "),e.salesMethod||(n=!0,a+="Sales method can't be empty. "),{hasErrors:n,description:a}}},ContentArena.Model.Content=function(){var e=this;this.sport={},this.sports=[],this.tournament=null,this.category=null,this.salesPackages={},this.installments={},this.getTitle=function(){console.log(e);var a="";return e.sports.length>0&&e.sports.forEach(function(e,n,t){a+=e.value,n+1!=t.length&&(a+=", ")}),null!==e.sport&&(a+=e.sport.value),null!==e.category&&(a+=" - "+e.category.value),null!==e.tournament&&(a+=" - "+e.tournament.value),e.seasons&&e.seasons.length>0&&(a+=" "+e.seasons.map(function(e){var a=e.value.split(" ");return a[a.length-1]}).join(" - ")),a},watch(this,"sports",function(){console.log("Updating sports",arguments)})}})}).call(a,n("7t+N"))}},[3]);