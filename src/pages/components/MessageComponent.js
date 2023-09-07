import React from 'react'
import styles from './MessageComponent.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessage, setMessage } from '../../slices/applicationSlice';


const MessageComponent = () => {


    const dispatch = useDispatch();
    const message = useSelector((state) => state.applicationSlice.message)
    const bool = useSelector((state) => state.applicationSlice.bool)
    
  return (
    <>
    {console.log(bool)}
    <div style={{ backgroundColor: bool === true ?   'greenyellow' : 'lightcoral'   }}>
        <div>{message} </div>
        
        <div className={styles.button}onClick={() =>
           dispatch(deleteMessage())
            
        }> Close</div>
    </div>
    
   
    </>
  )
}

export default MessageComponent