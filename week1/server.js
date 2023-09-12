import express from "express";
import os from "os";
import fs from "fs";
import router from "./dobby/index.js";

const PORT = 3000;

const app = express();

app.get("/", async (req, res) => {
  const data = await fs.promises.readFile("./week1.html", "utf8");
  //! OS 정보를 HTML의 placeholder 자리에 넣기
  const content = data
    .replace("{{type}}", os.type())
    .replace("{{hostname}}", os.hostname())
    .replace("{{cpu_num}}", os.cpus().length)
    .replace(`{{total_mem}}`, `${(os.totalmem() / 1024 ** 3).toFixed(2)} GB`);

  //& 200 OK 상태 지정 후 유형이 html임을 지정
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(content); //& 클라이언트에 수정된 html 보냄*/
});

app.listen(PORT, () => {
  console.log(`server is listening at localhost:${PORT}`);
});

/*http.createServer((req, res) => {
     fs.readFile("./week1.html", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Contents-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }

      //! OS 정보를 HTML의 placeholder 자리에 넣기
      const content = data
        .replace("{{type}}", os.type())
        .replace("{{hostname}}", os.hostname())
        .replace("{{cpu_num}}", os.cpus().length)
        .replace(
          `{{total_name}}`,
          `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`
        );

      //& 200 OK 상태 지정 후 유형이 html임을 지정
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content); //& 클라이언트에 수정된 html 보냄
    });
  })
  .listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });*/
