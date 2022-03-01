const axios = require('axios')
const FormData = require('form-data');
var fs = require("fs");

const env = {
    url: process.env.URL || "http://localhost:25565",
    host: process.env.HOST || "localhost",
    type: process.env.TYPE || "services",
    resource: process.env.RESOURCE || "resource_manager-win",
    file_path: process.env.FILE_PATH || "C:\\Users\\Pierre\\Desktop\\bateau\\bateau_service\\binaries\\resource_manager-win.exe"
}

axios.defaults.baseURL = env.url
axios.defaults.maxContentLength = Infinity
axios.defaults.maxBodyLength = Infinity
async function start() {
    console.log(env)
    let formData = new FormData();
    const file = await fs.createReadStream(env.file_path);
    const file_name = env.file_path.split('\\').pop()
    formData.append('file', file, file_name);
    console.log("uploading...")
    axios.post("/resources/hosts/" + env.host + "/types/" + env.type + "/resources/" + env.resource + "/releases/",
        formData, {
            headers: {
                ...formData.getHeaders(),
            }
        })
        .then(function (response) {
            console.log("Success => Version: ", response.data.version);
        })
        .catch(function (error) {
            console.log("Error => " + error.message);
        });
}

start();

