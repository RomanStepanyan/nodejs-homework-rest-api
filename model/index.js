const { Contacts } = require("../db/contactsModel");

const listContacts = async () => {
  try {
    const contacts = await Contacts.find();
    return contacts;
  } catch (error) {}
};

const getContactById = async (contactId) => {
  try {
    const contactById = await Contacts.findById(contactId);
    return contactById;
  } catch (error) {}
};

const removeContact = async (contactId) => {
  try {
    const removingContact = await Contacts.findByIdAndRemove(contactId);
    return removingContact;
  } catch (error) {}
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const newContact = new Contacts({ name, email, phone });
    await newContact.save();
    return newContact;
  } catch (error) {}
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const updatedContact = await Contacts.findByIdAndUpdate(contactId, {
      $set: { name, email, phone },
    });
    return updatedContact.id;
  } catch (error) {}
};

const updateStatusContact = async (id, body) => {
  try {
    const contact = await Contacts.findByIdAndUpdate(id, body, { new: true });
    return contact;
  } catch (error) {}
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
