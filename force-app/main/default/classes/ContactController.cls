public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        try {
            // Uncomment the next line to force an error
            // throw new AuraHandledException('An error occurred while retrieving contacts.');
            
            return [SELECT FirstName, LastName, Email FROM Contact LIMIT 100];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}