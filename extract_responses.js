const fs = require('fs');
const data = JSON.parse(fs.readFileSync('admin-all-apis.collection.json', 'utf8'));

const extractResponses = (items) => {
  for (const item of items) {
    if (item.request && item.name.includes("Dashboard") || item.name.includes("Earnings") || item.name.includes("Chart")) {
       console.log("---- " + item.name + " ----");
       if (item.response && item.response.length > 0) {
          console.log(item.response[0].body);
       } else {
          console.log("No saved response");
       }
    } else if (item.item) {
      extractResponses(item.item);
    }
  }
};

extractResponses(data.item);
