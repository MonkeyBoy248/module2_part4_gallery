npm run build:all
rm -R build/
mkdir build/
mv backend/build/backend build/
npm run copy:pages
npm run copy:resources
npm run rm-build:backend