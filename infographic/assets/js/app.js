

        var paper, map, car, thruster, moon, flight_path, flight_path_length, last_point;

        window.onload = function () {
            paper               = map;
            map                 = Snap('#svg-doc');
            car           = map.select('#car');
            carbbox       = car.getBBox();
            thruster            = map.select('#flags');
			shadow       = map.select('#shadows');
            flight_path         = map.path('M96.2,0L96.2 145.4 878.9 145.4 878.9 260.3 478.3 260.3 478.3 475.6 810.7 475.6 810.7 598.4 91 598.4 91 831.1 1068.1 831.1 1068.1 118.6 1845.9 118.6 1845.9 227.4 1575.6 227.4 1575.6 485.2 1187.9 485.2 1187.9 733.1 1832.8 734.1 1832.8 862 ').attr({ 'fill': 'none', 'stroke': '2'});

            flight_path_length  = Snap.path.getTotalLength(flight_path);
            last_point          = flight_path.getPointAtLength(flight_path_length);
			
			            // starting the thruster animation
            animate_thruster_down();
			//animate_shadow_down();

		
		$( ".begin" ).click(function(){
						$( "#intro" ).remove();
						$( ".modal-overlay" ).css({ "display": "block"});
		});
		
		
		
		
		
		$( "#step1go" ).click(function(){
			$( ".modal-overlay" ).remove();
			Snap.animate(0, flight_path_length*.07, function( step ) { 
                       moveToPoint = Snap.path.getPointAtLength( flight_path, step );
                       x = moveToPoint.x - (carbbox.width/2);
                       y = moveToPoint.y - (carbbox.height/2);
                       car.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha + 90)+', '+carbbox.cx+', '+carbbox.cy+')');
                   },2800, mina.easeout ,function(){
					   
                      open_slide("#report");
                   });
		});
		


		$( "#step2go" ).click(function(){
						close_slide("#report");
						Snap.animate(flight_path_length*.07, flight_path_length*.23, function( step ) {
                       moveToPoint = Snap.path.getPointAtLength( flight_path, step );
                       x = moveToPoint.x - (carbbox.width/2);
                       y = moveToPoint.y - (carbbox.height/2);;
                       car.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha + 90)+', '+carbbox.cx+', '+carbbox.cy+')');
                   },4200, mina.easeout ,function(){
					   
                       open_slide("#identify");
                   });
		});
		
				$( "#step3go" ).click(function(){
						close_slide("#identify");
						Snap.animate(flight_path_length*.23, flight_path_length*.33, function( step ) {
                       moveToPoint = Snap.path.getPointAtLength( flight_path, step );
                       x = moveToPoint.x - (carbbox.width/2);
                       y = moveToPoint.y - (carbbox.height/2);;
                       car.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha + 90)+', '+carbbox.cx+', '+carbbox.cy+')');
                   },2800, mina.easeout ,function(){
					   
                       open_slide("#share");
                   });
		});
		
				$( "#step4go" ).click(function(){
						close_slide("#share");
						Snap.animate(flight_path_length*.33, flight_path_length*.43, function( step ) {
                       moveToPoint = Snap.path.getPointAtLength( flight_path, step );
                       x = moveToPoint.x - (carbbox.width/2);
                       y = moveToPoint.y - (carbbox.height/2);;
                       car.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha + 90)+', '+carbbox.cx+', '+carbbox.cy+')');
                   },2800, mina.easeout ,function(){
					   
                       open_slide("#plan");
                   });
		});
		
				$( "#step5go" ).click(function(){
						close_slide("#plan");
						Snap.animate(flight_path_length*.43, flight_path_length*.50, function( step ) {
                       moveToPoint = Snap.path.getPointAtLength( flight_path, step );
                       x = moveToPoint.x - (carbbox.width/2);
                       y = moveToPoint.y - (carbbox.height/2);;
                       car.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha + 90)+', '+carbbox.cx+', '+carbbox.cy+')');
                   },2800, mina.easeout ,function(){
					   
                       open_slide("#submit");
                   });
		});
		
						$( "#step6go" ).click(function(){
						close_slide("#submit");
						Snap.animate(flight_path_length*.50, flight_path_length*.63, function( step ) {
                       moveToPoint = Snap.path.getPointAtLength( flight_path, step );
                       x = moveToPoint.x - (carbbox.width/2);
                       y = moveToPoint.y - (carbbox.height/2);;
                       car.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha + 90)+', '+carbbox.cx+', '+carbbox.cy+')');
                   },2800, mina.easeout ,function(){
					   
                       open_slide("#review");
                   });
		});
		
						$( "#step7go" ).click(function(){
						close_slide("#review");
						Snap.animate(flight_path_length*.63, flight_path_length*.77, function( step ) {
                       moveToPoint = Snap.path.getPointAtLength( flight_path, step );
                       x = moveToPoint.x - (carbbox.width/2);
                       y = moveToPoint.y - (carbbox.height/2);;
                       car.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha + 90)+', '+carbbox.cx+', '+carbbox.cy+')');
                   },2800, mina.easeout ,function(){
					   
                       open_slide("#endorse");
                   });
		});
		
				
						$( "#step8go" ).click(function(){
						close_slide("#endorse");
						Snap.animate(flight_path_length*.77, flight_path_length*.84, function( step ) {
                       moveToPoint = Snap.path.getPointAtLength( flight_path, step );
                       x = moveToPoint.x - (carbbox.width/2);
                       y = moveToPoint.y - (carbbox.height/2);;
                       car.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha + 90)+', '+carbbox.cx+', '+carbbox.cy+')');
                   },2800, mina.easeout ,function(){
					   
                       open_slide("#present");
                   });
		});
		
						$( "#step9go" ).click(function(){
						close_slide("#present");
						Snap.animate(flight_path_length*.84, flight_path_length*.91, function( step ) {
                       moveToPoint = Snap.path.getPointAtLength( flight_path, step );
                       x = moveToPoint.x - (carbbox.width/2);
                       y = moveToPoint.y - (carbbox.height/2);;
                       car.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha + 90)+', '+carbbox.cx+', '+carbbox.cy+')');
                   },2800, mina.easeout ,function(){
					   
                       open_slide("#federal");
                   });
		});
		
						$( "#step10go" ).click(function(){
						close_slide("#federal");
						Snap.animate(flight_path_length*.91, flight_path_length*.95, function( step ) {
                       moveToPoint = Snap.path.getPointAtLength( flight_path, step );
                       x = moveToPoint.x - (carbbox.width/2);
                       y = moveToPoint.y - (carbbox.height/2);;
                       car.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha + 90)+', '+carbbox.cx+', '+carbbox.cy+')');
                   },2800, mina.easeout ,function(){
                       open_slide("#projects");
                   });
		});
		
						
			$( "#endgo" ).click(function(){
						close_slide("#projects");
						Snap.animate(flight_path_length*.95, flight_path_length, function( step ) {
                       moveToPoint = Snap.path.getPointAtLength( flight_path, step );
                       x = moveToPoint.x - (carbbox.width/2);
                       y = moveToPoint.y - (carbbox.height/2);;
                       car.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha + 90)+', '+carbbox.cx+', '+carbbox.cy+')');
                   },2000, mina.easeout ,function(){
					   //TO DO figure out ending
                       open_slide("#end");
					   $("#end-overlay").addClass("modal-overlay");
					   $( ".modal-overlay" ).css({ "display": "block"});
                   });
		});
		
        };

		
		function  open_slide(slide) {
			$(slide)
			.css('z-index', 42)
			.animate({
				opacity: 1,
				
			  }, 500, function() {
				// Animation complete.
			  });
		}
		
		function  close_slide(slide) {
			$(slide)

			.animate({
				opacity: 0,
				
			  }, 500, function() {
				$(slide).css('z-index', -1)
			  });
		}
	
        function ship_move_up(){
            car.animate({'transform': 'translate(' + (last_point.x - (carbbox.width/2)) + ',' + (last_point.y - (carbbox.height / 2) - 20) + ')'},1300, function(){
                ship_move_down();
            });
        }
        function ship_move_down(){
            car.animate({'transform': 'translate(' + (last_point.x - (carbbox.width/2)) + ',' + (last_point.y - (carbbox.height / 2)) + ')'},1100, function(){
                ship_move_up();
            });
        }

        function animate_thruster_up(){
			thruster.animate({'transform': 'translate(0,-2)'},800, function(){
                animate_thruster_down();
            });

        }
        function animate_thruster_down(){
            thruster.animate({'transform': 'translate(0,0)'},800, function(){
                animate_thruster_up();
            });
        }
		
		
		function animate_shadow_up(){
            shadow.animate({'transform': 'scale(1)'},800, function(){
                animate_shadow_down();
            });

        }
        function animate_shadow_down(){
			shadow.animate({'transform': 'scale(.8)'},800, function(){
                animate_shadow_up();
            });
        }
		
		
        
		
		document.addEventListener('DOMContentLoaded',function(event){
  // array with texts to type in typewriter
  var dataText = [ "Welcome to PA's Transportation Program Infographic — From Planning to Projects!", 
  "It depicts our official mid-range planning tool—the Twelve Year Program Process.", 
  "Travel with me and a few friends as we learn more about the planning and programming involved in the TYP."];
  
  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < (text.length)) {
      // add next character to h1
     document.querySelector("#intro-text").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback)
      }, 60);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 900);
    }
  }
  // start a typewriter animation for a text in the dataText array
   function StartTextAnimation(i) {
     if (typeof dataText[i] == 'undefined'){
        setTimeout(function() {
          StartTextAnimation(0);
        }, 20000);
     }
     // check if dataText[i] exists
    if (i < dataText[i].length) {
      // text exists! start typewriter animation
     typeWriter(dataText[i], 0, function(){
       // after callback (and whole text has been animated), start next text
	   i++;
       if (i < 3) {StartTextAnimation(i)}
	 else {RevealButton()};
     });
    }
  }
  // start the text animation
  StartTextAnimation(0);
});


function RevealButton() {
	$( "button.begin" ).css({ "margin": "0"}).animate({
				opacity: 1,
				
			  }, 500, function() {
				// Animation complete.
			  });
			  
			  
			
	
}

