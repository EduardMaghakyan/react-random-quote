import React, {Component} from 'react';
import './App.css';
import fetchQuote from './Api';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      quote: '',
      author: ''
    };
    this.tweetQuote = this.tweetQuote.bind(this);
  }

  componentDidMount() {
    this.fetchSingleQuote();
  }

  fetchSingleQuote() {
    fetchQuote()
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
      );
  }

  getTweetText() {
    return this.state.quote + ' - ' + this.state.author;
  }

  tweetQuote() {
    window.open("https://twitter.com/intent/tweet?text=" + this.getTweetText(), "_blank");
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
          <button className="random-quote-button random-quote-get" onClick={this.fetchSingleQuote.bind(this)}>
            &#8634;
          </button>
        </div>
      </div>
    );
  }
}

export default App;
