const options = {
  method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.REACT_APP_TASTY_API_KEY,
		'X-RapidAPI-Host': process.env.REACT_APP_TASTY_API_HOST
	}
}

const makeApiCall = () => {
  fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

const Recipes = () => {
  
  
  return(
    <>
      <h3>Tasty Recipes</h3>
      <hr />
    </>
  );
}

export default Recipes;