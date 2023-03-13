const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname,'/db/contacts.json');
const { v4: uuidv4 } = require('uuid');


console.log(contactsPath);

const listContacts = async ()=> {
    const contacts = await fs.readFile(contactsPath,'utf-8');
    console.log('contacts ',contacts);

    return contacts;   
  }
  
  const getContactById = async (contactId) => {
    const contacts = await fs.readFile(contactsPath,'utf-8');
    const parsedContacts = JSON.parse(contacts );   
    const contact = parsedContacts.filter((item) => item.id === contactId);
    console.log('contact ',contact[0]);
    
    return contact;   
  }
  
  const removeContact = async(contactId) => {
    const contacts = await fs.readFile(contactsPath,'utf-8');    
    const parsedContacts = JSON.parse(contacts ); 
    const index = parsedContacts.findIndex(item => item.id === contactId);
    if (index === -1){
      return null;
    }
    const contactsAfterDeleting = JSON.stringify(parsedContacts.filter((item) => item.id !== contactId));
    await fs.writeFile(contactsPath,contactsAfterDeleting);  
    
    console.log('deleted contact ',parsedContacts[index]);
    return parsedContacts[index];
  }
  
  const addContact = async (contact) => {
    const newContact = {id: uuidv4(),...contact};
    const contacts = await fs.readFile(contactsPath,'utf-8');    
    const parsedContacts = JSON.parse(contacts); 
    parsedContacts.push(newContact); 
    await fs.writeFile(contactsPath,JSON.stringify(parsedContacts));  
    
    console.log('added contact ',newContact);
    return newContact;
  }

  module.exports = {listContacts, getContactById, removeContact, addContact};