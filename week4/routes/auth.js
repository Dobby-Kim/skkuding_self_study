import express from "express";
import { getUsers, saveUsers } from "../utils/fileUtils.js";

const router = express.Router();

//! 회원가입 endPoint
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const users = await getUsers();

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).send("이미 존재하는 회원");
  }

  users.push({ username, password, email });
  await saveUsers(users);
  console.log(users);
  res.status(201).send("회원가입 성공");
});

//! 로그인 endPoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = await getUsers();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).send("유효하지 않음");
  }

  res.cookie("auth", "valid-user", { maxAge: 900000 });
  res.status(200).send("로그인 성공");
});

export default router;
