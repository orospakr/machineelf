// Machine Elf 2 Toolbar.

window.addEventListener("load", function() { MachineElf.init(this); }, false);

// class defined in so-called 'literal' notation

var MachineElf = {
    REFRESH_INTERVAL: 30000,
    MACHINEELF_HOST: "http://localhost:3000",

    init: function(chromeWindow) {
        var appcontent = document.getElementById("appcontent");   // browser
        if(appcontent)
            appcontent.addEventListener("DOMContentLoaded", MachineElf.onPageLoad, true);
        var messagepane = document.getElementById("messagepane"); // mail
        if(messagepane)
            messagepane.addEventListener("load", function () { MachineElfPageLoadListener.onPageLoad(); }, true);

                chromeWindow.window.setInterval("MachineElf.doUpdate();",
        this.REFRESH_INTERVAL);
        this.doUpdate();
    },

    warp_zone_items: [],

    lol: function() {
        alert("lol internets");
    },

    updateWarpMenu: function(towns_json) {
        var warp_menu = document.getElementById("machineelf_warp_menu");
        for (item in MachineElf.warp_zone_items) {
            warp_menu.removeChild(MachineElf.warp_zone_items[item]);
        }
        MachineElf.warp_zone_items = [];

        for (town in towns_json) {
            var new_item = document.createElement("menuitem");
            new_item.setAttribute("label", towns_json[town].name);
            warp_menu.appendChild(new_item);
            MachineElf.warp_zone_items.push(new_item);
        }
    },

    updateToolbar: function(towns_json_req) {
        var blah = document.getElementById("me_blah_label");
        blah.value = 'UNMODIFIED FROG';

        var towns_json;

        if (towns_json_req.readyState == 4) {
            towns_json = eval('(' + towns_json_req.responseText + ')');
            blah.value = towns_json[0].name;
            MachineElf.updateWarpMenu(towns_json);
        }
        else {
            blah.value = "FAILURE";
            return;
        }
    },

    onPageLoad: function(aEvent) {
        var doc = aEvent.originalTarget; // doc is document that triggered "onload" event
        // do something with the loaded page.
        // doc.location is a Location object (see below for a link).
        // You can use it to make your code executed on certain pages only.
        // HACK -- this should properly check for this being the hostname,
        // rather than (and fetch hostnames on start from RESTful API, rather
        // than this *ikariam.org* catch-all.
        if(doc.location.href.search("ikariam.org") > -1) {
            // alert("a forum page is loaded: " + doc.location.href );
            // lol();
            //            alert("here!");
            //            var blah = document.getElementById("me_blah_label");
            var cookie_value = MachineElf.getIkariamCookie();
            //            alert(cookie_value);
            // alert(blah);
            //            blah.value = doc.documentElement.innerHTML;

            var req = new XMLHttpRequest();
            req.open('POST', MachineElf.MACHINEELF_HOST + '/teeth/scree', true);
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.send("ikariam_url=" + escape(doc.location.href) + "&ikariam_cookie=" + escape(cookie_value) + "&ikariam_page=" + escape(doc.documentElement.innerHTML));
            //if(req.status == 0)
            //dump(req.responseText);

            // read Town stats from server and display town name in me_blah_label!
            //            updateToolbar(doc);

            MachineElf.doUpdate();
        }
    },

    doUpdate: function() {
        var login_checker = new XMLHttpRequest();
        login_checker.open('GET', MachineElf.MACHINEELF_HOST + '/am_i_logged_in', true);
        login_checker.onreadystatechange=function() {
            MachineElf.validateLoginAndDispatchUpdates(login_checker);
        }
        login_checker.send(null);
    },

    validateLoginAndDispatchUpdates: function(login_checker) {
        if (login_checker.readyState == 4) {
            if (login_checker.responseText == "YES") {
                MachineElf.dispatchUpdaters();
            }
            else if (login_checker.responseText == "NO") {
                alert("You aren't logged into Machine Elf.");
            }
            else if (login_checker.responseText == "NOT APPROVED") {
                alert("You haven't been approved yet as a Machine Elf user.  Prod Andrew.");
            }
            else if (login_checker.responseText == "ACTIVATION PENDING") {
                alert("Check your email.  You need to follow the activation link there before anything will work.  Really.");
            }
            else {
                alert("Unreconized response to Machine Elf 2.0's are_you_logged_in method.  It may be down or your Internet connection may be weird.  Text: \n\n" + login_checker.responseText);
            }
        }
    },

    dispatchUpdaters: function() {
        MachineElf.doToolbarUpdate();
    },

    doToolbarUpdate: function() {
        var tb_updater = new XMLHttpRequest();
            tb_updater.open("GET", MachineElf.MACHINEELF_HOST + "/towns.json", true);
            //            req.onreadystatechange = updateToolbar;   // the handler
            tb_updater.onreadystatechange=function() {
                MachineElf.updateToolbar(tb_updater);
            }
            tb_updater.send(null);
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
