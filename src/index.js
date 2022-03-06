const axios = require('axios')
const FormData = require('form-data');
var fs = require("fs");

const env = {
    url: process.env.URL,
    host: process.env.HOST,
    type: process.env.TYPE,
    resource: process.env.RESOURCE,
    file_path: process.env.FILE_PATH
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

    try {
        await axios.post("/resources/hosts/",
            {
                host: {
                    name: env.host,
                    description: "lala",
                    url: "lala",
                    port: 1,
                    path: env.host
                }
            })
    } catch (e) {
        console.log(e.message);
    }

    try {
        await axios.post("/resources/hosts/" + env.host + "/types/",
            {
                type: {
                    name: env.type,
                    description: "lala",
                    file_extension: "tar",
                    path: env.type
                }
            })
    } catch (e) {
        console.log(e.message);
    }

    try {
        await axios.post("/resources/hosts/" + env.host + "/types/" + env.type + "/resources/",
            {
                resource: {
                    name: env.resource,
                    description: "lala",
                    path: env.resource
                }
            })
    } catch (e) {
        console.log(e.message);
    }


    axios.post("/resources/hosts/" + env.host + "/types/" + env.type + "/resources/" + env.resource + "/releases/",
        formData, {
            headers: formData.getHeaders()
        })
        .then(function (response) {
            console.log("Success => Version: ", response.data.version);
        })
        .catch(function (error) {
            console.log("Error => " + error.message);
        });
}

start();

