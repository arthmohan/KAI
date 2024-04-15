function handleSubmit(event) {
    event.preventDefault();

    // Collect form data
    let skinTypeResults = [];
    let skinConcernsResults = [];
    let priceRangeResults = [];

    // Collect selected skin types
    let selectedSkinType = document.querySelectorAll('input[name="ST_type"]:checked');
    selectedSkinType.forEach((radio) => {
        skinTypeResults.push(radio.value);
    });

    // Collect selected skin concerns
    let selectedSkinConcerns = document.querySelectorAll('input[name^="SC_"]:checked');
    selectedSkinConcerns.forEach((checkbox) => {
        skinConcernsResults.push(checkbox.value);
    });

    // Collect selected price range
    let selectedPriceRange = document.querySelectorAll('input[name^="PR_"]:checked');
    selectedPriceRange.forEach((checkbox) => {
        priceRangeResults.push(checkbox.value);
    });

    console.log(skinTypeResults);
    console.log(skinConcernsResults);
    console.log(priceRangeResults);


    // Prepare data object
    let data = {
        skinTypeResults: skinTypeResults,
        skinConcernsResults: skinConcernsResults,
        priceRangeResults: priceRangeResults
    };

    // Send data to server
    fetch('http://localhost:3001/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log response from server
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}