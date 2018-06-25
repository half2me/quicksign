# quicksign

> Sign Data Quickly

## Use with docker

``` bash
# Pull the built docker image
docker pull halftome/quicksign

# make sure your private key is in a separate directory to mount into the docker container
docker run -it --env pw=yourkeypassword --env keyfile=nameofyourkeyfile -v /pathtodirectorycontaining/privatekey:/root/private halftome/quicksign
```

## Or build and run it yourself
``` bash
pip3 install -e .
npm install
npm run production
./main.py
```
