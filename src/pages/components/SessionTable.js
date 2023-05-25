import React from 'react'
import styles from './SessionTable.module.css'


const SessionTable = (sessionObject) => {
    const sessions = sessionObject.sessionObject;
  return (
   <div className={styles.container}>
    <table className="table-auto">
  <thead>
    <tr>
      <th>Duration</th>
      <th>Time Start</th>
      <th>Time End</th>
    </tr>
  </thead>


  <tbody>
    
        {sessions && sessions.map((element, index) => (
          <tr key={index}>
            <td>{element.timeDuration.h}H : {element.timeDuration.m}M : {element.timeDuration.s}S</td>
            <td>{element.timeStart}</td>
            <td>{element.timeEnd}</td>
          </tr>
        ))}
      </tbody>
  
</table>
    
    </div>
    
  )
}

export default SessionTable