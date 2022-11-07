const fetchConversion = async () => {
  try {
    const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await resolve.json();
    return data;
  } catch (error) {
    return console.log(error);
  }
};

export default fetchConversion;
