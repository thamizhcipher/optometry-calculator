function calculatePrescription() {
    // Get input values
    const sphereInput = document.getElementById('sphere');
    const cylinderInput = document.getElementById('cylinder');
    const axisInput = document.getElementById('axis');
    const vertexDistanceInput = document.getElementById('vertexDistance');
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
      document.getElementById('result').innerText = errorMessage;
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

    document.getElementById('result').innerHTML = `Corrected Prescription (${conversionType}): ${correctedSphereSign}${correctedPower1.toFixed(2)} DS / ${correctedCylinderSign}${correctedCylinder.toFixed(2)} DC x ${axis}`;
  }

