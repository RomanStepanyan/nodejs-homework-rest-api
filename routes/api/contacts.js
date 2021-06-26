const express = require("express");
const router = express.Router();
const validate = require("./validation.js");

// const { Contacts } = require("../../db/contactsModel");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../model/index");

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200);
    res.json({ data });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const data = await getContactById(req.params.contactId);
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
  try {
    const newContact = await addContact(req.body);
    res.status(201);
    res.json({ "contact added": newContact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
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
  try {
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
    try {
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
