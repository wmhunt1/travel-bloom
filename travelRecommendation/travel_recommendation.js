document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('btnSearch');
  const clearButton = document.getElementById('btnClear');
  const conditionInput = document.getElementById('conditionInput');
  const mainContent = document.querySelector('main');
  const recommendationsContainer = document.getElementById('recommendations-container');
  

  const displayAllRecommendations = (items) => {
    recommendationsContainer.innerHTML = '';
    
    mainContent.querySelector('.main-content:first-of-type').style.visibility = 'hidden';

    recommendationsContainer.style.visibility = 'visible';

    if (items.length === 0) {
        recommendationsContainer.innerHTML = '<p style="color: white; text-align: center;">No recommendations found.</p>';
        return;
    }

    items.forEach(item => {
      const recDiv = document.createElement('div');
      recDiv.className = 'main-content';
      recDiv.style = "visibility: visible; display: flex; flex-direction: column; justify-content: center; align-items: center;"; // Make sure it's visible and centered
      recDiv.innerHTML = `
        <h3 style="color: white; text-align: center; text-shadow: 2px 2px 4px #000000;">${item.name}</h3>
        <img src="${item.imageUrl}" alt="${item.name}" style="height:100px; width:100px">
        <p style="color: white; text-align: center; text-shadow: 2px 2px 4px #000000;">${item.description}</p>
      `;
      recommendationsContainer.appendChild(recDiv);
    });
  };

  const searchRecommendation = (data) => {
    const input = conditionInput.value.toLowerCase();
    const results = [];


    data.countries.forEach(country => {
      if (input === "country" || input === "counties") {

        results.push(...country.cities);
      } 
    });

    data.temples.forEach(temple => {
      if (input === "temple" || input === "temples") {
        results.push(temple);
      }
    });

    data.beaches.forEach(beach => {
      if (input === "beach" || input === "beaches") {
        results.push(beach);
      }
    });
    
    displayAllRecommendations(results);
  };
  
  searchButton.addEventListener('click', () => {
    fetch('travel_recommendation_api.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        searchRecommendation(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  });

  clearButton.addEventListener('click', () => {
    conditionInput.value = '';
    
    recommendationsContainer.innerHTML = '';
    recommendationsContainer.style.visibility = 'hidden';
    mainContent.querySelector('.main-content:first-of-type').style.visibility = 'visible';
  });
});