// CALC 1
function calculateNearCorrection() {
    const resultHalfAmplitude = calculateNearAddition(0.5);
    displayResult('resultHalfAmplitude', resultHalfAmplitude);
    calculateDistanceCorrection('distanceCorrectionResultHalfAmplitude');

    const sphereInput = parseFloat(document.getElementById('sphere').value) || 0;
    const cylinderInput = parseFloat(document.getElementById('cylinder').value) || 0;
    const axisInput = parseFloat(document.getElementById('axis').value) || 0;

    const nearCorrectionPrescriptionHalfAmplitude = formatNearCorrectionPrescription(resultHalfAmplitude, sphereInput, cylinderInput, axisInput);
    document.getElementById('nearCorrectionPrescriptionHalfAmplitude').innerText = `Near Correction Prescription: ${nearCorrectionPrescriptionHalfAmplitude}`;
}

function calculateNearCorrectionThird() {
    const resultThirdAmplitude = calculateNearAddition(1/3);
    displayResult('resultThirdAmplitude', resultThirdAmplitude);
    calculateDistanceCorrection('distanceCorrectionResultThirdAmplitude');

    const sphereInput = parseFloat(document.getElementById('sphere').value) || 0;
    const cylinderInput = parseFloat(document.getElementById('cylinder').value) || 0;
    const axisInput = parseFloat(document.getElementById('axis').value) || 0;

    const nearCorrectionPrescriptionThirdAmplitude = formatNearCorrectionPrescription(resultThirdAmplitude, sphereInput, cylinderInput, axisInput);
    document.getElementById('nearCorrectionPrescriptionThirdAmplitude').innerText = `Near Correction Prescription: ${nearCorrectionPrescriptionThirdAmplitude}`;
}

function calculateDistanceCorrection(resultElementId) {
    const sphere = parseFloat(document.getElementById('sphere').value) || 0;
    const cylinder = parseFloat(document.getElementById('cylinder').value) || 0;
    const axis = parseFloat(document.getElementById('axis').value) || 0;
    const requiredDistance = parseFloat(document.getElementById('requiredDistance').value);

    if (![requiredDistance].every(Number.isFinite) || requiredDistance <= 0) {
        document.getElementById(resultElementId).innerText = "Please enter a valid numeric value greater than 0 for Required Distance.";
        return;
    }

    const distanceCorrectionText = (sphere === 0) ? "Plano" : `+${sphere.toFixed(2)}DS / +${cylinder.toFixed(2)}DC x ${axis.toFixed(0)}`;
    document.getElementById(resultElementId).innerText = `Distance Correction: ${distanceCorrectionText}`;
}

function calculateNearAddition(amplitudeFactor) {
    const requiredDistance = parseFloat(document.getElementById('requiredDistance').value);
    const nearPoint = parseFloat(document.getElementById('nearPoint').value);

    if (![requiredDistance, nearPoint].every(Number.isFinite) || requiredDistance <= 0 || nearPoint <= 0) {
        return "Please enter valid numeric values greater than 0.";
    }

    const nearAddition = (100 / requiredDistance) - (amplitudeFactor * (100 / nearPoint));

    return formatNearAddition(nearAddition);
}

function formatNearAddition(nearAddition) {
    const nearAdd = (nearAddition >= 0) ? `+${nearAddition.toFixed(2)}` : `${nearAddition.toFixed(2)}`;

    return `${nearAdd}DS`;
}

function formatNearCorrectionPrescription(nearAddition, sphere, cylinder, axis) {
    const nearAdd = parseFloat(nearAddition);
    const nearCorrection = sphere + nearAdd;
    return `+${nearCorrection.toFixed(2)}DS / +${cylinder.toFixed(2)}DC x ${axis.toFixed(0)}`;
}

function displayResult(resultElementId, result) {
    document.getElementById(resultElementId).innerText = `Near Add: ${result}`;
}


// CALC 2

function calculatePrescription() {
  // Get input values
  const sphereInput = document.getElementById('sphere2');
  const cylinderInput = document.getElementById('cylinder2');
  const axisInput = document.getElementById('axis2');
  const vertexDistanceInput = document.getElementById('vertexDistance2');
  const selectionInput = document.getElementById('selection');

  const sphere = parseFloat(sphereInput.value);
  const cylinder = parseFloat(cylinderInput.value) || 0; // Default to 0 if not provided
  const axis = parseFloat(axisInput.value) || 0; // Default to 0 if not provided
  const vertexDistance = parseFloat(vertexDistanceInput.value);

  // Check if any input is missing or invalid
  if (isNaN(sphere) || isNaN(vertexDistance) || selectionInput.value === '') {
    let errorMessage = "Please enter valid numeric values for:";
    if (isNaN(sphere)) errorMessage += " Sphere,";
    if (isNaN(vertexDistance)) errorMessage += " Vertex Distance,";
    if (selectionInput.value === '') errorMessage += " Conversion";

    errorMessage = errorMessage.replace(/,\s*$/, ""); // Remove the trailing comma
    document.getElementById('result2').innerText = errorMessage;
    return;
  }

  // Check if vertex distance is a non-negative value
  if (vertexDistance < 0) {
    document.getElementById('result').innerText = "Please enter a non-negative value for Vertex Distance.";
    return;
  }

  // Determine the conversion type
  const conversionType = selectionInput.value === 'specsToCL' ? 'Specs to CL' : 'CL to Specs';

  // Calculate corrected powers
  let correctedPower1, correctedPower2, correctedCylinder;

  if (selectionInput.value === 'specsToCL') {
    correctedPower1 = 1 / (1 / sphere - vertexDistance);
    correctedPower2 = 1 / (1 / (sphere + cylinder) - vertexDistance);
    correctedCylinder = correctedPower2 - correctedPower1;
  } else { // CL to Specs
    correctedPower1 = 1 / (1 / sphere + vertexDistance);
    correctedPower2 = 1 / (1 / (sphere + cylinder) + vertexDistance);
    correctedCylinder = correctedPower2 - correctedPower1;
  }

  // Display the result as a prescription
  const correctedSphereSign = correctedPower1 >= 0 ? '+' : ''; // Add "+" sign for positive sphere
  const correctedCylinderSign = correctedCylinder >= 0 ? '+' : ''; // Add "+" sign for positive cylinder

  document.getElementById('result2').innerHTML = `Corrected Prescription (${conversionType}): ${correctedSphereSign}${correctedPower1.toFixed(2)} DS / ${correctedCylinderSign}${correctedCylinder.toFixed(2)} DC x ${axis}`;
}


//  CALC 3

function transpose() {
  var sphere = parseFloat(document.getElementById('sphere3').value);
  var cyl = parseFloat(document.getElementById('cyl3').value);
  var axis = parseFloat(document.getElementById('axis3').value);

  // Check if any input is missing or invalid
  if (isNaN(sphere) || isNaN(cyl) || isNaN(axis) || axis < 1 || axis > 180) {
      document.getElementById('transposedResult').innerText = "Please provide valid numeric values for Sphere, Cylinder, and Axis (between 1 and 180).";
      return;
  }

  // Simple transposition
  var transposedSphere = sphere + cyl;
  var transposedCyl = -cyl;
  var transposedAxis = (axis <= 90) ? axis + 90 : axis - 90;

  // Display transposed prescription with "+" sign
  var transposedPrescription = (transposedSphere >= 0 ? '+' : '') + transposedSphere + ' DS / ' + (transposedCyl >= 0 ? '+' : '') + transposedCyl + ' DC  x ' + transposedAxis;
  document.getElementById('transposedResult3').innerText = 'Transposed Prescription: ' + transposedPrescription;
}

// CALC 4

function transpose2() {
  var sphere = parseFloat(document.getElementById('sphere4').value);
  var cyl = parseFloat(document.getElementById('cyl4').value);
  var axis = parseFloat(document.getElementById('axis4').value);
  var baseCurve = parseFloat(document.getElementById('baseCurve4').value);

  // Check if the sign of the input cylinder matches the sign of the base curve
  if ((cyl >= 0 && baseCurve >= 0) || (cyl < 0 && baseCurve < 0)) {
      // Signs match, no transposition needed
      document.getElementById('transposedResult4').innerText = 'No transposition needed. Prescription remains unchanged.';

      // Second Step: Minus between spherical and base curve power
      var step2Result = sphere - baseCurve;
      document.getElementById('step2Result4').innerText = 'Result of Second Step: ' + step2Result;
  } else {
      // Signs do not match, perform simple transposition
      var transposedSphere = sphere + cyl;
      var transposedCyl = -cyl;
      var transposedAxis = (axis === 90) ? 180 : (axis + 90) % 180;

      // Display transposed prescription with "+" sign
      var transposedPrescription = (transposedSphere >= 0 ? '+' : '') + transposedSphere + ' Dsph / ' + (transposedCyl >= 0 ? '+' : '') + transposedCyl + ' Dcyl * ' + transposedAxis;
      document.getElementById('transposedResult4').innerText = 'Transposed Prescription: ' + transposedPrescription;

      // Second Step: Minus between spherical and base curve power
      var step2Result = transposedSphere - baseCurve;
      document.getElementById('step2Result4').innerText = 'Result of Second Step: ' + step2Result;
  }
}


// CALC 5

function calculateSphericalEquivalent() {
  var sphereInput = document.getElementById("sphere5");
  var cylinderInput = document.getElementById("cylinder5");
  var sphere = parseFloat(sphereInput.value) || 0;
  var cylinder = parseFloat(cylinderInput.value) || 0;
  console.log(sphere);
  
  var sphereValidation = document.getElementById("sphereValidation5");
  var cylinderValidation = document.getElementById("cylinderValidation5");
  var assessmentMessage = document.getElementById("assessmentMessage5");

  if (isNaN(sphere) || sphere === 0) {
      sphereValidation.innerText = "Please enter a valid non-zero number for Sphere.";
  } else {
      sphereValidation.innerText = "";
  }

  if (isNaN(cylinder) || cylinder === 0) {
      cylinderValidation.innerText = "Please enter a valid non-zero number for Cylinder.";
  } else {
      cylinderValidation.innerText = "";
  }

  if (!isNaN(sphere) && !isNaN(cylinder) && sphere !== 0 && cylinder !== 0) {
      var sphericalEquivalent = sphere + (cylinder / 2);
      var formattedResult = sphericalEquivalent >= 0 ? '+' + sphericalEquivalent.toFixed(2) : sphericalEquivalent.toFixed(2);
      document.getElementById("result5").value = formattedResult;

      // Check if values exceed specified limits
      if (sphere > 4.5 || sphere < -4.5 || sphericalEquivalent > 4.5 || sphericalEquivalent < -4.5) {
          assessmentMessage.innerText = "Spherical Equivalent may be beyond typical tolerance range. Subjective refraction is required to determine if the patient can accept these values.";
      } else {
          assessmentMessage.innerText = "";
      }
  } else {
      displayErrorMessage("Please provide valid non-zero values for both Sphere and Cylinder to calculate the Spherical Equivalent.");
  }
}

// Function to display error message on the page
function displayErrorMessage(message) {
  var errorMessageElement = document.createElement("div");
  errorMessageElement.innerText = message;
  errorMessageElement.className = "error-message";
  document.body.appendChild(errorMessageElement);

  // Clear error message after 5 seconds
  setTimeout(function () {
      errorMessageElement.remove();
  }, 5000);
}


// CALC 6

function validateInput6() {
  const inputElement = document.getElementById('workingDistance6');
  const inputValue = inputElement.value;

  // Check if the input is zero or negative
  if (inputValue <= 0) {
    inputElement.setCustomValidity("Please enter a positive value greater than zero.");
  } else {
    inputElement.setCustomValidity(""); // Reset the validation message
  }
}

function calculatePower6() {
  const workingDistanceInput = document.getElementById('workingDistance6').value;
  const workingDistancePower = (100 / workingDistanceInput).toFixed(2);
  const resultElement = document.getElementById('result6');
  resultElement.innerText = `Power for Your Working Distance: +${workingDistancePower} diopter`;
}


// CALC 7

const tableData = [
  ['20 / 630' , '6 / 190', '0.032', '4 / 125' , '+1.5'],
  ['20 / 500' , '6 / 150', '0.04' , '4 / 100' , '+1.4'],
  ['20 / 400' , '6 / 120', '0.05' , '4 / 80'  , '+1.3'],
  ['20 / 320' , '6 / 95' , '0.06' , '4 / 63'  , '+1.2'],
  ['20 / 250' , '6 / 75' , '0.08' , '4 / 50'  , '+1.1'],
  ['20 / 200' , '6 / 60' , '0.1'  , '4 / 40'  , '+1.0'],
  ['20 / 160' , '6 / 48' , '0.125', '4 / 32'  , '+0.9'],
  ['20 / 125' , '6 / 38' , '0.16' , '4 / 25'  , '+0.8'],
  ['20 / 100' , '6 / 30' , '0.2'  , '4 / 20'  , '+0.7'],
  ['20 / 80'  , '6 / 24' , '0.25' , '4 / 16'  , '+0.6'],
  ['20 / 63'  , '6 / 19' , '0.32' , '4 / 12.5', '+0.5'],
  ['20 / 50'  , '6 / 15' , '0.4'  , '4 / 10'  , '+0.4'],
  ['20 / 40'  , '6 / 12' , '0.5'  , '4 / 8'   , '+0.3'],
  ['20 / 32'  , '6 / 9.5', '0.63' , '4 / 6.3' , '+0.2'],
  ['20 / 25'  , '6 / 7.5', '0.8'  , '4 / 5'   , '+0.1'],
  ['20 / 20'  , '6 / 6'  , '1.0'  , '4 / 4'   , '0'],
  ['20 / 16'  , '6 / 4.8', '1.25' , '4 / 3.2' , '-0.1'],
  ['20 / 12.5', '6 / 3.8', '1.6'  , '4 / 2.5' , '-0.2'],
  ['20 / 10'  , '6 / 3'  , '2.0'  , '4 / 2'   , '-0.3'],
];

function populateSixMOptions() {
  const sixMSelect = document.getElementById('sixM');
  sixMSelect.innerHTML = "";

  const sixMIndex = tableData[0].indexOf('6 / 190');
  const values = Array.from(new Set(tableData.map(row => row[sixMIndex])));

  for (const value of values) {
      if (value) {
          sixMSelect.innerHTML += `<option value='${value}'>${value}</option>`;
      }
  }
}

function updateValues7() {
  const sixMValue = document.getElementById('sixM').value;
  const resultBox = document.getElementById('result7');
  resultBox.innerHTML = '';

  if (sixMValue) {
      const sixMIndex = tableData[0].indexOf('6 / 190');
      const matchingRows = tableData.filter(row => row[sixMIndex] === sixMValue);

      if (matchingRows.length > 0) {
          resultBox.innerHTML = '<div><strong>Matching Result:</strong></div>';
          resultBox.innerHTML += `<div>20 meter | 6 meter | Decimal | 4 meter | LogMAR</div>`;

          for (const row of matchingRows) {
              resultBox.innerHTML += `<div>${row.join('|')}</div>`;
          }
      } else {
          resultBox.textContent = 'No matching rows found.';
      }
  }
}

populateSixMOptions();





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