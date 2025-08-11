
// var splide = new Splide( '.splide', {
//   perPage: 3,
//   rewind : true,
//   autoplay: true,
//   gap: 10,
//   breakpoints: {
//     767:{
//         perPage:2,
//     },
//     575:{
//         perPage:1,
//     }
//   }
// } );

// splide.mount();

// var splide = new Splide( '.splide', {
//   direction: 'rtl',
//   perPage  : 3,
//   autoplay: true,
//   gap: 10,
// } );

// splide.mount();

//  var splide = new Splide( '.splide' );
//   var bar    = splide.root.querySelector( '.my-carousel-progress-bar' );
  
//   // Updates the bar width whenever the carousel moves:
//   splide.on( 'mounted move', function () {
//     var end  = splide.Components.Controller.getEnd() + 1;
//     var rate = Math.min( ( splide.index + 1 ) / end, 1 );
//     bar.style.width = String( 100 * rate ) + '%';
//   } );
  
//   splide.mount();


    var splide = new Splide('.splide', {
      type   : 'loop', 
      perPage: 1,
      perMove: 1,
    });

    splide.mount();




