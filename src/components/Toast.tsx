import React, { useEffect, useState } from "react";

export interface ToastMessage {
    message: string;
    type: string;
}

export default function Toast({message, type}:ToastMessage) {

  return (
    <div>
      {message &&
        <div className={`flex justify-center items-center opacity-100 fixed z-50 m-2 rounded-md p-2 right-0 top-0 w-96 h-20 font-sans text-black font-semibold text-lg ${type == 'success' ? 'bg-green-200' : null } ${type == 'error' ? 'bg-yellow-400' : null }`}>
          {message}
        </div>
      }
    </div>
  );
}