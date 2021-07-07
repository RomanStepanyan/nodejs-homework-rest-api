const { Contacts } = require("../db/contactsModel");

const listContacts = async (userId) => {
  try {
    const contacts = await Contacts.find({ owner: userId });
    return contacts;
  } catch (error) {}
};

const getContactById = async (contactId) => {
  // const userId  = { owner: userId }
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

const addContact = async (userId, body) => {
  console.log("what is user -", userId);
  // const { name, email, phone } = body;
  try {
    // const newContact = new Contacts({ name, email, phone }, userId);
    const newContact = new Contacts({ owner: userId, ...body });
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
