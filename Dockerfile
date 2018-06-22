FROM ubuntu:rolling

WORKDIR /root

ADD . .

RUN apt update && apt install -y \
  npm \
  python3-pip

RUN pip3 install -e . && rm -rf .cache
RUN npm install
RUN npm run production

EXPOSE 80
CMD ["./main.py"]
