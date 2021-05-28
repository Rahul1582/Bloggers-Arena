import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import "../css/footer.css";

const currstyle=makeStyles({
    root: {
        padding: '6px 14px 20px 11px',
        color:'white' 
    }
});


export default function Footer() {
    const classes = currstyle();

    return (
        <div className={classes.root}>
        <div className='footer1'>
            Made with <FavoriteIcon fontSize='small' style={{ color: 'red'}} /> by Rahul Kumar Patro  
    
    </div>
    </div>
    )
}