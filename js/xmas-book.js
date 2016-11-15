var startPageflip;

$( function() {
	var $pageflip = $("#pageflip"),
		pageflip,
		
		/* Book configurations, each is an object, with the book id as identifier */
		bookConfig = {
				/* book ID - used as CSS class name */
			chibook: {
				/* Configuration options */
					PageDataFile: "template1_meet_pageflip/meetpageflip.html",
					PageWidth: 1748,
					PageHeight: 2480,
					StageWidth: "100%",
					StageHeight: "100%",
					FullScreenEnabled: true,
					Transparency: true,
					Margin: 0,
					MarginBottom:50,
					FullScale : true,
					AlwaysOpened: false,
					AutoFlipLoop: 1,
					CenterSinglePage: true,
					DropShadowOpacity: 0.3,
					FlipTopShadowOpacity: 0.2,
					FlipShadowOpacity: 0.2,
					HardFlipOpacity: 0.3,
					EmbossOpacity: 0.2,
					SecondaryDragArea: 72,
					
					Transparency: true,
					ControlbarFile: "common/controlbar_svg-chi.html",
					SinglePageMode: true,
					HashControl: true,
					ShareLink: "http://pageflip-books.com",
					ShareText: "Pageflip5, The Book Template for the Web",
					ShareVia: "@MaccPageFlip",
					ShareImageURL: "http://pageflip-books.com/images/shareimage.jpg",
					ShowCopyright: false,
					Copyright: Key.Copyright,
					Key: Key.Key
				},
			engbook: {
					/* Configuration options */					
					PageDataFile: "template2_meet_pageflip/meetpageflip.html",
					PageWidth: 1748,
					PageHeight: 2480,
					FullScreenEnabled: true,
					Transparency: true,				
					Margin: 0,
					MarginBottom:50,
					FullScale : true,
					AlwaysOpened: false,
					
					CenterSinglePage: true,
					DropShadowOpacity: 0.3,
					FlipTopShadowOpacity: 0.2,
					FlipShadowOpacity: 0.2,
					HardFlipOpacity: 0.3,
					EmbossOpacity: 0.2,
					SecondaryDragArea: 72,
					AutoFlipLoop: 1,
					Transparency: true,
					ControlbarFile: "common/controlbar_svg-eng.html",
					SinglePageMode: true,
					HashControl: true,
					ShareLink: "http://pageflip-books.com",
					ShareText: "Pageflip5, The Book Template for the Web",
					ShareVia: "@MaccPageFlip",
					ShareImageURL: "http://pageflip-books.com/images/shareimage.jpg",
					ShowCopyright: false,
					Copyright: Key.Copyright,
					Key: Key.Key
				}

		},
		defaultID = "engbook",	//"demo1",
		startID = defaultID,
		loadedID,
		closing,
		
		/* initial hash check (multibook feature: which book to load first?) */
		getHashID = function() {
			var h = location.hash;
			return h.substr( 1 ).split("/")[0];
		},
		
		id = getHashID();
		
		$("a[href*=#]").live( "click", function( e ) {
			e.preventDefault();
			var p = $(this.hash).position().top-80,
				mp = $(document).height()-$(window).height(),
				dest = ( p>mp )? mp: p;
			$("html,body").stop().animate({scrollTop:dest}, 800,"swing");
		});

			
		/* MEET PAGEFLIP CUSTOM FUNCTIONS */
			var animmode = 1, 
				animbtns = [ "#animateontop", "#animateonvisible" ],
				loop = false,
				rot = 0,
				target,
				zooming = false,
				CustomPFEventHandler = {
					onFlip: function( PN ) 	{ 
						if( PN==18 ) $("#isflipping").addClass("selected");

					},
					onFlipEnd: function( PN ) {
						if( PN==18 ) $("#isflipping").removeClass("selected");
						

					},
					onTop: function( PN ) {
						if( PN==21 && animmode==0 ) startLoop();
						if( PN==18 ) $("#isontop").addClass("selected");
						if(PN!=1)
						 $("#returnBtn").delay( 5000 ).fadeIn();
					},
					onTopEnd: function( PN ) {
						if( PN==21 && animmode==0 ) stopLoop();
						if( PN==18 ) $("#isontop").removeClass("selected");
						 $("#returnBtn").stop().fadeOut();
					},
					onLoad: function( PN ) {
						if( PN==11 ) videoInit();
						if( PN==18 ) setZoomFlag();
					},
					onUnload: function( PN ) {
						if( PN==21 && animmode==1 ) stopLoop();
					},
					onHide: function( PN ) {
						if( PN==21 && animmode==1 ) stopLoop();
						if( PN==18 ) $("#isvisible").removeClass("selected");
					},
					onShow: function( PN ) {
						if( PN==21 ) {
							if( animmode==1 ) startLoop();
							else setRot();
							animation( animmode );
						}
						if( PN==18 ) $("#isvisible").addClass("selected");



					},
					onZoomIn: function( PN ) {
						zooming = true;
						setZoomFlag();
					},
					onZoomOut: function( PN ) {
						zooming = false;
						setZoomFlag();
					}
				};
			

			gotoPage = function( p ) {
				pageflip.gotoPage( p, true );
			}
			videoPlay = function() {
				var myVideo = document.getElementById("thevideo");
				if (myVideo.paused) myVideo.play(); 
				else myVideo.pause(); 
			}
			videoInit = function() {
				//var myVideo = document.getElementById("thevideo");
			}
			selectFeature = function( f ) {
				$(".features").addClass("off");
				$("#feature"+f).removeClass("off");
				$("#featurelist ul li").removeClass("selected");
				$("#option"+f).addClass("selected");
			}
			animation = function( t ) {
				animmode = t;
				$(".animationcontrol").removeClass("selected");
				$(animbtns[t]).addClass("selected");
			}
			theLoop = function() {
				if( loop ) raf2( theLoop );
				setRot();
			}
			setRot = function() {
				$("#spiral").css( { transform: "rotate("+rot+"deg)" } );
				rot = ( rot+4 )%360;
			}
			startLoop = function() {
				if( !loop ) {
					loop = true;
					theLoop();
				}
			}
			stopLoop = function() {
				loop = false;
			}
			setZoomFlag = function() {
				if( zooming ) $("#iszooming").addClass("selected");
				else $("#iszooming").removeClass("selected");
			}
			window.raf2 = (function(){
				return 	window.requestAnimationFrame       ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame    ||
						function( callback ) {
						window.setTimeout( callback, 100/6 );
				};
			})();
			
			/* END MEET PAGEFLIP CUSTOM FUNCTIONS */

				
	/* start the first book automatically! */
		startPageflip = function( id ) {
		if( closing || id==loadedID ) return
		if( loadedID ) {
			/* we have a loaded book, so unload it first */
			closing = true;
			loadedID = undefined;
			pageflip.closePageflip( function() { closing = false; startPageflip( id ); } );
		} else {
			/* load the book */
			loadedID = id;
			var h = getHashID();
			if( ( defaultID==id && h && h!=id ) || ( defaultID!=id && h!=id ) ) location.hash = id;
			$pageflip.pageflipInit( bookConfig[id], id );
			pageflip = $pageflip.pageflip();
			pageflip.setPFEventCallBack( CustomPFEventHandler );
			$("#returnBtn").stop().fadeOut();
		}
	};
	
	if( bookConfig[id] && defaultID!=id ) {  startID = id; } 
	else { if( $("#"+id).length ) gotoAnchor( "#"+id ); }

	startPageflip( startID );

});