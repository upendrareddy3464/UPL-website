(function ($) {
	
	"use strict";

	// Enhanced Header with smooth animations and parallax
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
    
    // Advanced Parallax effect for banner
    var scrolled = $(window).scrollTop();
    if ($('.main-banner').length) {
      $('.main-banner').css({
        'transform': 'translateY(' + (scrolled * 0.3) + 'px)',
        'opacity': 1 - (scrolled / 600)
      });
    }
    
    // Animate service items on scroll
    $('.service-item').each(function() {
      var elementTop = $(this).offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height();
      if (elementTop < viewportBottom - 100) {
        $(this).addClass('animate-in');
      }
    });
    
    // Animate about boxes on scroll
    $('.box-item').each(function() {
      var elementTop = $(this).offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height();
      if (elementTop < viewportBottom - 100) {
        $(this).addClass('animate-in');
      }
    });
  });


	$('.loop').owlCarousel({
      center: true,
      items:1,
      loop:true,
      autoplay: true,
      nav: true,
      margin:0,
      responsive:{ 
          1200:{
              items:5
          },
          992:{
              items:3
          },
          760:{
            items:2
        }
      }
  });
  
  $("#modal_trigger").leanModal({
		top: 100,
		overlay: 0.7,
		closeButton: ".modal_close"
});

$(function() {
		// Enhanced modal with animations
		$("#modal_trigger").click(function() {
				$(".contact_form").show();
				$("#modal").css('transform', 'scale(0.7)').animate({opacity: 1}, 300);
				$("#modal").css('transform', 'scale(1)');
				return false;
		});

		// Close modal with smooth animation
		$(".modal_close, #lean_overlay").click(function() {
				$("#modal").animate({opacity: 0}, 200, function() {
					$("#modal").fadeOut(100);
				});
				$("#lean_overlay").fadeOut(300);
				return false;
		});
		
		// Enhanced form submission with validation
		$('.contact_form form').on('submit', function(e) {
			e.preventDefault();
			var name = $(this).find('input[type="text"]').val();
			var email = $(this).find('input[type="email"]').val();
			
			if(name && email) {
				// Add success animation
				$(this).find('.btn_red').text('Sending...').prop('disabled', true);
				
				setTimeout(function() {
					alert('Thank you for contacting Upendra Private Limited! We will get back to you within 24 hours.');
					$('.contact_form form')[0].reset();
					$('.contact_form form').find('.btn_red').text('Send Message').prop('disabled', false);
					$("#modal").fadeOut(300);
					$("#lean_overlay").fadeOut(300);
				}, 1000);
			} else {
				alert('Please fill in all required fields.');
			}
			return false;
		});
		
		// Add floating animation to logo
		setInterval(function() {
			$('.logo-text').animate({
				'margin-top': '5px'
			}, 1000).animate({
				'margin-top': '0px'
			}, 1000);
		}, 2000);
		
		// Add hover effects to navigation
		$('.nav li a').hover(
			function() {
				$(this).css({
					'transform': 'translateY(-2px)',
					'transition': 'all 0.3s ease'
				});
			},
			function() {
				$(this).css('transform', 'translateY(0)');
			}
		);
		
		// Add ripple effect to buttons
		$('.gradient-button, .white-button, .border-button').on('click', function(e) {
			var $button = $(this).find('a');
			var $ripple = $('<span class="ripple-effect"></span>');
			$button.append($ripple);
			
			var x = e.pageX - $button.offset().left;
			var y = e.pageY - $button.offset().top;
			
			$ripple.css({
				top: y + 'px',
				left: x + 'px'
			});
			
			setTimeout(function() {
				$ripple.remove();
			}, 600);
		});
});

  // Acc
  $(document).on("click", ".naccs .menu div", function() {
    var numberIndex = $(this).index();

    if (!$(this).is("active")) {
        $(".naccs .menu div").removeClass("active");
        $(".naccs ul li").removeClass("active");

        $(this).addClass("active");
        $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

        var listItemHeight = $(".naccs ul")
          .find("li:eq(" + numberIndex + ")")
          .innerHeight();
        $(".naccs ul").height(listItemHeight + "px");
      }
  });
	

	// Menu Dropdown Toggle
  if($('.menu-trigger').length){
    $(".menu-trigger").on('click', function() { 
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }


  // Menu elevator animation
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        var width = $(window).width();
        if(width < 991) {
          $('.menu-trigger').removeClass('active');
          $('.header-area .nav').slideUp(200);  
        }       
        $('html,body').animate({
          scrollTop: (target.offset().top) + 1
        }, 700);
        return false;
      }
    }
  });

  $(document).ready(function () {
      $(document).on("scroll", onScroll);
      
      //smoothscroll
      $('.scroll-to-section a[href^="#"]').on('click', function (e) {
          e.preventDefault();
          $(document).off("scroll");
          
          $('.scroll-to-section a').each(function () {
              $(this).removeClass('active');
          })
          $(this).addClass('active');
        
          var target = this.hash,
          menu = target;
          var target = $(this.hash);
          $('html, body').stop().animate({
              scrollTop: (target.offset().top) + 1
          }, 500, 'swing', function () {
              window.location.hash = target;
              $(document).on("scroll", onScroll);
          });
      });
  });

  function onScroll(event){
      var scrollPos = $(document).scrollTop();
      $('.nav a').each(function () {
          var currLink = $(this);
          var refElement = $(currLink.attr("href"));
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
              $('.nav ul li a').removeClass("active");
              currLink.addClass("active");
          }
          else{
              currLink.removeClass("active");
          }
      });
  }


  // Acc
  $(document).on("click", ".naccs .menu div", function() {
    var numberIndex = $(this).index();

    if (!$(this).is("active")) {
        $(".naccs .menu div").removeClass("active");
        $(".naccs ul li").removeClass("active");

        $(this).addClass("active");
        $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

        var listItemHeight = $(".naccs ul")
          .find("li:eq(" + numberIndex + ")")
          .innerHeight();
        $(".naccs ul").height(listItemHeight + "px");
      }
  });


	// Enhanced Page loading animation with multiple effects
	 $(window).on('load', function() {
        $('#js-preloader').addClass('loaded');
        
        // Staggered animations for hero section
        setTimeout(function() {
          $('.main-banner .left-content h2').css({
            'opacity': '0',
            'transform': 'translateX(-50px)'
          }).animate({opacity: 1}, 800).css('transform', 'translateX(0)');
        }, 300);
        
        setTimeout(function() {
          $('.main-banner .left-content p').css({
            'opacity': '0',
            'transform': 'translateX(-50px)'
          }).animate({opacity: 1}, 800).css('transform', 'translateX(0)');
        }, 500);
        
        setTimeout(function() {
          $('.white-button').each(function(index) {
            var $this = $(this);
            setTimeout(function() {
              $this.css({
                'opacity': '0',
                'transform': 'scale(0.8)'
              }).animate({opacity: 1}, 600).css('transform', 'scale(1)');
            }, index * 200);
          });
        }, 700);
        
        setTimeout(function() {
          $('.main-banner .right-image').addClass('animated');
          $('.main-banner .right-image img').css({
            'opacity': '0',
            'transform': 'scale(0.8) rotate(-5deg)'
          }).animate({opacity: 1}, 1000).css('transform', 'scale(1) rotate(0deg)');
        }, 400);
        
        // Animate section headings when they come into view
        $(window).scroll();
        
        // Console branding
        console.log('%c Welcome to Upendra Private Limited! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 15px 30px; border-radius: 10px; font-weight: bold;');
        console.log('%c Your Trusted Digital Partner ', 'color: #667eea; font-size: 14px; font-weight: bold; padding: 5px;');
        console.log('%c Built with ❤️ and cutting-edge technology ', 'color: #764ba2; font-size: 12px;');
        
        // Add number counter animation
        $('.rating').each(function() {
          var $this = $(this);
          var countTo = parseFloat($this.text());
          $({countNum: 0}).animate({
            countNum: countTo
          }, {
            duration: 2000,
            easing: 'linear',
            step: function() {
              $this.text(this.countNum.toFixed(1));
            },
            complete: function() {
              $this.text(countTo.toFixed(1));
            }
          });
        });
    });
    
    // Add mouse move parallax effect
    $(document).mousemove(function(e) {
      var moveX = (e.pageX * -1 / 50);
      var moveY = (e.pageY * -1 / 50);
      
      $('.main-banner::before').css({
        'transform': 'translate(' + moveX + 'px, ' + moveY + 'px)'
      });
    });
    
    // Add typing effect to main heading (optional)
    function typeWriter(element, text, speed) {
      var i = 0;
      element.text('');
      function type() {
        if (i < text.length) {
          element.text(element.text() + text.charAt(i));
          i++;
          setTimeout(type, speed);
        }
      }
      type();
    }
    
    // Enhanced pricing card animations
    $('.pricing-item-regular, .pricing-item-pro').each(function(index) {
      var $this = $(this);
      setTimeout(function() {
        $this.css({
          'opacity': '0',
          'transform': 'translateY(30px)'
        }).animate({opacity: 1}, 600).css('transform', 'translateY(0)');
      }, index * 150);
    });
    
    // Add parallax scroll to pricing icons
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      $('.pricing-item-regular .icon img, .pricing-item-pro .icon img').each(function() {
        var offset = $(this).offset().top;
        var yPos = -(scroll - offset) / 10;
        $(this).css('transform', 'translateY(' + yPos + 'px)');
      });
    });
    
    // Enhanced testimonial card interactions
    $('.the-clients .naccs .menu div').hover(
      function() {
        $(this).find('.thumb').css({
          'box-shadow': '0 10px 30px rgba(102, 126, 234, 0.2)',
          'transform': 'scale(1.02)'
        });
      },
      function() {
        if (!$(this).hasClass('active')) {
          $(this).find('.thumb').css({
            'box-shadow': 'none',
            'transform': 'scale(1)'
          });
        }
      }
    );
    
    // Add smooth scroll progress indicator
    $(window).scroll(function() {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      
      // You can add a progress bar element to show this
      // For now, it updates the header opacity subtly
      if (scrolled > 10) {
        $('header').css('box-shadow', '0 5px 20px rgba(0,0,0,' + (scrolled/500) + ')');
      }
    });
    
    // Add section fade-in on scroll
    $(window).scroll(function() {
      $('.section-heading').each(function() {
        var elementTop = $(this).offset().top;
        var viewportBottom = $(window).scrollTop() + $(window).height();
        
        if (elementTop < viewportBottom - 100) {
          $(this).css({
            'opacity': '1',
            'transform': 'translateY(0)'
          });
        }
      });
    });
    
    // Initialize section headings as hidden
    $('.section-heading').css({
      'opacity': '0',
      'transform': 'translateY(30px)',
      'transition': 'all 0.8s ease'
    });
    
    // Add number animation for pricing
    $('.price').each(function() {
      var $this = $(this);
      var isVisible = false;
      
      $(window).scroll(function() {
        var elementTop = $this.offset().top;
        var viewportBottom = $(window).scrollTop() + $(window).height();
        
        if (elementTop < viewportBottom - 100 && !isVisible) {
          isVisible = true;
          $this.css({
            'transform': 'scale(0.8)',
            'opacity': '0'
          }).animate({opacity: 1}, 600).css('transform', 'scale(1)');
        }
      });
    });
    
    // Enhanced form input animations
    $('.popupBody input, .popupBody textarea').focus(function() {
      $(this).parent().css({
        'transform': 'scale(1.02)',
        'transition': 'all 0.3s ease'
      });
    }).blur(function() {
      $(this).parent().css('transform', 'scale(1)');
    });

	

	// Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $('.submenu').on('click', function() {
      if(width < 767) {
        $('.submenu ul').removeClass('active');
        $(this).find('ul').toggleClass('active');
      }
    });
  }




})(window.jQuery);