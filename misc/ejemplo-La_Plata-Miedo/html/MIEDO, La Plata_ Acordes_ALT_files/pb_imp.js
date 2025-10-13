// download the apstag library
!function(a9,a,p,s,t,A,g){if(a[a9])return;function q(c,r){a[a9]._Q.push([c,r])}a[a9]={init:function(){q("i",arguments)},fetchBids:function(){q("f",arguments)},setDisplayBids:function(){},targetingKeys:function(){return[]},_Q:[]};A=p.createElement(s);A.async=!0;A.src=t;g=p.getElementsByTagName(s)[0];g.parentNode.insertBefore(A,g)}("apstag",window,document,"script","//c.amazon-adsystem.com/aax2/apstag.js");

var PB_apn = {728:'12315775', 160:'12315777', 300:'12315786', 320:'12315811'};
var PB_epl = {728:'209bf', 160:'209bf', 300:'209bf', 320:'209bf'};
var PB_152 = {728:'12993488', 160:'12993500', 300:'12993502', 320:'12993503'};
var PB_tap = {728:'pub-63795-desktop-3850', 160:'pub-63795-desktop-3850', 300:'pub-63796-mweb-3864', 320:'pub-63796-mweb-3864'};
var PB_sov = {728:'566729', 160:'566586', 300:'566727', 320:'566728'};
var PB_pon = {728:'1225213501164', 160:'1225213501352', 300:'1225213502626', 320:'12252135015132'};
var PB_med = {728:'147789624', 160:'576582682', 300:'862551360', 320:'684721134'};
var PB_int = {728:'835362', 160:'835378', 300:'835379', 320:'83538'};
var PB_rch = {728:'hMPHMKDQbQ', 160:'iWw15ZTstG', 300:'0Tz9gBkEgf', 320:'YGx2AorJLE'};
var PB_con = {728:'b516d9f9', 160:'19aa4130', 300:'fb3501a8', 320:'dbf430d0'};
var PB_ref = {728:'31415601', 160:'31415588', 300:'31415604', 320:'31415634'};
var PB_sma = {728:'136205411', 160:'136205410', 300:'136205362', 320:'136205361'};

window.googletag = window.googletag || {cmd: []};
var pbjs = pbjs || {que:[]};
apstag.init({ pubID: '2723359b-a7e3-4ad3-84f4-376ef7b3a20f', adServer: 'googletag'});

var bidTimeout = 3000, safeTimeout = 5000;

var GAMslot = [];
googletag.cmd.push(function() {
	for (i = 0; i < myAds.length; i++) {
		GAMslot[i] = googletag.defineSlot(myAds[i].adu, [myAds[i].sz], myAds[i].id)
            .setTargeting("test", "refresh")
            .addService(googletag.pubads());
    }
	googletag.pubads().disableInitialLoad();
	googletag.pubads().enableSingleRequest();

//	if (typeof(myAdsTarget)!= "undefined") googletag.pubads().setTargeting(myAdsTarget, ['1']);
if (typeof(myAdsTarget)!= "undefined" && typeof(res) != "undefined") {

		switch (true) {
			case (typeof(res['rolacode']) != "undefined") :
				googletag.pubads().setTargeting('artist', [encodeURI(res['banda'])]).setTargeting('song', [encodeURI(res['cancion'])]).setTargeting('lc_tran', ['1']);
				break;

			case (typeof(res['cancion']) != "undefined") :
				googletag.pubads().setTargeting('artist', [encodeURI(res['banda'])]).setTargeting('song', [encodeURI(res['cancion'])]);
				break;

			case (typeof(res['banda']) != "undefined") :
				googletag.pubads().setTargeting('artist', [encodeURI(res['banda'])]);
				break;
		}

}
	googletag.enableServices();
});

// define apstag slots
var apstagSlots = [];
for (i = 0; i < myAds.length; i++) {
	if (myAds[i].sz[0] == 1) continue;
 	apstagSlots[i] = {slotID:myAds[i].id, slotName:myAds[i].adu, sizes:[myAds[i].sz] };
}


// define prebid ad units and granularity
const customGranularity = { 'buckets': [{'min': 0, 'max': 1.50, 'increment': 0.01}, {'min': 1.50, 'max': 5, 'increment': 0.05}, {'min': 5, 'max': 30, 'increment': 0.50}] };
pbjs.que.push(function() { pbjs.setConfig({ priceGranularity: customGranularity }); });
pbjs.que.push(function() { pbjs.setConfig({enableTIDs: true}); });
pbjs.que.push(function() { pbjs.aliasBidder('appnexus', 'refinery'); });
pbjs.bidderSettings = {
    appnexus: {storageAllowed: true},
    eplanning: {storageAllowed: true},
};

pbjs.que.push(function() {
		 pbjs.setConfig({
		     userSync: {
		         userIds: [
							{ name: 'amxId', storage: { name: 'amxId', type: 'html5', expires: 14 } },
						 	{ name: 'sharedId', bidders: ['conversant','medianet','appnexus','richaudience'] }
						]
		     }
		 });
});


var adUnits = [];
for (i = 0; i < myAds.length; i++) {
	adsz = myAds[i].sz[0];
	if (adsz == 1) continue;
 	adUnits[i] = {code:myAds[i].id, mediaTypes:{banner:{sizes:[myAds[i].sz]}}, bids: [
		//		{bidder: 'sovrn',			params: { tagid: PB_sov[adsz] }},
		{bidder: 'adpone',			params: { placementId: PB_pon[adsz] }},
		{bidder: 'amx',				params: { }},
		{bidder: 'appnexus',		params: { placementId:PB_apn[adsz] }},
//		{bidder: 'conversant',	    params: { site_id:'227719', secure:1, tag_id:PB_con[adsz] }},
//		{bidder: 'eplanning',		params: { ci: '209bf' }},
		{bidder: 'medianet',		params: { cid: '8CU1A8WY5', bidfloor:0.05, crid:PB_med[adsz] }},
		{bidder: 'oftmedia',		params: { placementId: PB_152[adsz] }},
//		{bidder: 'onetag',			params: { pubId: "775dab4de90fba0" }},
		{bidder: 'refinery',		params: { publisherId:"2353522", placementId: PB_ref[adsz] }},
		{bidder: "richaudience",	params: { pid: PB_rch[adsz], supplyType: "site" }},
//        {bidder: 'setupad',         params: {account_id:'lacuerdanet', placement_id: '8886'}},
//		{bidder: "smaato",	        params: { publisherId:'1100056802', adspaceId:PB_sma[adsz] }},
//		{bidder: 'tappx',			params: { host: "ssp.api.tappx.com/rtb/v2/", tappxkey: PB_tap[adsz], endpoint: "ZZ38778LC", bidfloor: 0.02 }},
        {bidder: 'yandex',          params: {pageId:6110327, impId: 1}}
	]};
}


// whenever you want header bids call this function
function fetchHeaderBids() {

    var FAILSAFE_TIMEOUT = 3000;
    var requestManager = {
        adserverRequestSent: false,
        aps: false,
        prebid: false
    };

    // when both APS and Prebid have returned, initiate ad request
    function biddersBack() {
        if (requestManager.aps && requestManager.prebid) {
            sendAdserverRequest();
        }
        return;
    }

    // sends adserver request
    function sendAdserverRequest() {
        if (requestManager.adserverRequestSent === true) {
            return;
        }
        requestManager.adserverRequestSent = true;
        googletag.cmd.push(function() {
            googletag.pubads().refresh();
        });
    }

    // sends bid request to APS and Prebid
    function requestHeaderBids() {


        // APS request
        apstag.fetchBids({
                slots: apstagSlots
            },function(bids) {
                googletag.cmd.push(function() {
                    apstag.setDisplayBids();
                    requestManager.aps = true; // signals that APS request has completed
                    biddersBack(); // checks whether both APS and Prebid have returned
                });
            }
        );

//requestManager.aps = true; // signals that APS request has completed

        // put prebid request here
        pbjs.que.push(function() {
			pbjs.addAdUnits(adUnits);
            pbjs.requestBids({
                bidsBackHandler: function() {
                    googletag.cmd.push(function() {
                        pbjs.setTargetingForGPTAsync();
                        requestManager.prebid = true; // signals that Prebid request has completed
                        biddersBack(); // checks whether both APS and Prebid have returned
                    })
                }
            });
        });
    }

    // initiate bid request
    requestHeaderBids();

    // set failsafe timeout
    window.setTimeout(function() {
        sendAdserverRequest();
    }, FAILSAFE_TIMEOUT);
};

fetchHeaderBids();
function bidStart() { }
