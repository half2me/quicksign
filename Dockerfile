FROM ubuntu:rolling

ADD . /root

RUN apt update && apt install -y \
  node

RUN pip3 install -e . && rm -rf .cache
RUN npm install
RUN npm run webpack

EXPOSE 80
CMD ["./main.py"]
