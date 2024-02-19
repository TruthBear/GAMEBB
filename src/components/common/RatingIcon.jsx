import React from 'react'

const RatingIcon = (rating) => {
  
  const rateScore = (rating) => {
    if(rating >= 3 ) {
      return "🎯"
    } else if(3 > rating && rating >= 2) {
      return "👍"
    } else if(2 > rating && rating >= 1) {
      return "😑"
    } else {
      return "⛔️"
    }
  }
  
  return (
    <span>{rateScore(rating.rating)}</span>
  )
}


export default RatingIcon;