##npm run build-binaries

export URL="http://localhost:25566"

export HOST="localhost"
export TYPE="apps"
export RESOURCE="resource_uploader-linux"

export FILE_PATH="builds/resource_uploader-linux.zip"

node "/home/pierre/Documents/Mega/repos/resource_uploader/src/index.js"

read -p "Press [Enter] key to exit..."