fetch('https://api.massive.com/v3/reference/dividends?apiKey=ziAY8Fi2THRjhZlMPDCnHg6Iv89V8mQa')
  .then(response => {
    if (!response.ok) { // Check for HTTP errors (e.g., 404, 500)
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse the response body as JSON
  })
  .then(data => {
    console.log(data); // Work with the JSON data
  })
  .catch(error => {
    console.error('Fetch error:', error); // Handle network errors or those thrown above
  });
