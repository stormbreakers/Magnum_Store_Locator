<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
	<!--[if lt IE 9]>
  <script src="./assets/javascripts/html5.js"></script>
  <![endif]-->
  <!-- <script src="./assets/javascripts/jquery.js"></script> -->

  <link rel="stylesheet" href="assets/stylesheets/demo.css" />
  <link rel="stylesheet" href="assets/stylesheets/unsemantic-grid-base.css" />
  <noscript>
  	<link rel="stylesheet" href="assets/stylesheets/unsemantic-grid-mobile.css" />

  </noscript>
  <link rel="stylesheet" href="assets/stylesheets/magnum.css" />
  <script>
  	var ADAPT_CONFIG = {
  		path: 'assets/stylesheets/',
  		dynamic: true,
  		range: [
  		'0 to 640px = unsemantic-grid-mobile.css',
  		'640px = unsemantic-grid-desktop.css'
  		]
  	};
  </script>
  
  <script src="assets/javascripts/adapt.min.js"></script>
  <script src="assets/javascripts/jquery.js"></script>
  <script src="http://maps.google.com/maps/api/js?key=AIzaSyBycD3e5OTgvCAg7sytQ-xVDnDHqfweLF8&libraries=places,visualization,geometry&sensor=false"></script>
  <script src="assets/javascripts/magnum.js"></script>
  <title>Store Locator</title>
</head>


<body>
<div id="pre"><img src="assets/images/pre_loader.GIF" alt=""></div>
<div class="grid-container hide" style="padding:0;">
	<div class="grid-100 mobile-grid-100 clearfix" >
		<div class="grid-100 mobile-grid-100 header">
			<img src="assets/images/logo.png" class="mag prefix-40 mobile-prefix-25 grid-20 mobile-grid-50" alt="">
			<a href="javascript:void(0);"><img src="assets/images/fb.png" class="fb grid-5 mobile-grid-10" alt=""></a>
			<a href="javascript:void(0);"><img src="assets/images/m_twt_img.png" class="tw grid-5 mobile-grid-10" alt=""></a>

		</div>

		<div class="grid-100 bg mobile-grid-100 clearfix map_h " style="">

			<div class="grid-80 mobile-grid-100 clearfix prefix-10">
				<div class="grid-100 hide-on-mobile" style="padding-top: 2%">
					<div class="grid-20">
						<img src="assets/images/detect_butt1.png" id="btn_dec" alt="" width="100%">
					</div>
					<form id="desk_form" action="#">
					
						<div class="grid-25 prefix-5">
							<!-- <img src="assets/images/detect_butt1.png" alt="" width="100%"> -->
							<select name="city" id="city">
								<option value="default">Select City</option>
							</select>
						</div>
						<div class="grid-40 prefix-5 wrapper">
								<img src="assets/images/search_icon.png" class="ser1" alt="">
								<input type="text" class="search" id="search" />
								<img src="assets/images/go_icon.png" alt="" class="ser2">
						</div>
						
					</form>
					
				</div>

				<div class="mobile-grid-100 clearfix hide-on-desktop">
					<div class="mobile-grid-33 clearfix">
						<img src="assets/images/mobile_detect_butt.png" class="mb_dec" id="mb_loc_dec" alt="">
					</div>
					<form id="mobile_form">
					
						<div class="mobile-grid-33 clearfix">
							<img src="assets/images/mobile_select_icon.jpg" class="mb_dec" id="mb_dec" alt="">
							<div id="fake">
								<ul>

								</ul>
							</div>
						</div>
						<div class="mobile-grid-33 clearfix" style="overflow-x: hidden">
							<input type="text" name="" id="mb_ser" placeholder="Search" class="mb_ser" />
							
						</div>
						
					</form>
				</div>

				<div class="grid-100 mobile-grid-100	">
					<div class="grid-100 mobile-grid-100" style="margin-top:2%;">
						<div class="grid-50 mobile-grid-100 map_div" id="mapholder" >
							
						</div>
						<div class="grid-45 prefix-5 lst mobile-grid-100">
							<ul id="sel_list">
								
							</ul>
						</div>
					</div>
				</div>

			</div>
			<div class="preloader">
				<img src="assets/images/loader.gif"></img>
			</div>
		</div>
		</div>
	</body>
	</html>
