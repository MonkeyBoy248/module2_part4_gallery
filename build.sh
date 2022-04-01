rm -R build/ || true
mkdir build/
npm run build:all
npm run copy:pages
npm run copy:resources