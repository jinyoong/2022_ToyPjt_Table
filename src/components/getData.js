async function getData() {
  const response = await fetch('./src/data.json');
  return response.json();
};

export default getData;