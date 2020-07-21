var map = L.map("map", {scrollWheelZoom: false, doubleClickZoom:false, dragging:false, attributionControl:false, zoomControl: false, boxZoom: false, keyboard: false, minZoom: 6});
var stateBounds = [[39.7198679675183,-80.519403116006],[42.2694084526984,-74.6895623877914]];
map.fitBounds(stateBounds);

$(window).resize(function(){
	map.fitBounds(stateBounds);
	drawCharts();
});

function highlightFeature(e) {
	var layer = e.target;
    layer.setStyle({
        weight: 3.5
    });
    layer.bringToFront();
}

function resetHighlight(e) {
    layerCounty.resetStyle(e.target);
}

function fillColor(PP){
	if (PP === "21" || PP === "4" || PP === "18" || PP === "1" || PP === "2" || PP === "10"){return "#195e86";}
	if (PP === "5" || PP === "12" || PP === "20" || PP === "9" || PP === "11" || PP === "22"){return "#9cd4e0";}
	if (PP === "15" || PP === "8" || PP === "6" || PP === "24" || PP === "13" || PP === "14"){return "#f79320";}
	else {return "#9b9da0";}
}

function countyStyle(feature){
	return {"color": "#195e86", "weight": 1.5, "opacity": 1, "fillColor": fillColor(feature.properties.P), "fillOpacity": 0.65};
} 

var layerCounty = L.geoJson(null, {
	style:countyStyle,
	onEachFeature: function(feature, layer) {
		layer.bindTooltip(function(e){
				var lowerCase = e.feature.properties.CO.toLowerCase();
				var correctCase = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
				if (correctCase === "Mckean"){
					correctCase = "McKean";
				}
				return correctCase + " County";
			},{sticky: true, className: "map-tool-tip"});
		if (!L.Browser.edge){	
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: showProjectsList
			});
		}
		else {
			layer.on({
				click: showProjectsList
			});
		}
	}
}).addTo(map);

function showProjectsList(e) {
	$("#map").slideUp();
	$("#list-div").slideDown();
	var projects = getProjects(e.target.feature.properties.CO, e.target.feature.properties.P);
	var uniqueProjects = getUniqueProjectArr(projects);
	makeListofUniqueProjects(uniqueProjects);
}

function getProjects(county, mpo){
	var newData = [];
	var len = data.length;
	for (i = 0; i < len; i++) {
		if (county === data[i].C.toUpperCase() || data[i].C === "Central Office"){			
			if (mpo === data[i].M){
				newData.push(data[i]);
			}
		}
	}
	return newData;
}

function getUniqueProjectArr(data){
	function removeDup(e,i,a){
		if (i === 0){
			return e;
		}
		else if (e.Z != a[i - 1].Z){
			return e;
		}
	}
	var filtered = data.filter(removeDup);
	return filtered;
}

function getSingleProjectData(mpms){
	var project = data.filter(function(e){
		return e.Z === mpms;
	});
	return project;
}

function currencyFormat(value){
	if (value === 0){return value;}
	else {return "$" + value.toLocaleString();}
}

function getListIcon(mode){
	if (mode == "A"){return "<i class='fa fa-plane' aria-hidden='true'></i>";}
	if (mode == "H"){return "<i class='fa fa-road' aria-hidden='true'></i>";}
	if (mode == "R"){return "<i class='fa fa-train' aria-hidden='true'></i>";}
	if (mode == "T"){return "<i class='fa fa-bus' aria-hidden='true'></i>";}
	else {return "<i class='fa fa-circle' aria-hidden='true'></i>";}
}

function makeListofUniqueProjects(data,mpo){
	var len = data.length;
	$("#list-div").empty();
	var regionCode = data[0].M;
	var regionName = "";
	for (var i = 0; i < dataPP.length; i++){
		if(regionCode === dataPP[i].CODE){
			regionName = dataPP[i].MPO;
		}
	}
	//CHECK TO SEE IF SECOND ARGUMENT WAS PASSED INTO THE FUNCTION
	if (mpo === undefined){
		//IF STATEMENT EXCEPTION FOR SINGLE COUNTY MPOs
		if (data[0].C === "Adams" || data[0].C === "Franklin" || data[0].C === "York" || data[0].C === "Lancaster" || data[0].C === "Berks" || data[0].C === "Lebanon" || data[0].C === "Blair" || data[0].C === "Centre" || data[0].C === "Cambria" || data[0].C === "Wayne" || data[0].C === "Erie" || data[0].C === "Mercer" || data[0].C === "Lycoming"){
			$("#list-div").append("<div class='w3-center w3-large w3-text-orange' style='padding-bottom:4px;'>" + regionName + "'s TYP Projects<br><span class='w3-small w3-text-blue'>Interstate and Statewide projects are grouped separately</span></div>");
		}
		else {
			$("#list-div").append("<div class='w3-center w3-large w3-text-orange' style='padding-bottom:4px;'>" + data[0].C + " County<br>" + regionName + "'s TYP Projects<br><span class='w3-small w3-text-blue'>Interstate and Statewide projects are grouped separately</span></div>");
		}
	}
	else {
		if (mpo == "98"){
			regionName = "Interstate";
		}
		else {
			regionName = "Statewide";
		}
		$("#list-div").append("<div class='w3-center w3-large w3-text-orange' style='padding-bottom:4px;'>" + regionName + " TYP Projects</div>");
	}
	//SEARCHBAR ROW
	$("#list-div").append('<div class="w3-bar"><input type="text" class="w3-bar-item w3-input w3-border w3-border-blue" id="search-input" style="width: calc(100% - 93px);border-right-style: none!important;" placeholder="Search by Project ID or Title..."><div class="w3-bar-item w3-button w3-border w3-border-blue w3-right" id="return-to-map" title="return to map"><i class="fa fa-map" aria-hidden="true"></i></div><div class="w3-button w3-border w3-border-blue w3-right" id="clear-list" style="border-left-style: none!important;border-right-style: none!important;" title="clear search"><i class="fa fa-times" aria-hidden="true"></i></div></div>'); 
	//PROJECT LIST CONTAINER AND CONTENTS
	$("#list-div").append("<div class='list-container'></div>");
	for (var i = 0; i < len; i++) {
		$(".list-container").append("<div class='list-item open-modal'>" + getListIcon(data[i].O) + "&nbsp;&nbsp" + data[i].Z + " - " + data[i].T + "</div>");
	}
	//ADD PADDING FOR INTERNET EXPLORER
	if (L.Browser.ie){
		$("#search-input").css("padding-bottom", "14px");
	}
	//EVENTS ON DOM ELEMENTS CREATED IN THIS LIST
	$("#search-input").keyup(function(){
		var value = $("#search-input").val().toUpperCase();
		var li = $(".list-container").children();
		for (var i = 0; i < li.length; i++) {
			var item = li[i].innerText.toUpperCase();
			if (item.indexOf(value) > -1) {
				li[i].style.display = "";
			} else {
				li[i].style.display = "none";

			}
		}
	});
	$("#clear-list").click(function(){
		var li = $(".list-container").children();
		$("#search-input").val("");
		for (var i = 0; i < li.length; i++) {
			li[i].style.display = "";
		}
	});
	$("#return-to-map").click(function(){
		$("#list-div").slideUp();
		$("#map").slideDown();
		map.invalidateSize();
		map.fitBounds(stateBounds);
	});
	$(".open-modal").click(function(e){
		$("#modal-mpms").show();
		var p = this.textContent;
		var m = p.split(" - ");
		var numb = Number(m[0]);
		var singleProjectData = getSingleProjectData(numb);
		getModalContent(singleProjectData);
	});
}

function getModalContent(singleProjectArray){
	//SORT SINGLE PROJECT ARRAY BASED ON PERIOD TO HAVE IT DRAW IN ORDER
	singleProjectArray.sort(function(a,b){return a.P - b.P});
	$("#modal-mpms-content").empty();
	$("#modal-mpms-content")
	.append("<h4 class='w3-text-orange'>Project ID " + singleProjectArray[0].Z + " - " + singleProjectArray[0].T + "</h4>")
	.append("<div class='w3-responsive w3-card'><table class='w3-table-all modal-table'><tr class='w3-blue'><th title='four year period'>Period</th><th title='study or research project'>Study</th><th title='preliminary engineering'>PE</th><th title='final design'>FD</th><th title='utility changes'>UTL</th><th title='right-of-way phase'>ROW</th><th title='construction phase'>CON</th><th title='planning and research or administrative project'>PRA</th><th title='total project cost'>Total</th></tr></table></div>");
	for (i = 0; i < singleProjectArray.length; i++) {
		var p = singleProjectArray[i].P;
		if (p === 1){p = "First";}
		else if (p === 2){p = "Second";}
		else if (p === 3){p = "Third";}
		var total = singleProjectArray[i].S + singleProjectArray[i].PE + singleProjectArray[i].FD + singleProjectArray[i].UTL + singleProjectArray[i].ROW + singleProjectArray[i].CON + singleProjectArray[i].PRA;
		//TABLE CONTENT
		$(".modal-table").append("<tr><td>" + p + "</td><td>" + currencyFormat(singleProjectArray[i].S) + "</td><td>" + currencyFormat(singleProjectArray[i].PE) + "</td><td>" + currencyFormat(singleProjectArray[i].FD) + "</td><td>" + currencyFormat(singleProjectArray[i].UTL) + "</td><td>" + currencyFormat(singleProjectArray[i].ROW) + "</td><td>" + currencyFormat(singleProjectArray[i].CON) + "</td><td>" + currencyFormat(singleProjectArray[i].PRA) + "</td><td>" + currencyFormat(total) + "</td></tr>");
	}
	var improvement = "";
	if (singleProjectArray[0].I === ""){
		improvement = "None";
	}
	else{
		improvement = singleProjectArray[0].I;
	}
	var regionCode = singleProjectArray[0].M;
	var regionName = "";
	for (var i = 0; i < dataPP.length; i++){
		if (regionCode === "98"){
			regionName = "Interstate";
		}
		else if (regionCode === "99"){
			regionName = "Statewide";
		}
		else if(regionCode === dataPP[i].CODE){
			regionName = dataPP[i].MPO;
		}
	}
	$("#modal-mpms-content").append("<p><strong>Improvement Type:</strong> " + improvement + "<br><strong>Planning Region:</strong> " + regionName + "</p>");
	$("#modal-mpms-content").append("<div id='modal-map' style='height:250px;margin-bottom:16px;'><i class='fa fa-spinner fa-spin fa-5x fa-fw map-load-spinner' aria-hidden='true'></i></div>");
	$("#project-report-button").attr("href", "https://gis.penndot.gov/paprojects/Reports/ProjectReport.aspx?ProjectID=" + singleProjectArray[0].Z + "&ReportType=Project");
	var modalMap = L.map("modal-map", {scrollWheelZoom: false, boxZoom: false, keyboard: false});
	var streetsBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {attribution: "<a href='http://www.esri.com/'>esri</a>", detectRetina:true});
	modalMap.addLayer(streetsBasemap).fitBounds(stateBounds);
	modalMap.dragging.disable();
	modalMap.touchZoom.disable();
	modalMap.doubleClickZoom.disable();
	//ASSEMBLE THE SERVICE REQUESTS TO POINT AND LINE FEATURES
	var service = "https://services1.arcgis.com/jOy9iZUXBy03ojXb/ArcGIS/rest/services/Projects/FeatureServer/";
	var query = "/query?geometryPrecision=4&outFields=PROJECT_ID&outSR=4326&f=geojson&where=PROJECT_ID=" + singleProjectArray[0].Z;
	var dataPoints = service + "0" + query;
	var dataLines = service + "1" + query;
	
	//LAYERS FOR HOLDING ACUAL GEOMETRY
	var layerLines = L.geoJson(null);
	var layerPts = L.geoJson(null);
	
	$.when(
		$.getJSON(dataLines, function(data) {
			if (data.features.length > 0){
				if (data.features[0].geometry != null){
					layerLines.addData(data);
				}
			}
		}),
		$.getJSON(dataPoints, function(data) {
			if (data.features.length > 0){
				layerPts.addData(data);
			}
		})
	).then(function() {
		//modalMap.addLayer(layerLines).addLayer(layerPts);
		$(".map-load-spinner").fadeOut();
		function flyAddProject(projectData){
			var layerDisplay = L.geoJson(projectData, {style:{color: "#1c5d88",interactive: false}});
			modalMap.flyToBounds(layerDisplay.getBounds(), {maxZoom: 13});
			modalMap.once("zoomend", function(){
				layerDisplay.addTo(modalMap);
				$("g").css("opacity", 0);
				$("g").animate({opacity: 1}, 250);
				modalMap.dragging.enable();
				modalMap.touchZoom.enable();
				modalMap.doubleClickZoom.enable();
			});
		}
		if (layerLines.toGeoJSON().features.length > 0){
			var lnBuff = turf.buffer(layerLines.toGeoJSON(), 0.15, {units: "miles"});
			var a = [];
			turf.featureEach(lnBuff, function (current, index) {
				a.push(current);
			});
			var union = turf.union.apply(turf, a);
			flyAddProject(union);
		}
		else if (layerPts.toGeoJSON().features.length > 0){
			var ptsBuff = turf.buffer(layerPts.toGeoJSON(), 0.15, {units: "miles"});
			var dissolved = turf.dissolve(ptsBuff);
			flyAddProject(dissolved);
		}
		else {
			$("#modal-map").html("<p class='w3-center'>No map data available</p>").animate({height: "42px"});
		}
	});

}
//CLOSE ALL PROJECT MODALS
$(".close-modal").click(function(){
	$(".w3-modal").hide();
});

//EVENT FOR VIEW INTERSTATE TYP
$("#view-interstate-typ").click(function(){
	showSpecialProjectsList("98");
});
//EVENT FOR VIEW STATEWIDE TYP
$("#view-statewide-typ").click(function(){
	showSpecialProjectsList("99");
});

function getSpecialProjects(mpo){
	var newData = [];
	var len = data.length;
	for (i = 0; i < len; i++) {
		if (mpo === data[i].M){
			newData.push(data[i]);
		}
	}
	return newData;
}
function showSpecialProjectsList(mpo) {
	$("#map").slideUp();
	$("#list-div").slideDown();
	var projects = getSpecialProjects(mpo);
	var uniqueProjects = getUniqueProjectArr(projects);
	makeListofUniqueProjects(uniqueProjects, mpo);
}
//GET TO KNOW START
var mpoMap = L.map("mpoMap", {scrollWheelZoom: false, doubleClickZoom:false, dragging:false, attributionControl:false, zoomControl: false, boxZoom: false, keyboard: false});
mpoMap.fitBounds(stateBounds);
function countyStyle2(feature){
	return {"color": "#fff", "weight": 1, "opacity": 1, "fillColor": fillColor(feature.properties.P), "fillOpacity": 0.8};
}

function resetHighlightGetToKnow(e) {
    layerCounty2.resetStyle(e.target);
}

function showGetToKnowModal(e) {
	$("#modal-get-to-know").show();
	var lowerCase = e.target.feature.properties.CO.toLowerCase();
	var district = e.target.feature.properties.D;
	var correctCase = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
	if (correctCase === "Mckean"){
		correctCase = "McKean";
	}
	var mpoData = {};
	var len = dataPP.length;
	for (i = 0; i < len; i++) {
		if (e.target.feature.properties.P === dataPP[i].CODE){
			mpoData = dataPP[i];
		}
	}
	$("#modal-get-to-know-content").empty();
	if (mpoData.CODE === "17"){
		$("#modal-get-to-know-content").append("<p>"  + correctCase + " County is part of...</p><h4 class='w3-text-orange'>" + mpoData.MPO + "</h4><p>" + mpoData.Name + "<br>" + mpoData.ADDRESS_1 + "<br>" + mpoData.ADDRESS_2 + "<br>" + mpoData.PHONE + "<br><br>" + mpoData.Luz_Name + "<br>" + mpoData.Luz_ADDRESS_1 + "<br>" + mpoData.Luz_ADDRESS_2 + "<br>" + mpoData.Luz_PHONE +  "<br>" + mpoData.LINK + "</p><p>" + correctCase + " County is also part of <a href='https://www.penndot.gov/RegionalOffices/district-" + district + "/Pages/default.aspx' target='_blank'>PennDOT Engineering District " + district + "</a>.</p>");
	}
	else {
		$("#modal-get-to-know-content").append("<p>"  + correctCase + " County is part of...</p><h4 class='w3-text-orange'>" + mpoData.MPO + "</h4><p>" + mpoData.Name + "<br>" + mpoData.ADDRESS_1 + "<br>" + mpoData.ADDRESS_2 + "<br>" + mpoData.PHONE + "<br>" + mpoData.LINK + "</p><p>" + correctCase + " County is also part of <a href='https://www.penndot.gov/RegionalOffices/district-" + district + "/Pages/default.aspx' target='_blank'>PennDOT Engineering District " + district + "</a>.</p>");
	}
}

var layerCounty2 = L.geoJson(null, {
	style:countyStyle2,
	onEachFeature: function(feature, layer) {
		layer.bindTooltip(function(e){
				var lowerCase = e.feature.properties.CO.toLowerCase();
				var correctCase = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
				if (correctCase === "Mckean"){
					correctCase = "McKean";
				}
				return correctCase + " County";
			},{sticky: true, className: "map-tool-tip"});
		if (!L.Browser.edge){	
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlightGetToKnow,
				click: showGetToKnowModal
			});
		}
		else {
			layer.on({
				click: showGetToKnowModal
			});
		}
	}
}).addTo(mpoMap);
//GET TO KNOW END

//GET COUNTY DATA ASYNC 
$.getJSON("assets/county.json", function(data) {
	layerCounty.addData(data);
	layerCounty2.addData(data);
});
//GET PP DATA
var dataPP = [];
$.getJSON("assets/pp.json", function(d) {
	dataPP = d;
});
//GET PROJECTS DATA
var data = [];
$.getJSON("assets/data.json", function(d) {
	data = d;
});
//QUE UP SERVICES
$.getJSON("https://services1.arcgis.com/jOy9iZUXBy03ojXb/ArcGIS/rest/services/Projects/FeatureServer/0/query?geometryPrecision=4&outFields=PROJECT_ID&outSR=4326&f=geojson&where=PROJECT_ID=0", function(data){return data;});
$.getJSON("https://services1.arcgis.com/jOy9iZUXBy03ojXb/ArcGIS/rest/services/Projects/FeatureServer/1/query?geometryPrecision=4&outFields=PROJECT_ID&outSR=4326&f=geojson&where=PROJECT_ID=0", function(data){return data;});







