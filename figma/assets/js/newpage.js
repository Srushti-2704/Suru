var splide = new Splide( '.splide', {
  perPage: 6,
//   rewind : true,
  type: 'loop',
 gap: 30,
 pagination: false,
   breakpoints: {
    1200: {
      perPage: 5,
    },
    768: {
      perPage: 3,
    },
    576: {
      perPage: 2,
    },
    400: {
      perPage: 1,
    }

}
} );

splide.mount();