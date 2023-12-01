import { UModal } from '../../types';

export const Modal: React.FC<UModal> = ({ modalRef, textRef }) => {
  function closeModal() {
    let modal = modalRef.current;
    modal.style.display = 'none';
  }

  return (
    <div className="modal" ref={modalRef} onClick={closeModal}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <div className="modal__text" ref={textRef}></div>
        <button className="button" onClick={closeModal}>
          Ok
        </button>
      </div>
    </div>
  );
};
