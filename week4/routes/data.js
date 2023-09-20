import express from "express";
import os from "os";
import { getUsers } from "../utils/fileUtils.js";

const router = express.Router();

//! 유저 endPoint get
router.get("/users", async (req, res) => {
  if (req.cookies.auth !== "valid-user") {
    return res.status(401).send("권한 없음");
  }

  const users = await getUsers();
  const withOutPassword = users.map(({ username, email }) => ({
    username,
    email,
  }));

  res.json(withOutPassword);
});

//! OS 정보 얻기
router.get("/os", async (req, res) => {
  if (req.cookies.auth !== "valid-user") {
    return res.status(401).send("권한 없음");
  }

  const osInfo = {
    type: os.type(),
    hostname: os.hostname(),
    cpu_num: os.cpus().length,
    total_mem: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GB`,
  };

  res.json(osInfo);
});

export default router;
