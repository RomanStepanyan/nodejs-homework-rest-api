const express = require("express");
const router = express.Router();
const validate = require("./validation.js");

const { authMiddleware } = require("../../middlewares/authMiddleware");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../model/index");

router.use(authMiddleware);

router.get("/", async (req, res, next) => {
  const { _id } = req.user;
  console.log(req.user);
  try {
    const data = await listContacts(_id);
    res.status(200);
    res.json({ data });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { _id } = req.user;
  try {
    // if (!_id) {
    //   return res.status(401).json({ message: "Not authorized" });
    // }
    const data = await getContactById(req.params.contactId);
    console.log("Should be a full information contactById", data);
    if (!data) {
      res.status(404);
      res.json({
        message: `Contact with id: ${req.params.contactId} is not found`,
      });
    }
    res.status(200);
    res.json({ data });
  } catch (error) {
    next(error);
  }
});

router.post("/", validate.createContact, async (req, res, next) => {
  const { _id } = req.user;
  try {
    const newContact = await addContact(_id, req.body);
    res.status(201);
    res.json({ "contact added": newContact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { _id } = req.user;
  try {
    // if (!_id) {
    //   return res.status(401).json({ message: "Not authorized" });
    // }
    const removedContact = await removeContact(req.params.contactId);
    if (!removedContact) {
      res.status(404);
      res.json({
        message: `Contact with id: ${req.params.contactId} is not found`,
      });
    }
    res.status(200);
    res.json({ "contact deleted": removedContact });
  } catch (error) {
    next({ message: "Not found" });
  }
});

router.patch("/:contactId", validate.updateContact, async (req, res, next) => {
  const { _id } = req.user;
  try {
    // if (!_id) {
    //   return res.status(401).json({ message: "Not authorized" });
    // }
    const data = await updateContact(req.params.contactId, req.body);
    if (!data) {
      res.status(404);
      res.json({
        message: `Contact with id: ${req.params.contactId} is not found`,
      });
    }
    res.status(200);
    res.json({ "contact updated": data });
  } catch (error) {
    next({ message: "Not found" });
  }
});

router.patch(
  "/:contactId/favorite",
  validate.updateContactStatus,
  async (req, res, next) => {
    const { _id } = req.user;
    try {
      // if (!_id) {
      //   return res.status(401).json({ message: "Not authorized" });
      // }
      const data = await updateStatusContact(req.params.contactId, req.body);
      if (!data) {
        res.status(400);
        res.json({
          message: `Contact with id: ${req.params.contactId} is not found`,
        });
      }

      res.status(200);
      res.json({ "contact updated": data });
    } catch (error) {
      next({ message: "Not found" });
    }
  }
);

module.exports = router;
