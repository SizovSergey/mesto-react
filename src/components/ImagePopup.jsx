import React from 'react';

const ImagePopup = (props) => {
    return (
        <div class="popup" id="popup_photo">
            <figure class="popup__figure">
                <button class="popup__cancel-button" type="button" aria-label="Закрыть окно" onClick={props.onClose}></button>
                <img class="popup__image" src="#" alt="" />
                <figcaption class="popup__caption"></figcaption>
            </figure>
        </div>
    );
}

export default ImagePopup;