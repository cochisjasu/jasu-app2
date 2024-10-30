import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {makeStyles} from '@material-ui/core/styles';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../App';
 
const useStyles = makeStyles(theme => ({
    img:{
        width: '100%',
       maxWidth:'450px' ,
       margin:'auto',
       textAlign:'center'
    },
    center:{
        textAlign:'center',
        background:"#225D38",
        color:"#ffffff",
        border:"none",
        "&:hover": {
            textAlign:'center',
            border:"none",
        background:"#225D38",
          },
        "&:active": {
            textAlign:'center',
        background:"#225D38",
        border:"none",
          },
    },
     

}));
function Modals() {
    const {dictionary} = useContext(Context);
  const [show, setShow] = useState(true);
  const router = useRouter();
  const handleClose = () => setShow(false);
  const handleContactButton = async () => {
    
    router.push("/contact");
  
     
}
  const classes = useStyles();
  return (
    <>
   

      <Modal show={show} onHide={handleClose} centered>
        
        <Modal.Body  className={classes.img} >       <img src="images/Jasu-Popup-optimizado.jpg"   className={classes.img}  /></Modal.Body>
        <Modal.Footer>
          <Button className={classes.center}  onClick={handleContactButton}>
          {dictionary.nav.modal}
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modals;