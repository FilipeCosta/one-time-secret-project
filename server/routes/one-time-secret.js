const path = require("path");

const express = require("express");

const oneTimeSecretController = require("../controllers/one-time-secret");

const router = express.Router();

router.get("/:id/:password", oneTimeSecretController.getSecret);
router.post("/", oneTimeSecretController.postSecret);

module.exports = router;
