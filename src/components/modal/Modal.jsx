import { useCallback } from 'react';
import styles from './modal.module.css'

function Modal({ active, close, children }) {

    const onKeyDown = useCallback((event) => {
        if (event.keyCode === 27) {
            close()
        }
    }, [close])

    return (
        <div className={`${styles.modal} ${active && styles.active}`}
            onClick={close}
            onKeyDown={onKeyDown}>

            <div className={`${styles.modal_content} ${active && styles.modal_content_active}`}
                onClick={e => e.stopPropagation()}>

                {children}
            </div>
        </div>
    );
};

export default Modal;