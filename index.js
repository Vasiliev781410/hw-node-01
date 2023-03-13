const methods = require('./contacts.js'); 
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

//{ action, id, name, email, phone }
async function invokeAction( {action, id, name, email, phone}  ) {
    switch (action) {
      case "list":
        const contacts = await methods.listContacts();      
        break;
  
      case "get":
        const contact = await methods.getContactById(id);      
        break;
  
      case "add":
        const newContact = await methods.addContact({name, email, phone}); 
        break;
  
      case "remove":
        const deletedContact = await methods.removeContact(id);  
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }

invokeAction(argv);
