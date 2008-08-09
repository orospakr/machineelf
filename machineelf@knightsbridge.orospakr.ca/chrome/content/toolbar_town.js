function MachineElfToolbarTown(town)  {
    alert("You instantiated me successfully!");

    this.me_cities_list = document.getElementById("me_cities_list");

    this.town_hbox = document.createElement("hbox");
    this.town_button = document.createElement("toolbarbutton");
    this.town_button_tooltip = document.createElement("tooltip");
    this.town_button_tooltip_id = "town_tooltip_" + town.id;

    this.remove = function() {
	
    }

}
