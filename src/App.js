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
    this.getTweetText = this.getTweetText.bind(this);
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
          <a className="random-quote-button random-quote-share" href={"https://twitter.com/intent/tweet?text=" + this.getTweetText()}></a>
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
      cache: 'default'
    };

    const myRequest = new Request("http://quotes.stormconsultancy.co.uk/random.json", requestParams);
    fetch(myRequest)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            quote: result.quote,
            author: result.author
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
}

export default App;
