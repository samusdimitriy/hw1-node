const { Command } = require("commander");
const program = new Command();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

program
  .option("-a, --action <type>", "выберите действие")
  .option("-i, --id <type>", "идентификатор пользователя")
  .option("-n, --name <type>", "имя пользователя")
  .option("-e, --email <type>", "электронная почта пользователя")
  .option("-p, --phone <type>", "телефон пользователя");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.log(allContacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Неизвестный тип действия!");
  }
}

invokeAction(argv);
