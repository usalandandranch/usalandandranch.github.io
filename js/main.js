/*=========================================

NOTE: This is the custom jQuery file for website.

=========================================*/

(function ($) {
	"use strict";

    $(document).ready(function($){

        /*=============================
                Preloder
        ==============================*/
        $('.spinner').fadeOut(1000);
        $('.preloader').delay(350).fadeOut(500);
        $('body').delay(350).css({'overflow':'visible'});

        /*=============================
                    Sticky header
        ==============================*/
        // $('.nav-item a').on('click',function(){
        //     $(".navbar-collapse").collapse('hide');
        // });

        // $(window).on('scroll', function() {
        //     if ($(".navbar").offset().top > 100) {
        //         $(".navbar-fixed-top").addClass("top-nav-collapse");
        //     } else {
        //         $(".navbar-fixed-top").removeClass("top-nav-collapse");
        //     }
        // });

        /*=============================
                Smoothscroll js
        ==============================*/
        $(function() {
            $('a.smooth-scroll').on('click', function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top - 80
                }, 1000);
                event.preventDefault();
            });
        });

    /*======================================
        jquery scroll spy
    ========================================*/
        $('body').scrollspy({

            target : ".main-menu",
            offset : 100

        });

     /*=================================
            Bootstrap menu fix
     ==================================*/
        // $(".navbar-toggle").on("click", function(){
				//
        //     $('body').addClass("mobile-menu-activated");
				//
        // });
				//
        // $("ul.nav.navbar-nav li a").on("click", function(){
				//
        //     $(".navbar-collapse").removeClass("in");
        //     $(".nav").find(".active").removeClass("active");
        //     $(this).parent().addClass("active");
				//
				//
        // });

    /*====================================================
        background-image flickering solution for mobile
    =======================================================*/
        var bg = jQuery("#home");
        function resizeBackground() {
            bg.height(jQuery(window).height() + 60);
        }
        resizeBackground();

    /*==========================
        Intro typer
    ============================*/
        var element = $(".element");

        $(function() {
            element.typed({
                strings: ["Buy.","Sell.","Serve.","Help."],
                typeSpeed: 100,
                loop: true,
            });
        });

     /*=============================
            Parallax
    ==============================*/
        $(window).stellar({
            responsive: true,
            positionProperty: 'position',
            horizontalScrolling: false
        });

    /*=============================
        CounterUp
    ==============================*/
        $('.counter').counterUp({
            delay: 4,
             time: 800
        });

    /*=========================================
                jQuery mixItUp
    =======================================*/
        $('.property-inner').mixItUp();
        $.ajax({
            type: "GET",
            url:"../includes/property.json",
            mimeType: "application/json",
            success: function(data){
                var bookTemplate = $("#propertyStore").html();
                var compiledTemplate = Handlebars.compile(bookTemplate);
                var html = compiledTemplate(data);
                $(".property-inner").append(html);
            }
        });



    Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

        if (arguments.length < 3)
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

        var operator = options.hash.operator || "==";

        var operators = {
            '==':       function(l,r) { return l == r; },
            '===':      function(l,r) { return l === r; },
            '!=':       function(l,r) { return l != r; },
            '<':        function(l,r) { return l < r; },
            '>':        function(l,r) { return l > r; },
            '<=':       function(l,r) { return l <= r; },
            '>=':       function(l,r) { return l >= r; },
            'typeof':   function(l,r) { return typeof l == r; }
        }

        if (!operators[operator])
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

        var result = operators[operator](lvalue,rvalue);

        if( result ) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    });


    });





}(jQuery));
