FROM golang:1.24

WORKDIR /app

COPY container_src/ .
RUN go mod download
RUN go build -o server .

EXPOSE 8080

CMD ["./server"]
