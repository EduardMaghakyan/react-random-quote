import React, {Component} from 'react';
import './App.css';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      quote: '',
      author: ''
    };
    this.handleNew = this.handleNew.bind(this);
    this.tweetQuote = this.tweetQuote.bind(this);
  }

  handleNew () {
    this.fetchQuote()
  }

  render() {
    return (
      <div className="random-quote-wrap random-quote">
        <blockquote>
          <p>{this.state.quote}</p>
        </blockquote>
        <div className="random-quote-attribution">
          <p className="random-quote-author">{this.state.author}</p>
        </div>
        <div className="random-quote-actions">
          <button className="random-quote-button random-quote-share" onClick={this.tweetQuote}></button>
          <button className="random-quote-button random-quote-get" onClick={this.handleNew}>
            &#8634;
          </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchQuote()
  }

  fetchQuote() {
    const headers = new Headers();
    const requestParams = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'no-cache'
    };

    const myRequest = new Request("https://aitorp6.herokuapp.com/quotes/api/random", requestParams);
    fetch(myRequest)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            quote: result.quotes.quote,
            author: result.quotes.author
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  getTweetText() {
    return this.state.quote + ' - ' + this.state.author;
  }

  tweetQuote() {
    window.open("https://twitter.com/intent/tweet?text=" + this.getTweetText(), "_blank");
  }
}

export default App;
