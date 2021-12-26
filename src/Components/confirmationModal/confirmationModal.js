import React, { useReducer, useState } from "react";
import { useEffect } from "react/cjs/react.development";

function ConfirmationModalReducer(state, action) {

    switch (action.type) {
        case "CONFIRM":
            return {
                ...state,
                showConfirmModal: true,
                title: action.payload.title,
                description: action.payload.description,
                confirm: action.payload.confirm,
                // cancel: action.payload.cancel,
                type: action.payload.type

            }
        case "EXIT":
            return {
                ...state,
                showConfirmModal: false,
            }

        default:
            throw new Error("Confirmation Modal Error -> Case out of bound")
    }
}

const useConfirmModal = () => {

    const defaultState = {
        showConfirmModal: false,
        title: "Discard",
        description: "",
        confirm: () => { },
        cancel: () => { },
        type: "danger"
    }

    const [confirmModalState, confirmModalDispatch] = useReducer(ConfirmationModalReducer, defaultState);

    return { confirmModalState, confirmModalDispatch };
}

const ConfirmationModal = ({
    title = "Discard",
    description = "",
    type = "danger",
    Action = {
        confirm: () => { },
        cancel: () => { },
    } }) => {
    // const [confirm, setConfirm] = useState(false);

    return (
        <>
            <section className="confirmation-modal-background" onClick={() => {
                // Action.cancel()
            }}>

                <div className="confirmation-modal">
                    <h1 className="modal-title">{title}</h1>
                    <p className="modal-description">{description}</p>
                    <section className="modal-btn-section">
                        <button className="info" onClick={() => {
                            Action.cancel()
                        }}>Cancel</button>
                        <button className={type} onClick={() => {
                            Action.confirm()
                        }}>Confirm</button>
                    </section>
                </div>
            </section>
        </>
    )
}

export default useConfirmModal;
export { ConfirmationModal };