// CALC 1

function calculateMagnification() {
  var presentAcuitySelect = document.getElementById("presentAcuity");
  var requiredAcuitySelect = document.getElementById("requiredAcuity");

  var presentAcuityIndex = presentAcuitySelect.selectedIndex;
  var requiredAcuityIndex = requiredAcuitySelect.selectedIndex;

  if (presentAcuityIndex <= requiredAcuityIndex) {
    document.getElementById("result").innerHTML = "No magnification required, Because present visual acuity is better then required visual acuity";
  } 
}


// calc 2

function calculateMagnification2() {
  const presentAcuity = document.getElementById("presentAcuity2").value;
  const requiredAcuity = document.getElementById("requiredAcuity2").value;

  const presentValue = parseInt(presentAcuity.substring(1));
  const requiredValue = parseInt(requiredAcuity.substring(1));

  if (requiredValue >= presentValue) {
    document.getElementById("output2").innerHTML = "No Magnification Required, Because the present near vision is better than the required near vision";
  } else {
    const magnification = (presentValue / requiredValue).toFixed(2);
    document.getElementById("output2").innerHTML = "Magnification: " + magnification + "X";
  }
}



















// SIDENAVE INITIALIZATION

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });


// INITIALIZE AOS

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
      useClassNames: true,
      initClassName: false,
      animatedClassName: 'animate__animated',
    });
  });


  window.onscroll = function() {myFunction()};

  function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("determinate").style.width = scrolled + "%";
  }
  
  // FLOATING ACTION BUTTON
  
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems);
  });
  
  topbtn = document.getElementById('top-btn')
  
  window.addEventListener('scroll', function() 
  {  
    if (window.scrollY > 300) {
      topbtn.classList.add('show');
    } else {
      topbtn.classList.remove('show');
    }
  });
  
  
  topbtn.addEventListener('click',function(e)
  {
    e.preventDefault();
    document.querySelector('html, body').scrollTo({
      top: 0,
      behavior: 'smooth',
      duration: 300
    });
    
  })

  // DROPDOWN INITIALIZATION

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
  });

// CHANGE CONTENT

  $(document).ready(function(){
    changeContent('opt1');
  });
  function changeContent(option) {
    // Close the side navigation
    // $('.sidenav').sidenav('close');
    // Hide all calculator sections
    $('div[id^="calculator-"]').hide();

    // Show the selected calculator section
    $('#calculator-' + option).show();
}