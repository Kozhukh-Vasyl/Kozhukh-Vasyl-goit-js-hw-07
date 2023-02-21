// Создай галерею с возможностью клика по её элементам и 
// просмотра полноразмерного изображения в модальном окне. 
// Посмотри демо видео работы галереи.

// Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:

// Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// Реализация делегирования на div.gallery и получение url большого изображения.
// Подключение скрипта и стилей библиотеки модального окна basicLightbox. 
// Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// Открытие модального окна по клику на элементе галереи. 
// Для этого ознакомься с документацией и примерами.
// Замена значения атрибута src элемента <img> в модальном окне перед открытием. 
// Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.

import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);


const galleryList = document.querySelector('.gallery')
let items = "";

for (const { preview, original, description } of galleryItems) {
    items += `<div class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}"></a></div>`;
  }
  galleryList.insertAdjacentHTML("afterbegin", items);

  galleryList.addEventListener("click", showImage);

function showImage(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }

  showModal(e.target);
}

function showModal(imagelink) {
  document.addEventListener("keydown", closeModal);

  const original = imagelink.dataset.source;
  const instance = basicLightbox.create(
    `
    <div class="modal">
      <a><img class="modal__image" src="${original}"></a>
    </div>
  `,
    {
      onShow: (instance) => {
        instance.element().querySelector("a").onclick = instance.close;
      },
    }
  );

  instance.show();

  function closeModal(e) {
    if (e.key === "Escape") {
      instance.close();
      document.removeEventListener("keydown", closeModal);
    }
  }
}