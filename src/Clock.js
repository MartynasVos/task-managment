import React, { useState } from 'react'

export default function Clock() {

    let time = new Date().toLocaleTimeString()
    const [currentTime, setCurrentTime] = useState(time)

    function updateClock() {
        setCurrentTime(new Date().toLocaleTimeString())
    }

    setInterval(updateClock, 1000)

  return (
    <div>{currentTime}</div>
  )
}
