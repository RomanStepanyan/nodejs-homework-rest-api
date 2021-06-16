const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join("./model/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {}
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const contactById = contactsList.find(
      (el) => el.id.toString() === contactId
    );
    // const contacts = await fs.readFile(contactsPath);
    // const contactById = JSON.parse(contacts).find(
    //   (el) => el.id.toString() === contactId.toString()
    // );
    return contactById;
  } catch (error) {}
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const removingContactId = contactsList.find(
      ({ id }) => id.toString() === contactId
    );

    if (removingContactId) {
      const idFilteredData = contactsList.filter(
        (el) => el.id.toString() !== contactId
      );
      fs.writeFile(contactsPath, JSON.stringify(idFilteredData));
      return removingContactId;
    }
  } catch (error) {}
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const shortid = require("shortid");
  try {
    const contactsList = await listContacts();
    const newContact = { id: shortid.generate(), name, email, phone };
    const newContactsList = JSON.stringify(
      [newContact, ...contactsList],
      null,
      "\t"
    );
    await fs.writeFile(contactsPath, newContactsList);
    return newContact;
    // }
  } catch (error) {}
};

const updateContact = async (contactId, body) => {
  try {
    const contactsList = await listContacts();
    const targetContact = contactsList.find(
      (item) => item.id.toString() === contactId
    );
    const updatedContact = { ...targetContact, ...body };
    const proсessingContact = contactsList.map((item) => {
      if (item.id.toString() === contactId) {
        const updatedContact = { ...item, ...body };
        return updatedContact;
      } else {
        return item;
      }
    });
    const data = JSON.stringify(proсessingContact, null, "\t");
    await fs.writeFile(contactsPath, data);
    return updatedContact;
  } catch (error) {}
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
