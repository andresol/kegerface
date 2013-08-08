var monthNames = [ "January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December" ];
$(function() {
	var now = new Date();
	var time = monthNames[now.getMonth()] + ', ' + now.getDate() + ' ' + now.getFullYear();
	$('#time').html(time);
	$.ajaxSetup({ cache: false });
	update();
	function update() {
		$.ajax({
			url: 'beers.csv',
			dataType: 'text',
			success: function(data, textStatus, jqXHR){
				var items = data.split("\n");
				var i = items.length;
				var result = new Array(i);
				while(i--) {
					var beerinfo = items[i].split(",");
					var data = '<div id="BeerPic"><img src="/kegerface/images/SRM '+ getSRMPicture(beerinfo[0]) +'.png" height="150"></div>';
					data += '<div class="beer-info"><h1>' + beerinfo[1] + '</h1> <h2>' + beerinfo[2] + ' <br /></h2></div>';
					data += '<div id="BeerInfo">' + beerinfo[3] + '<br /><h2>ABV</h2><img src="/kegerface/images/'+ beerinfo[4] +' Hops.png" width="200"></div>';
					data += '<div id="BeerStatus"><img src="/kegerface/images/kegs/'+ getKegPicture(beerinfo[5]) +'.png" width="80"></div>';
					result.push(data);
				}
					
				var html = '';
				for (var ii = result.length; ii >= 0; ii--) {
					if (result[ii]) {
						html += '<div class="content-row '+ (ii == 2 ? 'first' : '') +'">'+ result[ii] + '</div>';
					}
				}
				$('#content').html(html);
			}			
		});
		setTimeout(update, 30000);
	}
});

function getSRMPicture(srm) {
	var result = 1;
	if ($.isNumeric(srm)) {
		if (srm <= 3) {
			result = 1;
		} else if (srm > 3 && srm < 7) {
			result = 5;
		} else if (srm < 13) {
			result = 10;
		} else if (srm < 23) {
			result = 20;
		} else if (srm < 28) {
			result = 25;
		} else if (srm < 28) {
			result = 30;
		} else if (srm < 37) {
			result = 36;
		} else if (srm < 41){
			result = 40;
		} else {
			result = 45;
		}
	} 
	return result;
}

function getKegPicture(fillFactor) {
	var result = 101;
	if ($.isNumeric(fillFactor)) {
		if (fillFactor < 5) {
			result = 0;
		} else if (fillFactor < 17) {
			result = 10;
		} else if (fillFactor < 30) {
			result = 25;
		} else if (fillFactor < 55) {
			result = 50;
		} else if (fillFactor < 80) {
			result = 75;
		} else if (fillFactor <= 100) {
			result = 100;
		}
	}
	return result;
}