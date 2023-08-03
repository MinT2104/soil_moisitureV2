import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default function PopupModalMessage({modalMessage,setModalMessage}) {
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={()=>setModalMessage({isOpen: true})}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalMessage?.isOpen}
        onClose={()=>
          setModalMessage({
            isOpen:false,
            message:"",
            projectName:"",
            created_at:""
          })
        }
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalMessage?.isOpen}>
            <div className='md:w-1/3 w-4/5 h-fit bg-white rounded p-4' style={style}>
                <div className='flex justify-between items-center'>
                    <span className='text-xl font-bold'>
                        {modalMessage?.projectName}
                    </span>
                    <span className='font-light'>
                    {moment(modalMessage?.created_at).format("DD/MM/YY hh:mm")}
                    </span>
                </div>

                <div>
                    {modalMessage?.message}
                </div>
            </div>
        </Fade>
      </Modal>
    </div>
  );
}