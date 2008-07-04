// Machine Elf 2.0 Toolbar.


window.addEventListener("load", function() { MachineElf.init(this); }, false);

// TODO for tomorrow

// I have to determine which Ikariam server by hostname I'm on BEFORE I can scree,
// because I need to know which cookie to get and send along.  DONE

// Add nice UI in the toolbar to show town stats, obviously...
// ... mm, I need to fetch the Player's JSON (which I have an id for through User),
// ... and from there acquire their global props (gold, etc.) as well as their towns

// Cordon off the admin features (CRUD/scaffold operations that mutate things)

// Implement remaining-build time feature for buildings DONE

// Create an action for building level retrieval, like /towns/:id/stats,
// that returns building levels... or should I perhaps be using that new way of including computed values in activerecord serialization?
// DONE

// figure out why population_capacity isn't showing up


// class defined in so-called 'literal' notation
var MachineElf = {
    REFRESH_INTERVAL: 30000,
    MACHINEELF_HOST: "http://localhost:3000",
    servers_list: null,

    init: function(chromeWindow) {
        var appcontent = document.getElementById("appcontent");   // browser
        if(appcontent)
            appcontent.addEventListener("DOMContentLoaded", MachineElf.onPageLoad, true);
        var messagepane = document.getElementById("messagepane"); // mail
        if(messagepane)
            messagepane.addEventListener("load", function () { MachineElfPageLoadListener.onPageLoad(); }, true);

                chromeWindow.window.setInterval("MachineElf.doUpdate();",
        this.REFRESH_INTERVAL);
        this.detectServers();
        this.doUpdate();
    },

    logger: Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService),

    warp_zone_items: [],

    toolbar_towns: [],

    lol: function() {
        alert("lol internets");
    },

    log: function(string) {
        MachineElf.logger.logStringMessage("Machine Elf says: " + string);
    },

    setStatusMessage: function(message) {
        var me_status_label = document.getElementById("me_status_label");
        me_status_label.value = message;
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

    updateToolbarTowns: function(towns_json_req) {
        var towns_json;

        if (towns_json_req.readyState == 4) {
            towns_json = eval('(' + towns_json_req.responseText + ')');
            //blah.value = towns_json[0].name;
            MachineElf.updateTownsOnToolbar(towns_json);
            MachineElf.updateWarpMenu(towns_json);
        }
        else {
            //blah.value = "FAILURE";
            return;
        }
    },

    updateTownsOnToolbar: function(towns_json) {
        var me_cities_list = document.getElementById("me_cities_list");
        // remove all of the pre-existing town info buttons on the toolbar
        // placed by addTownToToolbar on the previous run...
        for (town_elem in MachineElf.toolbar_towns) {
            me_cities_list.removeChild(MachineElf.toolbar_towns[town_elem]);
        }
        MachineElf.toolbar_towns = [];

        for (town in towns_json) {
            var town = towns_json[town];
            MachineElf.addTownToToolbar(town);
        }
    },

    openLink: function(url) {
        gBrowser.selectedTab = gBrowser.addTab(url);
    },

    addTownToToolbar: function(town) {
        var me_cities_list = document.getElementById("me_cities_list");
        var town_hbox = document.createElement("hbox");
        var town_button = document.createElement("toolbarbutton");
        var town_button_tooltip = document.createElement("tooltip");
        var town_button_tooltip_id = "town_tooltip_" + town.id;

        town_button.onclick = function() {
            MachineElf.openLink(town.url);
        };

        for (resource in town.current_stats.resources) {
            var res_label = document.createElement("label");
            var res_label_value = document.createElement("label");
            var res_hbox = document.createElement("hbox");
            town_button_tooltip.appendChild(res_hbox);
            res_label.setAttribute("value", resource);
            res_label_value.setAttribute("value", town.current_stats.resources[resource]);
            res_hbox.appendChild(res_label);
            res_hbox.appendChild(res_label_value);
        }

        for (building in town.current_stats.buildings) {
            var building_label = document.createElement("label");
            var building_label_value = document.createElement("label");
            var building_hbox = document.createElement("hbox");
            town_button_tooltip.appendChild(building_hbox);
            building_label.setAttribute("value", building);
            building_label_value.setAttribute("value", town.current_stats.buildings[building].level);
            building_hbox.appendChild(building_label);
            building_hbox.appendChild(building_label_value);
        }

        town_hbox.appendChild(town_button_tooltip);
        town_button.setAttribute("label", town.name);
        town_button_tooltip.setAttribute("id", town_button_tooltip_id);
        town_button.setAttribute("tooltip", town_button_tooltip_id);
        town_hbox.appendChild(town_button);
        me_cities_list.appendChild(town_hbox);
        MachineElf.toolbar_towns.push(town_hbox);
    },

    doScrape: function(doc) {
        // figure out which server the user is looking at

        var current_server = null;

        for (server in MachineElf.servers_list) {
            if (doc.location.href.search(MachineElf.servers_list[server].hostname) > -1) {
                current_server = MachineElf.servers_list[server];
            }
        }

        if (current_server != null) {
            MachineElf.log("We're looking at a page on an Ikariam server!  Hostname: " + current_server.hostname);

            var cookie_value = MachineElf.getIkariamCookie(current_server.hostname);

            var req = new XMLHttpRequest();
            req.open('POST', MachineElf.MACHINEELF_HOST + '/teeth/scree', true);
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.send("ikariam_url=" + escape(doc.location.href) + "&ikariam_cookie=" + escape(cookie_value) + "&ikariam_page=" + escape(doc.documentElement.innerHTML));
            MachineElf.log("Scrape of '" + doc.location.href + "' completed successfully.");
            //if(req.status == 0)
            //dump(req.responseText);

            // read Town stats from server and display town name in me_blah_label!
            //            updateToolbar(doc);

            MachineElf.doUpdate();
        }
    },

    // Called by various callbacks when the user is not logged in.  May happen
    // many times.  Sets a non-modal ui notification.
    notLoggedIn: function() {
        MachineElf.setStatusMessage("You aren't logged into Machine Elf.");
    },

    serverDetectedCallback: function(servers_json_req) {
        if (servers_json_req.readyState == 4) {
            MachineElf.log("serverDetectedCallback responseText: " + servers_json_req.responseText);
            if (servers_json_req.statusText == "Not Acceptable") {
                MachineElf.log("Servers list request was Not Acceptable (you're probably not logged in or approved yet). Skipping server load.");
                return;
            }
            // var servers_json = eval('(' + servers_json_req.reponseText + ')');
            MachineElf.log("responseText !!@! : " + servers_json_req.responseText);
            var loltest = eval('([{"name":"John","location":"Boston"}])');
            var servers_json = eval("(" + servers_json_req.responseText +")");
            if (servers_json === undefined) {
                alert("THIS SHOULD NOT HAPPEN EVER. responseText was: " + servers_json_req.responseText);
            }
            MachineElf.servers_list = [];
            for (server in servers_json) {
                MachineElf.servers_list.push(servers_json[server]);
                MachineElf.log("Retrieved server: " + servers_json[server].hostname);
            }
        }
    },

    detectServers: function() {
        if (MachineElf.servers_list) {
            MachineElf.log("serversList already downloaded, not retrying.");
            return;
        }
        var servers_json_req = new XMLHttpRequest();
        servers_json_req.open('GET', MachineElf.MACHINEELF_HOST + '/servers.json', true);
        servers_json_req.onreadystatechange=function() {
            MachineElf.serverDetectedCallback(servers_json_req);
        }
        servers_json_req.send(null);
    },

    onPageLoad: function(aEvent) {
        var doc = aEvent.originalTarget; // doc is www document that triggered "onload" event
        // HACK -- this should properly check for this being the hostname,
        // rather than (and fetch hostnames on start from RESTful API), this
        // *ikariam.org* catch-all.
        MachineElf.detectServers();
        if (MachineElf.servers_list) {
            MachineElf.doScrape(doc);
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
            if (login_checker.responseText.search("YES") > -1 ) {
                var items = login_checker.responseText.split(' ');
                if (items[0] != "YES") {
                    MachineElf.log("Badly formed YES directive!  Contents: '" + login_checker.responseText + "'");
                }
                MachineElf.dispatchUpdaters(items[1]);
                MachineElf.setStatusMessage("READY");
            }
            else if (login_checker.responseText == "NO") {
                MachineElf.notLoggedIn();
            }
            else if (login_checker.responseText == "NOT APPROVED") {
                MachineElf.setStatusMessage("You haven't been approved yet as a Machine Elf user.  Prod Andrew.");
            }
            else if (login_checker.responseText == "ACTIVATION PENDING") {
                MachineElf.setStatusMessage("Check your email.  You need to follow the activation link there before anything will work.  Really.");
            }
            else {
                MachineElf.setStatusMessage("BROKEN  (No connectivity or Machine Elf server down)");
                MachineElf.log("Weird or broken reply to /am_i_logged_in. responseText: \n\n" + login_checker.responseText);
            }
        }
    },

    dispatchUpdaters: function(user_id) {
        MachineElf.doToolbarUpdate(user_id);
    },

    doToolbarUpdate: function(user_id) {
        var towns_updater = new XMLHttpRequest();
            towns_updater.open("GET", MachineElf.MACHINEELF_HOST + "/towns.json", true);
            //            req.onreadystatechange = updateToolbar;   // the handler
            towns_updater.onreadystatechange=function() {
                MachineElf.updateToolbarTowns(towns_updater);
            }
            towns_updater.send(null);
    },

    getIkariamCookie: function(domain) {
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
