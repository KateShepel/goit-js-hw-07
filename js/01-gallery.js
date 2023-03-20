import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const itemsMarkup = makeGallery(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);

galleryContainer.addEventListener("click", onGalleryItemClick);



function makeGallery(items) {
    return items.map(({ preview, original, description }) => {
        return `
            <div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    />
                </a>
            </div>`
    }
    ).join('');
}



function onEscPress(evt, instance) {
    if (!instance.visible()) { 
        return;
    }
    if (evt.code === "Escape") {
        instance.close()
    }

} 

function onGalleryItemClick(evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains("gallery__image")) {
        return;
    }

    const onEscPressCallBack = (evt) => onEscPress(evt, instance);

    const imgSrc = evt.target.getAttribute('data-source');
    const imgMarkup = `<img src='${imgSrc}' width="800" height="600">`;
    const options = {
        onClose: () => window.removeEventListener("keydown", onEscPressCallBack)
    }

    const instance = window.basicLightbox.create(imgMarkup, options);

    instance.show();

   window.addEventListener("keydown", onEscPressCallBack);

}


