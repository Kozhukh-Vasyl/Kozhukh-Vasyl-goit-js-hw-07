// Створити галерею з можливістю натискання на її елементи.
// Перегляд повнорозмірного зображення в модальному вікні.
// Подивитися демо відео роботи галереї.
// Виконати це завдання у файлах 01-gallery.html та 01-gallery.js. Розбити його на кілька підзадач.
// Створення та рендер розмітки за масивом даних галереїі елементів та наданим шаблоном елемента галереї.
// Реалізація делегування на div.gallery та отримання url великого зображення.
// Підключення скрипта та стилів бібліотеки модального вікна basicLightbox.
// Використати CDN сервіс jsdelivr та додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// Відкрити модального вікна на кліку на елементі галереї.
// Ознайомитися з документацією та прикладами.
// Замінити значення атрибута src елемента <img> у модальному вікні перед відкриттям.
// Використати готову розмітку модального вікна із зображенням із прикладів бібліотеки basicLightbox.

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
