import { program } from "commander";
import * as contactService from "./contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contactList = await contactService.listContacts();
        console.table(contactList);
        break;

      case "get":
        const oneContact = await contactService.getContactById(id);
        console.log(oneContact);
        break;

      case "add":
        const newContact = await contactService.addContact(name, email, phone);
        console.log(newContact);
        break;

      case "remove":
        const deleteContact = await contactService.removeContact(id);
        console.log(deleteContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
invokeAction(options);
