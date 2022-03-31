const port = 8000;
const protocol = 'http';
const hostName = 'localhost';
const authenticationServerUrl = `${protocol}://${hostName}:${port}/authentication`;
const galleryServerUrl = `${protocol}://${hostName}:${port}/gallery`;
const galleryUrl = `gallery.html`;
const loginUrl = `index.html`;
const currentUrl = new URL(window.location.href);

export {
  port,
  protocol,
  hostName,
  authenticationServerUrl,
  galleryServerUrl,
  galleryUrl,
  loginUrl,
  currentUrl
}