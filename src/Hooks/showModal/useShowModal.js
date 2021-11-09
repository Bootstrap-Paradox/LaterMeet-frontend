import React, { useReducer } from 'react';
import './modal.css';


function ModalReducer(state, action) {

    switch (action.type) {
        case "SHOW_MODAL":
            return {
                ...state,
                showModal: true,
                modalList: [...state.modalList, action.payload]
            }

        case "POP_MODAL":
            let newModalList = state.modalList.filter(list => list.id !== action.payload)
            return {
                ...state,
                modalList: newModalList,
            }
    }

}



const useModal = () => {

    let defaultState = {
        showModal: false,
        modalList: []
    }

    // const modalList= {
    //     title: "Authentication Error",
    //     msg: "Hello World",
    //     status: "warning",
    //     pop: true,
    // }

    // Modal State Setup
    const [state, dispatch] = useReducer(ModalReducer, defaultState);

    // todo: 1. Show Modal


    return { state, dispatch };

}

const Modal = ({ content = {}, dispatch = () => { } }) => {
    return (
        <>
            <div className="modal animate__animated animate__bounceInRight">
                <div className="modal-content">
                    <h3 className="modal-title">{content["title"]}</h3>
                    <p className="modal-msg">{content["msg"]}</p>
                </div>
                <span onClick={() => {
                    dispatch({ type: "POP_MODAL", payload: content["id"] })
                }} className="close">X</span>
            </div>
        </>
    )
}

const ModalBlock = ({ modalState, modalDispatch }) => {

    return (
        <div className="modal-block">
            {
                modalState.modalList.length > 0 &&
                modalState.modalList.map((list, index) => {
                    return <Modal key={list["id"]} content={list} dispatch={modalDispatch} />
                })
            }
        </div>
    )
}

export default useModal;
export { ModalBlock };