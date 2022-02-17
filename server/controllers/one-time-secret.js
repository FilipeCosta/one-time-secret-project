const Secret = require("../models/secret");

const LAST_ATTEMPT = 1;

const handleUpdateLimit = async (secret, limit) => {
  try {
    return await secret.update({ limit: limit }, { where: { id: secret.id } });
  } catch (err) {
    throw new Error("Failed to update limit");
  }
};
exports.getSecret = async (req, res) => {
  const { id, password } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Missing required parameter secret id",
    });
  }

  try {
    const secret = await Secret.findByPk(id);

    if (!secret) {
      return res.status(404).send({
        message: "This secret has been deleted already",
      });
    }

    if (!Secret.isValidPassword(secret.password, password)) {
      return res.status(401).send({
        message: "You are not allowed to access this secret",
      });
    }

    if (secret.limit === LAST_ATTEMPT) {
      await secret.destroy();
    } else {
      await handleUpdateLimit(secret, secret.limit - 1);
    }

    return res.send(secret);
  } catch (err) {
    console.log("err: ", err);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.postSecret = async (req, res, next) => {
  const { description, limit = LAST_ATTEMPT, password } = req.body;

  if (!description) {
    return res.status(400).send({
      message: "Missing required parameter secret description",
    });
  }

  Secret.create({ description, limit, password })
    .then((result) => {
      return res.send(result.id);
    })
    .catch((_) => {
      return res.status(500).send({
        message: "Internal Server Error",
      });
    });
};
