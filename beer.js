	$(function() {
		var monthNames = [ "January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December" ];
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
						var data = '<div id="BeerPic"><img src="/kegerface/images/SRM '+ beerinfo[0] +'.png" height="150"></div>';
						data += '<div class="beer-info"><h1>' + beerinfo[1] + '</h1> <h2>' + beerinfo[2] + ' <br /></h2></div>';
						data += '<div id="BeerInfo">' + beerinfo[3] + '<br /><h2>ABV</h2><img src="/kegerface/images/'+ beerinfo[4] +' Hops.png" width="200"></div>';
						data += '<div id="BeerStatus"><img src="/kegerface/images/kegs/'+ beerinfo[5] +'.png" width="80"></div>';
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