import React from 'react';
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast() {

  const showToast = () => {
    toast("Sequence Saved!")
  };

  return (
    <div className="Toaster">
      <div>
        <button onClick={showToast}>Show Toast !</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Toast;