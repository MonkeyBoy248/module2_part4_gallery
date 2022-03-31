import {currentUrl, galleryUrl} from "./environment_variables.js";

export function redirectToTheGalleryPage () {
  const currentPage = currentUrl.searchParams.get('currentPage');

  if (!currentPage) {
    window.location.replace(`${galleryUrl}?page=1`)
  } else {
    window.location.replace(`${galleryUrl}?page=${currentPage}`)
  }
}