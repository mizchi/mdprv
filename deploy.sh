yarn build
echo "/*    /index.html   200"> dist/_redirects_
yarn netlify deploy -d dist --production