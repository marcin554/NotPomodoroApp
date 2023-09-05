import React from 'react'
import styles from './NavbarFrame.module.css'
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';

const NavbarFrame = () => {
  return (
    <div className={styles.container}>
        
        <div className={styles.flexItem}>
            <button><MinimizeIcon fontSize='large'></MinimizeIcon></button>
        </div>
        <div className={styles.flexItem}>
            <button><CloseIcon fontSize='large'></CloseIcon></button>
        </div>
        
    </div>
  )
}

export default NavbarFrame
