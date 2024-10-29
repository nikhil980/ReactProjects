import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
   let {title,description,imageUrl,newsUrl,author,date} =this.props;
    return (
      <div>
        <div className="card" >
  <img src={imageUrl?imageUrl:"https://dims.apnews.com/dims4/default/c19f202/2147483647/strip/true/crop/7419x4173+0+386/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fe8%2F7e%2F53706e5fe1f087918e7649f4c268%2F5389aaac1dde4840a9a9f47e8a2062e2"} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
    <a  rel=" noreferrer" href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}
