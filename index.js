// Materialize init for navbar
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    var navLinks = document.querySelectorAll('#mobile-demo li a');
  navLinks.forEach(function(link)
   {
    link.addEventListener('click', function()
    {
      console.log("working");
      var instance = M.Sidenav.getInstance(elems[0]);
      instance.close();
    });
  });

  });

// INITIALIZE AOS

document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    useClassNames: true,
    initClassName: false,
    animatedClassName: 'animate__animated',
  });
});

// INITIALIZE TABS
document.addEventListener('DOMContentLoaded', function() {
  var tabs = document.querySelectorAll('.tabs');
  M.Tabs.init(tabs);
});



// INITIALIZE CAROUSEL

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.carousel');
  var options=
  {
    padding:200,
    indicators:false,
  }
  var instances = M.Carousel.init(elems,options);
  // instances.next()
  autoplay();

  function autoplay()
  {
    instances[0].next()
    setTimeout(autoplay,4500)
  }
  var carouselItems=document.querySelectorAll('.carousel-item');

  carouselItems.forEach((item)=>{
    item.addEventListener('click',(e)=>{
      e.preventDefault();
    })
  })

});


// INITIALIZE COLLAPSIBLE

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);
});



document.addEventListener('DOMContentLoaded', function() {
  // Initialize the side nav
  var sideNavElem = document.querySelectorAll('.sidenav');
  var sideNavInstances = M.Sidenav.init(sideNavElem);

  // Add event listener to close side nav on link click
  
});

// INITIALIZE MODAL

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

// SCROLL SPY

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.scrollspy');
  var options=
  {
    throttle:1000
  }
  var instances = M.ScrollSpy.init(elems,options);
});


// SCROLL PROGRESS BAR

window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("determinate").style.width = scrolled + "%";
}