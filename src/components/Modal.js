"use client";
import React from "react";

const Modal = ({ taskDesc, onClose }) => {
    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-md w-96">
                    <h1 className="text-xl font-bold mb-4">Task Details</h1>
                    <p>{taskDesc}</p>
                    <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;