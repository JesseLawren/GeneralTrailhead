import { LightningElement, wire } from 'lwc';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { reduceErrors } from 'c/ldsUtils';

const COLUMNS = [
    {label:'First Name', fieldName: FirstName.fieldApiName, type:'text'},
    {label:'Last Name', fieldName:LastName.fieldApiName, type:'text'},
    {label:'Email', fieldName: Email.fieldApiName, type:'text'}
];

export default class ContactList extends LightningElement {
    columns = COLUMNS;
    contacts;

    @wire(getContacts)
    wireContacts({error, data}) {
        if(data) {
            this.contacts = data;
            this.error = undefined;   
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    get errors() {
        return this.error ? reduceErrors(this.error) : [];
    }

}