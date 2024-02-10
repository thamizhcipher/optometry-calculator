// CALC 1

function calculateACARatio() {
    const ipd = parseFloat(document.getElementById('ipd').value);
    const nfd = parseFloat(document.getElementById('nfd').value);
    const hn = parseFloat(document.getElementById('hn').value);
    const hd = parseFloat(document.getElementById('hd').value);

    const acaratio = ipd + (hn - hd) * nfd/100;

    document.getElementById('result').innerText = `AC/A Ratio: ${acaratio.toFixed(1)}:1`;
  }

// CALC2 
function calculateACARatio2() {
    // Get input values
    var deviationWithoutLenses = parseFloat(document.getElementById('deviationWithoutLenses').value);
    var deviationWithLenses = parseFloat(document.getElementById('deviationWithLenses').value);
    var lensPower = parseFloat(document.getElementById('lensPower').value);

    // Check for missing or invalid inputs
    if (isNaN(deviationWithoutLenses)) {
        alert("Please enter a valid numeric value for Original Deviation (without lenses).");
        return;
    }

    if (isNaN(deviationWithLenses)) {
        alert("Please enter a valid numeric value for Deviation with Lenses.");
        return;
    }

    if (isNaN(lensPower)) {
        alert("Please enter a valid numeric value for Lens Power.");
        return;
    }

    // Perform calculation with the formula
    var acARatio = (deviationWithLenses - deviationWithoutLenses) / lensPower;

    // Display result in ratio format without + or - signs
    var ratioFormat = convertToRatioFormat(acARatio);
    document.getElementById('acARatioResult').innerHTML = 'AC/A Ratio: ' + ratioFormat;
}

// Function to convert a decimal number to ratio format with constant denominator (1)
function convertToRatioFormat(decimal) {
    // Find the greatest common divisor (GCD) to simplify the ratio
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    // Get the GCD of the numerator and constant denominator (1)
    var commonDivisor = gcd(decimal * 10, 10);

    // Calculate simplified numerator
    var numerator = Math.abs(decimal * 10) / commonDivisor;

    return numerator.toFixed(1) + ':1';
}

// CALC3

function calculateAmplitude() {
    var nearPointInput = document.getElementById("nearPoint");
    var amplitudeInput = document.getElementById("amplitude");

    // Get the entered value for the Near Point of Accommodation
    var nearPoint = parseFloat(nearPointInput.value);

    // Check if the entered value is a valid number, greater than 0
    if (!isNaN(nearPoint) && nearPoint > 0) {
        // Calculate the Amplitude of Accommodation
        var amplitude = (100 / nearPoint);

        // Check if the calculated amplitude is less than or equal to 100
        if (amplitude <= 100) {
            // Set the calculated amplitude as the value of the readonly input field for amplitude
            amplitudeInput.value = amplitude.toFixed(2);
        } else {
            // If amplitude exceeds 100, display an error message and clear the input
            alert("Amplitude cannot exceed 100 diopters.");
            amplitudeInput.value = "";
        }
    } else {
        // If nearPoint is less than or equal to 0 or not a valid number, display an error message and clear the input
        alert("Near Point of Accommodation must be a positive number.");
        nearPointInput.value = "";
    }
}

function calculateNearPoint() {
    var nearPointInput = document.getElementById("nearPoint");
    var amplitudeInput = document.getElementById("amplitude");

    // Get the entered value for the Amplitude of Accommodation
    var amplitude = parseFloat(amplitudeInput.value);

    // Check if the entered value is a valid number, greater than 0 and less than or equal to 100
    if (!isNaN(amplitude) && amplitude > 0 && amplitude <= 100) {
        // Calculate the Near Point of Accommodation
        var nearPoint = (100 / amplitude);

        // Set the calculated near point as the value of the readonly input field for near point
        nearPointInput.value = nearPoint.toFixed(2);
    } else {
        // If amplitude is less than or equal to 0, not a valid number, or exceeds 100, display an error message and clear the input
        alert("Amplitude must be a positive number and cannot exceed 100 diopters.");
        nearPointInput.value = "";
    }
}


// CALC 4

function calculatePrism() {
    var phoria = parseFloat(document.getElementById('phoria').value) || 0;
    var compensatingVergence = parseFloat(document.getElementById('compensatingVergence').value) || 0;

    var prism = (2/3) * phoria - (1/3) * compensatingVergence;

    document.getElementById('output').innerText = prism.toFixed(2);
}

// Initial calculation on page load
calculatePrism();


// CALC 5

function calculatePrism5() {
    console.log('hekoo');
    var G = parseFloat(document.getElementById('inputG').value) || 0;
    console.log(G);
    var L = parseFloat(document.getElementById('inputL').value) || 0;

    var P = (1/3) * G - (2/3) * L;

    document.getElementById('result5').innerHTML = P.toFixed(2);
}


// CALC 6

function calculateAmplitude(type) {
    var ageInput = document.getElementById(type === 'minimum' ? 'ageMinimum' : (type === 'average' ? 'ageAverage' : 'ageMaximum'));
    var resultOutput = document.getElementById(type === 'minimum' ? 'resultMinimum' : (type === 'average' ? 'resultAverage' : 'resultMaximum'));

    var age = parseFloat(ageInput.value);

    // Check if age is zero or negative
    if (age <= 0 || isNaN(age)) {
        alert("Please enter a reasonable age to calculate " + (type === 'minimum' ? 'minimum' : (type === 'average' ? 'average' : 'maximum')) + " amplitude.");
        ageInput.value = "";  // Clear the invalid input
        resultOutput.textContent = '';
        return;
    }

    var result;
    if (type === 'minimum') {
        result = 15 - (1/4) * age;
    } else if (type === 'average') {
        result = 18.5 - (1/3) * age;
    } else { // Maximum
        result = 25 - (1/5) * age;
    }

    resultOutput.textContent = (type === 'minimum' ? 'Minimum Amplitude: ' : (type === 'average' ? 'Average Amplitude: ' : 'Maximum Amplitude: ')) + result.toFixed(2) + ' diopter';
}

// CALC 7

function submitTest() {
    const primaryPosition = document.getElementById("primaryPosition").value;
    const gazeDirection = document.getElementById("gazeDirection").value;
    const headTilt = document.getElementById("headTilt").value;

    const result = determineMuscleResults(primaryPosition, gazeDirection, headTilt);

    document.getElementById("result7").innerHTML = `<p>Final Suspended Muscle: ${result}</p>`;
}

function determineMuscleResults(primaryPosition, gazeDirection, headTilt) {
    if (primaryPosition === 'right' && gazeDirection === 'left' && headTilt === 'left') {
        return 'Left Superior Rectus (SR)';
    } else if (primaryPosition === 'right' && gazeDirection === 'right' && headTilt === 'right') {
        return 'Left Inferior Oblique (IO)';
    } else if (primaryPosition === 'right' && gazeDirection === 'left' && headTilt === 'right') {
        return 'Right Superior Oblique (SO)';
    } else if (primaryPosition === 'right' && gazeDirection === 'right' && headTilt === 'left') {
        return 'Right Inferior Rectus (IR)';
    } else if (primaryPosition === 'left' && gazeDirection === 'left' && headTilt === 'left') {
        return 'Right Inferior Oblique (IO)';
    } else if (primaryPosition === 'left' && gazeDirection === 'right' && headTilt === 'right') {
        return 'Right Superior Rectus (SR)';
    } else if (primaryPosition === 'left' && gazeDirection === 'left' && headTilt === 'right') {
        return 'Left Inferior Rectus (IR)';
    } else if (primaryPosition === 'left' && gazeDirection === 'right' && headTilt === 'left') {
        return 'Left Superior Oblique (SO)';
    } else {
        return 'Muscle results not determined';
    }
}






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

// DROPDOWN INITIALIZATION

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
  });