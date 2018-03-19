export default function fetchQuote() {
  const headers = new Headers();
  const requestParams = {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'no-cache'
  };

  const myRequest = new Request(
    'https://aitorp6.herokuapp.com/quotes/api/random',
    requestParams
  );
  return fetch(myRequest);
}
