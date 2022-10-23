import { Router } from "express";

const router = Router();

router.get("/create-or-update-user", (req, res) => {
  res.json({
    data: "hey you hit create-or-update-user API endpoint",
  });
});

export default router;
