// Toggle between showing and hiding the sidebar when clicking the menu icon
var sidebar = document.getElementById("sidebar");
function w3_open() {
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
    } else {
        sidebar.style.display = "block";
    }
}
//CLOSE SIDEBAR 
function w3_close() {
    sidebar.style.display = "none";
}
//PAGE DOWN ON ANCHOR TAGS
$("a").on("click", function(event){
	if (this.hash !== "") {
	  event.preventDefault();
	  var hash = this.hash;
	  $("html, body").animate({
		scrollTop: $(hash).offset().top
	  }, 800, function(){
		// Add hash (#) to URL when done scrolling (default click behavior)
		window.location.hash = hash;
	  });
	}
});
//TOGGLE ACCORDIONS
$(".accordion").click(function(){
    $(this).toggleClass("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
});
//AIRPLANE ANIMATION AND PARALAX ON EDGE OR CHROME OR FIREFOX DESKTOP ONLY
if ((L.Browser.edge || L.Browser.chrome || L.Browser.gecko) && !L.Browser.mobile){
	$(".bgimg")
	.css("background-attachment", "fixed")
	.css("background-repeat", "no-repeat");
	//NO PLANE FLY FOR FIREFOX
	if (!L.Browser.gecko){
		$(".bg4")
		.css("background-image", 'url("img/airplane.png"),url("img/bg4a.jpg")')
		.css("background-size", "50%, cover")
		.css("animation", "plane 10s infinite linear");
	}
}
//KEY TO TYP MODAL
$("#key-to-the-typ-open").click(function(){
	$("#key-to-the-typ").show();
});
//THUMBNAILS
$(".thumbnail").click(function(){
	$("#img").attr("src", this.src);
	$("#modal-thumb").css("display", "block");
	$("#caption").html(this.alt);
});
//CHART
google.charts.load("current", {"packages":["corechart"]});
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {

var formatter = new google.visualization.NumberFormat({
      fractionDigits: 0,
      prefix: '$'
    });

var darkblue = "#203062";
var gray = "#9b9da0";
var orange = "#f79320";
var blue = "#195e86";
var green = "#4e988c";
var lightblue = "#9cd4e0";

//PIE CHART
var pieData = google.visualization.arrayToDataTable([
  ["MODE", "VALUE"],
  ["Highway/Bridge", 34620],
  ["Aviation", 384],
  ["Multimodal", 1058],
  ["Rail Freight",  686],
  ["Transit",  27202],
]);
formatter.format(pieData, 1);

var pieOptions = {
  height: 400,
  colors: [blue,lightblue,green,gray,orange],
  backgroundColor: "transparent",
  is3D: true,
  legend: {textStyle:{color:"#fff",fontSize:16},alignment: "center"},
  chartArea: {top:0, height:"100%", width:600},
  tooltip: {text:"both", isHtml: false, textStyle: {color: darkblue}}
};
var pie = new google.visualization.PieChart(document.getElementById("pie-chart-funding-by-mode"));
pie.draw(pieData, pieOptions);

}


