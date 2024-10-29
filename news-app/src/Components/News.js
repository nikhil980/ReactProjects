import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin';
import PropTypes from 'prop-types'


export default  class News extends Component {
  static  defaultProps ={
    country:'us',
    category:'general',

   }
   static propTypes = {
    country:PropTypes.string,
    category:PropTypes.string,
   }
   capatlize=(string)=>
    {
   return string.charAt(0).toUpperCase()+string.slice(1);
    }
  constructor(props){
    super(props);
    this.state={
        articles:[],
        loading:false,
        page:1,
      
    }
      document.title=`${this.capatlize(this.props.category)} - BUZZ News`
  }
  
 handleToNext= async()=>{
  this.props.setProgress(10);
  if(!(this.state.page+1>Math.ceil(this.state.totalResults/12))){
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b050d1ffe3af40baa9a427d0cd18a6dc&page=${this.state.page+1}&pageSize=12`
  this.setState({loading: true});
  let data= await fetch(url);
  this.props.setProgress(30);
  let parsedData= await data.json();
 
  this.setState({articles:parsedData.articles,totalArticles:parsedData.totalResults })
  this.props.setProgress(70);
  this.setState({
    page:this.state.page+1,
    articles:parsedData.articles,
    loading:false
  })
  this.props.setProgress(100);
  }
}
 handleToPrev=async()=>{
  this.props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b050d1ffe3af40baa9a427d0cd18a6dc&page=${this.state.page-1}&pageSize=12`;
    this.setState({loading: true});
    let data= await fetch(url);
    this.props.setProgress(30);
    let parsedData= await data.json();

    this.setState({articles:parsedData.articles})
    this.props.setProgress(70);
    this.setState({
      page:this.state.page-1,
      articles:parsedData.articles,
      loading:false
    })
    this.props.setProgress(100);
  }
 async componentDidMount(){
  this.props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b050d1ffe3af40baa9a427d0cd18a6dc&page=1&pageSize=12`;
    this.setState({loading: true});
    let data= await fetch(url);
    this.props.setProgress(30);
    let parsedData= await data.json();

    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    this.props.setProgress(70);
    this.props.setProgress(100);
  }
  render() {
    return (

      <div className="container my-3">
        <h1  className="text-center  my-3 mx-3">BUZZ NEWS - Top  {this.capatlize(this.props.category)} Headlines {this.state.loading&&<Spin/>}</h1>
     
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description}
              imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
          </div>
          })}
          <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleToPrev}>&larr; Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/21)} type="button" className="btn btn-dark" onClick={this.handleToNext}>Next &rarr;</button>
          </div>
        </div>
      </div>
    )
  }
}
