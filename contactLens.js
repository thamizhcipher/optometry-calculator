// CALC 1

function calculatePrescription() {
    // Get input values
    const sphereInput = document.getElementById('sphere1');
    const cylinderInput = document.getElementById('cylinder1');
    const axisInput = document.getElementById('axis1');
    const vertexDistanceInput = document.getElementById('vertexDistance1');
    const selectionInput = document.getElementById('selection1');

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
      document.getElementById('result1').innerText = errorMessage;
      return;
    }

    // Check if vertex distance is a non-negative value
    if (vertexDistance < 0) {
      document.getElementById('result1').innerText = "Please enter a non-negative value for Vertex Distance.";
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

    document.getElementById('result1').innerHTML = `Corrected Prescription (${conversionType}): ${correctedSphereSign}${correctedPower1.toFixed(2)} DS / ${correctedCylinderSign}${correctedCylinder.toFixed(2)} DC x ${axis}`;
  }


// CALC 2

function calculatePower2() {
  console.log("power");
  var radiusInput = document.getElementById("radiusInput2");
  var powerInput = document.getElementById("powerInput2");
  var resultElement = document.getElementById("result2");

  var radius = parseFloat(radiusInput.value);

  if (!isNaN(radius) && radius > 0) {
      var power = 337.5 / radius;
      powerInput.value = power.toFixed(2);
      updateResult();
  } else {
      // Clear the input and display an error message
      radiusInput.value = "";
      powerInput.value = "";
      resultElement.textContent = "Please enter a valid positive value for Radius of Curvature.";
  }
}

// Function to calculate Radius of Curvature based on Dioptric Power
function calculateRadius2() {
  console.log("called");
  var radiusInput = document.getElementById("radiusInput2");
  var powerInput = document.getElementById("powerInput2");
  var resultElement = document.getElementById("result2");

  var power = parseFloat(powerInput.value);

  if (!isNaN(power)) {
      var radius = 337.5 / power;
      radiusInput.value = radius.toFixed(2);
      updateResult();
  } else {
      // Clear the input and display an error message
      radiusInput.value = "";
      powerInput.value = "";
      resultElement.textContent = "Please enter a valid value for Dioptric Power.";
  }
}

// Function to update the result message
function updateResult() {
  console.log("i am being called");
  var radius = parseFloat(document.getElementById("radiusInput2").value);
  var power = parseFloat(document.getElementById("powerInput2").value);
  var resultElement = document.getElementById("result2");

  if (!isNaN(radius) && !isNaN(power)) {
      resultElement.textContent = "";
  } else {
      resultElement.textContent = "Result: Enter values to calculate.";
  }
}


// CALC 3

function calculateLars3() {
  const sphereInput = document.getElementById('sphere3').value;
  const cylinderInput = document.getElementById('cylinder3').value;
  const axisInput = document.getElementById('axis3').value;
  const rotationDirection = parseFloat(document.getElementById('rotationDirection3').value);

  // Validate input values
  if (isNaN(sphereInput) || isNaN(cylinderInput) || isNaN(axisInput)) {
      alert('Please enter valid numeric values for Sphere, Cylinder, and Axis.');
      return;
  }

  let sphere = parseFloat(sphereInput);
  let cylinder = parseFloat(cylinderInput);
  let axis = parseFloat(axisInput);

  // Validate axis value to be within the range of 0 to 180 degrees
  axis = Math.min(180, Math.max(0, axis));

  const degreeIncrement = 30;

  const finalAxis = (rotationDirection === 1) ? (axis + degreeIncrement) % 180 : Math.abs((Math.abs(axis - degreeIncrement)) - 180);

  // Display the result as a prescription with a plus sign only for sphere and cylinder
  const prescriptionResult = `${(sphere >= 0) ? '+' : ''}${sphere.toFixed(2)}DDS/${(cylinder >= 0) ? '+' : ''}${cylinder.toFixed(2)}DDC ×${finalAxis}`;

  document.getElementById('result3').innerText = prescriptionResult;
}

// Function to handle input changes for the prescription fields
function calculatePrescription3() {
  calculateLars3();  // Call the LARS calculation function

  // If you want additional logic related to the prescription, you can add it here

  // Example: Display a message after the calculation
  alert('Prescription Calculated!');
}

// Function to validate the axis input to be within 0 to 180 degrees
function validateAxis() {
  const axisInput = document.getElementById('axis3');
  let axisValue = parseFloat(axisInput.value);

  // Ensure the value is within the range of 0 to 180 degrees
  axisValue = Math.min(180, Math.max(0, axisValue));

  // Update the input field with the validated value
  axisInput.value = axisValue;
}










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