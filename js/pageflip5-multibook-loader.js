var startPageflip;

$( function() {
	var $pageflip = $("#pageflip"),
		pageflip,
		
		/* Book configurations, each is an object, with the book id as identifier */
		bookConfig = {
				/* book ID - used as CSS class name */
			meetpageflip: {
				/* Configuration options */
					PageDataFile: "template1_meet_pageflip/meetpageflip.html",
					PageWidth: 700,
					PageHeight: 994,
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
					SecondaryDragArea: 32,
					AutoFlipLoop: 1,
					Transparency: true,
					ControlbarFile: "common/controlbar_svg.html",
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
			demo2: {
					/* Configuration options */					
					PageDataFile: "template2_meet_pageflip/meetpageflip.html",
					PageWidth: 700,
					PageHeight: 994,
					FullScreenEnabled: true,
					Transparency: true,				
					Margin: 0,
					MarginBottom:50,
					FullScale : true,
					AlwaysOpened: false,
					AutoFlipLoop: -1,
					CenterSinglePage: true,
					DropShadowOpacity: 0.3,
					FlipTopShadowOpacity: 0.2,
					FlipShadowOpacity: 0.2,
					HardFlipOpacity: 0.3,
					EmbossOpacity: 0.2,
					SecondaryDragArea: 32,
					AutoFlipLoop: 1,
					Transparency: true,
					ControlbarFile: "common/controlbar_svg.html",
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
		defaultID = "meetpageflip",	//"demo1",
		startID = defaultID,
		loadedID,
		closing,
		
		/* initial hash check (multibook feature: which book to load first?) */
		getHashID = function() {
			var h = location.hash;
			return h.substr( 1 ).split("/")[0];
		},
		
		id = getHashID();
				
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
		}
	};
	
	if( bookConfig[id] && defaultID!=id ) {  startID = id; } 
	else { if( $("#"+id).length ) gotoAnchor( "#"+id ); }

	startPageflip( startID );

});