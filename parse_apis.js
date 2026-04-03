const fs = require('fs');
const data = JSON.parse(fs.readFileSync('admin-all-apis.collection.json', 'utf8'));

const extractApis = (items, prefix = '') => {
  let apis = [];
  for (const item of items) {
    if (item.request) {
      let method = item.request.method;
      let url = '';
      if (item.request.url && item.request.url.raw) {
        url = item.request.url.raw.replace(/{{.+}}\//, '');
      } else if (item.request.url && item.request.url.path) {
        url = item.request.url.path.join('/');
      }
      apis.push(`${prefix}${item.name} -> ${method} ${url}`);
    } else if (item.item) {
      apis = apis.concat(extractApis(item.item, prefix + item.name + ' > '));
    }
  }
  return apis;
};

const apis = extractApis(data.item);
fs.writeFileSync('apis_list_utf8.txt', apis.join('\n'), 'utf8');
console.log('Saved to apis_list_utf8.txt');
