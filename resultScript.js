// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    
    // Arrays to store results
    let skinTypeResults = [];
    let skinConcernsResults = [];
    let allergensResults = [];
    let priceRangeResults = [];
    
    // Get selected skin type
    let selectedSkinType = document.querySelector('input[name="ST_type"]:checked');
    if (selectedSkinType) {
        skinTypeResults.push(selectedSkinType.value);
    }
    
    // Get selected skin concerns
    let selectedSkinConcerns = document.querySelectorAll('input[name^="SC_"]:checked');
    selectedSkinConcerns.forEach((checkbox) => {
        skinConcernsResults.push(checkbox.value);
    });
    
    // Get selected allergens
    let selectedAllergens = document.querySelectorAll('input[name^="A_"]:checked');
    selectedAllergens.forEach((checkbox) => {
        allergensResults.push(checkbox.value);
    });
    
    // Get selected price range
    let selectedPriceRange = document.querySelectorAll('input[name^="PR_"]:checked');
    selectedPriceRange.forEach((checkbox) => {
        priceRangeResults.push(checkbox.value);
    });
    
    // You can do whatever you want with these arrays, like sending them to a server or processing them further
    console.log("Skin Type Results:", skinTypeResults);
    console.log("Skin Concerns Results:", skinConcernsResults);
    console.log("Allergens Results:", allergensResults);
    console.log("Price Range Results:", priceRangeResults);
}

// Add event listener to the form for submission
document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector('form');
    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
});
