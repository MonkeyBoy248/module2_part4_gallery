import {currentUrl, galleryUrl} from "./environment_variables.js";

export function redirectToTheGalleryPage () {
  const currentPage = currentUrl.searchParams.get('currentPage');
  const currentLimit = currentUrl.searchParams.get('limit');

  if (!currentPage) {
    window.location.replace(`${galleryUrl}?page=1&${currentLimit}`);
  } else {
    window.location.replace(`${galleryUrl}?page=${currentPage}&limit=${currentLimit}`);
  }
}