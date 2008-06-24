// Machine Elf 2 Toolbar.

window.addEventListener("load", function() { MachineElfToolbar.init(); }, false);

// class defined in so-called 'literal' notation

var MachineElfToolbar = {
    init: function() {
        var appcontent = document.getElementById("appcontent");   // browser
        if(appcontent)
            appcontent.addEventListener("DOMContentLoaded", MachineElfToolbar.onPageLoad, true);
        var messagepane = document.getElementById("messagepane"); // mail
        if(messagepane)
            messagepane.addEventListener("load", function () { MachineElfPageLoadListener.onPageLoad(); }, true);
    },

    warp_zone_items: [],

    lol: function() {
        alert("lol internets");
    },

    updateWarpMenu: function(towns_json) {
        var warp_menu = document.getElementById("machineelf_warp_menu");
        for (item in MachineElfToolbar.warp_zone_items) {
            warp_menu.removeChild(item);
        }
        MachineElfToolbar.warp_zone_items = [];

        for (town in towns_json) {
            //            town = towns_json[0];
            var test_item = document.createElement("menuitem");
            test_item.setAttribute("label", towns_json[town].name);
            warp_menu.appendChild(test_item);
            MachineElfToolbar.warp_zone_items.push(test_item);
        }
    },

    updateToolbar: function(towns_json_req) {
        var blah = document.getElementById("me_blah_label");
        blah.value = 'UNMODIFIED FROG';

        var towns_json;

        if (towns_json_req.readyState == 4) {
            // blah.value = req.responseText;
            towns_json = eval('(' + towns_json_req.responseText + ')');

        }
        else {
            blah.value = "FAILURE";
            return;
        }
        blah.value = towns_json[0].name;
        MachineElfToolbar.updateWarpMenu(towns_json);
    },

    onPageLoad: function(aEvent) {
        var doc = aEvent.originalTarget; // doc is document that triggered "onload" event
        // do something with the loaded page.
        // doc.location is a Location object (see below for a link).
        // You can use it to make your code executed on certain pages only.
        if(doc.location.href.search("http://s3.ikariam.org") > -1) {
            // alert("a forum page is loaded: " + doc.location.href );
            // lol();
            //            alert("here!");
            var blah = document.getElementById("me_blah_label");
            var cookie_value = MachineElfToolbar.getIkariamCookie();
            //            alert(cookie_value);
            // alert(blah);
            //            blah.value = doc.documentElement.innerHTML;

            var req = new XMLHttpRequest();
            req.open('POST', 'http://localhost:3000/teeth/scree', true);
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.send("ikariam_url=" + escape(doc.location.href) + "&ikariam_cookie=" + escape(cookie_value) + "&ikariam_page=" + escape(doc.documentElement.innerHTML));
            //if(req.status == 0)
            //dump(req.responseText);

            // read Town stats from server and display town name in me_blah_label!
            //            updateToolbar(doc);

            var tb_updater = new XMLHttpRequest();
            tb_updater.open("GET", "http://localhost:3000/towns.json", true);
            //            req.onreadystatechange = updateToolbar;   // the handler
            tb_updater.onreadystatechange=function() {
                MachineElfToolbar.updateToolbar(tb_updater);
            }
            tb_updater.send(null);
        }
    },

    getIkariamCookie: function() {
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
}
