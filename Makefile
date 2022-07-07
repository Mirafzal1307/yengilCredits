


export GIT_SHA=$(git rev-parse HEAD)

docker build -t bektexno_frontend:$GIT_SHA .
