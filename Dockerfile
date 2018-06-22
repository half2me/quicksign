FROM ubuntu:rolling

ADD . .

RUN apt update && apt install -y \
  npm \
  python3-pip

RUN pip3 install -e . && rm -rf .cache
RUN npm install
RUN npm run webpack

EXPOSE 80
CMD ["./main.py"]
