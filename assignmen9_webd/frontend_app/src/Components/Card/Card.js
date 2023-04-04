import React from 'react'

function Card(props) {
  return (
    <div >
        <img src={props.src} alt="pic" width="250" height="250" class='mt-5 ms-5' />
        <p class="ms-5 mt-5" style={{color:"white"}}>{props.title}</p>
    </div>
  )
}

export default Card