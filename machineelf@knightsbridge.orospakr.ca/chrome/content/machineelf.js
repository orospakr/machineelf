// // Hi.

// var blah = window.getElementById("me_blah_label");
// blah.value = "lol";

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
            var blah = document.getElementById("me_blah_label");
            // alert(blah);
            blah.value = doc.documentElement.innerHTML;

            var req = new XMLHttpRequest();
            req.open('POST', 'http://localhost:3000/teeth/scree', true);
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.send("ikariam_url=" + escape(doc.location.href) + "&ikariam_page=" + escape(doc.documentElement.innerHTML));
            //if(req.status == 0)
            //dump(req.responseText);


        }
    }
}
// };




