// // Hi.

// var blah = window.getElementById("me_blah_label");
// blah.value = "lol";

function getIkariamCookie() {
    var domain = "s3.ikariam.org";
    var path = "/";
    var cookieManager = Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager);
    var iter = cookieManager.enumerator;
    while ( iter.hasMoreElements() ){
        cookie = iter.getNext();
        dotDomain = '.'+domain;
                if ( cookie instanceof Components.interfaces.nsICookie && cookie.host == domain && cookie.path == path ) {
        //        if ( cookie instanceof Components.interfaces.nsICookie && dotDomain.endsWith( cookie.host ) && path.beginsWith( cookie.path ) ) {
            if (cookie.name == "ikariam") {
                return (cookie.value);
            }
        }
    }
}

window.addEventListener("load", function() { MachineElfPageLoadListener.init(); }, false);

var MachineElfPageLoadListener = {
    init: function() {
        var appcontent = document.getElementById("appcontent");   // browser
        if(appcontent)
            appcontent.addEventListener("DOMContentLoaded", this.onPageLoad, true);
        var messagepane = document.getElementById("messagepane"); // mail
        if(messagepane)
            messagepane.addEventListener("load", function () { MachineElfPageLoadListener.onPageLoad(); }, true);
    },

    lol: function() {
        alert("PENISJ");
    },

    onPageLoad: function(aEvent) {
        var doc = aEvent.originalTarget; // doc is document that triggered "onload" event
        // do something with the loaded page.
        // doc.location is a Location object (see below for a link).
        // You can use it to make your code executed on certain pages only.
        if(doc.location.href.search("http://s3.ikariam.org") > -1) {
            // alert("a forum page is loaded: " + doc.location.href );
            // lol();
            alert("here!");
            var blah = document.getElementById("me_blah_label");

            var cookie_value = getIkariamCookie();
            alert(cookie_value);
            // alert(blah);
            blah.value = doc.documentElement.innerHTML;

            var req = new XMLHttpRequest();
            req.open('POST', 'http://localhost:3000/teeth/scree', true);
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.send("ikariam_url=" + escape(doc.location.href) + "&ikariam_cookie=" + escape(cookie_value) + "&ikariam_page=" + escape(doc.documentElement.innerHTML));
            //if(req.status == 0)
            //dump(req.responseText);
        }
    }
}
