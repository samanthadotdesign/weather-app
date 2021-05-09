console.log('client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

const locationMessage = document.querySelector('#location')
const weatherMessage = document.querySelector('#weather')

// Adding an event listener on submit form 
weatherForm.addEventListener('submit', (event) => {
  // Default behavior of the form is to refresh the browser 
  // To prevent a flash of refresh of the browser
  event.preventDefault();

  // Extracts the input value and stores it in a variable
  const location = searchElement.value

  locationMessage.textContent = 'Loading...'
  weatherMessage.textContent = ''

  // Inside the submit callback, fetch call 
  // Use search text as adddress query string value
  fetch(`http://localhost:3004/weather?address=${location}`).then( (response) => {
      // Get the parse JSON response
      response.json().then( (data) => {
        // If error property, print eror 
        if (data.error) {
          locationMessage.textContent = data.error
        } else {
      // If no error property, print location and forecast
        locationMessage.textContent = data.location
        weatherMessage.textContent = data.forecast
        }
      })
  })
})
