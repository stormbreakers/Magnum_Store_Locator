


// geting the user location 
var myLat, myLng, radius;
var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();
var x = document.getElementById("demo");

function map()
{
	mapholder = document.getElementById('mapholder');
	var width = ($(window).width() > 640) ? '50%' : '100%';
	mapholder.style.height='400px';
	mapholder.style.width=width;

	var centerlatlng = new google.maps.LatLng(28.4, 77.2);
	var myOptions = {
		zoom: 10,
		center: centerlatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);

}
google.maps.event.addDomListener(window, 'load', map);

function initialize() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition,showError);
	} else { 
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {

	geocoder = new google.maps.Geocoder();
	var lat = position.coords.latitude;
	var long = position.coords.longitude;
	myLat = lat;
	myLng = long;
	var city=position.coords.locality;

	mapholder = document.getElementById('mapholder');
	var width = ($(window).width() > 640) ? '50%' : '100%';
	mapholder.style.height='400px';
	mapholder.style.width=width;

	var myLatlng = new google.maps.LatLng(lat, long);

	var myOptions = {
		center: myLatlng,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
	// console.log(map);
	geocoder.geocode({'latLng': myLatlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) 
			{
				map.setZoom(13);
				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map
				});
				
				infowindow.setContent(results[1].formatted_address);
				infowindow.open(map, marker);
				
				add = results[2].formatted_address;
				$('#search').attr('value', add);
				$('#mb_ser').attr('value', add);
				var result = results[0];
				var city = "";
				for(var i=0, len=result.address_components.length; i<len; i++) {
					var ac = result.address_components[i];
					if(ac.types.indexOf("locality") >= 0) city = ac.long_name;
				}
				if(city != '') {
					console.log(city);
						if($('#city option[value="'+city+'"].length > 0') || ( $('ul li:contains("'+city+'")').length ))
						{
							$('#city option[value="'+city+'"]').attr('selected', true);
							$('#mb_dec').html('<p id="cit">'+city+'</p>');
						}
				}
			}
			else 
			{
				alert('No results found');
			}
		} else 
		{
			alert('Geocoder failed due to: ' + status);
		}
	});
	
	$.ajax({
		url: 'include/list.php',
	})
	.done(function(data) {
		console.log("success");
		var list =JSON.parse(data);
		for (var i = 0; i < list.length; i++) 
		{
			$('#sel_list').append('<li class="mag_store '+list[i].city+' list_marker_hide"  data-id="'+list[i].store_id+'" id="'+list[i].store_id+'"><div class="grid-100 mobile-grid-100"><div class="grid-15 mobile-grid-15"><img src="assets/images/store_icon.png" height="100%"></div><div class="grid-85 mobile-grid-85"><p>'+list[i].store_name+',</p><p>'+list[i].city+'</p></div></div><input type="hidden" value="'+list[i].lat+'" id="lat"><input type="hidden" id="lng" value="'+list[i].lng+'"></li>');
			var icon = new google.maps.MarkerImage(
            "assets/images/store_marker.png", //url
            new google.maps.Size(15, 39), //size
            new google.maps.Point(0,0), //origin
            new google.maps.Point(3, 13) //anchor 
            );
			var myLatlng = new google.maps.LatLng(list[i].lat, list[i].lng);

			var infowindow = new google.maps.InfoWindow();
		 
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: list[i].store_name,
				icon: icon,
			
			});
			// console.log(marker.title);
			marker.setMap(map);

			google.maps.event.addListener(marker, 'click', (function(marker, i) {
	            return function() {
		                infowindow.setContent(list[i].store_name);
		                //infowindow.open(map, marker);
		               // console.log(list[i].store_id);
									              		
		                /*
		              	var scrollTopValue;
						var a = list[i].store_id;
	     				scrollTopValue = $("#sel_list").find("[data-id='" + a + "']").position().top;			        
						console.log(scrollTopValue);
					    $('#sel_list').scrollTop(scrollTopValue);
					    */
	
						 // $('#sel_list').scrollTop($('#sel_list #HUL-I170107P1240').position().top);
						 // $('#sel_list').scrollTop(100);
		//--------------------------------------------------------------------------------------------------------------------
								
						
/*
					$('.list_marker_hide').css('display','none');
						
					
				        var id ="#"+list[i].store_id;
				        $(id).css('display','block');
				        console.log(id);
*/

			//--------------------------------------------------------------------------------------------------------------------
								
						var container = $('#sel_list'),
						      scrollTo = $("#" + list[i].store_id + "");
						  
						  container.scrollTop(
						      scrollTo.offset().top - container.offset().top + container.scrollTop()
						  );
			
			
//--------------------------------------------------------------------------------------------------------------------
				       /*
				       	var offset = 200;
				        var target = $(id).offset().top - offset;
				        console.log(target);
				        $('#sel_list').animate({scrollTop:target}, 1000);
				        */
					     //  event.preventDefault();
			
	            }
	            })(marker, i));
	        
			

			if ( !isInBound(myLat, myLng, list[i].lat, list[i].lng) ) {
				$('#'+list[i].store_id).hide();
			}

		};
		
		$('.mag_store').click(function(){
			$('.mag_store.active').removeClass('active');  
			$(this).addClass('active'); 
			var lat = $(this).find('#lat').val();
			var lng = $(this).find('#lng').val();
			var myLatlng = new google.maps.LatLng(lat, lng);
			map.setCenter(myLatlng);

		});
		$('#btn_dec, #detect').click(function(){
			$('.preloader').show();
			var myLatlng = new google.maps.LatLng(myLat, myLng);
			map.setCenter(myLatlng);
			$('.preloader').hide();
		});
	    google.maps.event.addListener(map, 'bounds_changed', function() {
			bounds = map.getBounds();
			center = bounds.getCenter();
			listInBound(center.lat(), center.lng());
	    });
		$('#desk_form').submit(function(){
			var city = $(this).find('#city').val();
			var address = $(this).find('#search').val();
			var fullAddress = address.replace(" ", "%20") + "," + city.replace(" ", "%20");
			$('.preloader').show();

			$.ajax({
				url: 'include/search.php',
				data: { fullAddress: fullAddress },
				type: 'GET'
			})
			.done(function(data){
				//console.log(data);
				var results = JSON.parse(data);
				$('.preloader').hide();
				if( results.lat == null || results.lng == null ){
					alert("I'm sorry, your location could not be found. Please try something better.");
				}
				else {
					var myLatlng = new google.maps.LatLng(results.lat, results.lng);
					map.setCenter(myLatlng);
					listInBound(results.lat, results.lng);
				}
			});
			return false;
		});
		
		$('#mobile_form').submit(function(){
			console.log('submit mob');
			var city = $(this).find('li.active').html();
			var address = $(this).find('.mb_ser').val();
			var fullAddress = address.replace(" ", "%20") + "," + city.replace(" ", "%20");
			$('.preloader').show();
			$.ajax({
				url: 'include/search.php',
				data: { fullAddress: fullAddress },
				type: 'GET'
			})
			.done(function(data){
				//console.log(data);
				var results = JSON.parse(data);
				$('.preloader').hide();
				if( results.lat == null || results.lng == null ){
					alert("I'm sorry, your location could not be found. Please try something better.");
				}
				else {
					var myLatlng = new google.maps.LatLng(results.lat, results.lng);
					map.setCenter(myLatlng);
					listInBound(results.lat, results.lng);
				}
			});
			return false;
		});
	})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});

}


function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
		x.innerHTML = "User denied the request for Geolocation."
		break;
		case error.POSITION_UNAVAILABLE:
		x.innerHTML = "Location information is unavailable."
		break;
		case error.TIMEOUT:
		x.innerHTML = "The request to get user location timed out."
		break;
		case error.UNKNOWN_ERROR:
		x.innerHTML = "An unknown error occurred."
		break;
	}
}

function isInBound(lat1, lng1, lat2, lng2){
	var latLng1 = new google.maps.LatLng(lat1, lng1);
	var latLng2 = new google.maps.LatLng(lat2, lng2);
	bounds = map.getBounds();
	center = bounds.getCenter();
	centre = new google.maps.LatLng(center.lat(), center.lng());
	ne = bounds.getNorthEast();
	northeast = new google.maps.LatLng(ne.lat(), ne.lng());
	radius = google.maps.geometry.spherical.computeDistanceBetween(centre, northeast)
	//console.log(radius);
	return google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2) < radius;
}

function listInBound(currentLat, currentLong){
	$('#sel_list li').each(function(){
		var lng = $(this).find('#lng').val();
		var lat = $(this).find('#lat').val();
		if( isInBound(currentLat, currentLong, lat, lng) ){ 
			$(this).fadeIn();
		}
		else {
			$(this).fadeOut();
		}
	});
}

$(document).ready(function() {

	$('#pre').delay('5000').fadeOut('slow', function() {
		$('.hide').fadeIn('slow');
	});


	// desktop dectect location
	$('#btn_dec').click(function(event) {
		initialize();
	});
	
	// mobile detect location
	$('#mb_loc_dec').click(function(event) {
		initialize();
	});

	$('#btn_dec').hover(function() {
		$(this).attr('src', 'assets/images/detect_butt2.png');
	}, function() {
		$(this).attr('src', 'assets/images/detect_butt1.png');
	});

	$('#fake ul li').click(function(){ 
		$('#fake .active').removeClass('active');  
		$(this).addClass('active'); 
	});
	
	$('.ser2').click(function(){ $('#desk_form').submit(); });
	$('.mob_ser2').click(function(){ $('#mobile_form').submit(); });
	
	$('#city').change(function(){
		$('.preloader').show();
		var citySelect = $(this).find(':selected').val();
		$('#sel_list li').fadeOut();
		$('.'+citySelect).fadeIn();
		$('.preloader').hide();
	});

	// ajax call for php
	$.ajax({
		url: 'include/select.php'
	})
	.done(function(data) {
		var cities = JSON.parse(data);
		for (var i = 0; i < cities.length; i++) {
			$('#city').append('<option value="'+cities[i]+'">'+cities[i]+'</option>');
			$('#fake ul').append('<li id="'+cities[i]+'">'+cities[i]+'</li>');
		};
		$('#fake ul li').click(function(){
			$('.preloader').show();
			$('.active').removeClass('active');
			$(this).addClass('active');
			var citySelect = $(this).html();
			$('#sel_list li').fadeOut();
			$('.'+citySelect).fadeIn();
			$('.preloader').hide();
		});
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

	$('#fake ul').hide();
		
	$('#mb_dec').click(function() {
		$('#fake ul').toggle();
	});

});
