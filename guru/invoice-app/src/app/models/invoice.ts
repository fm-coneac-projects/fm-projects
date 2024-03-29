export interface InvoiceHeader {
  status: string,
  number: string,
  date: Date,
  paymentDue: Date,

  vendorName: string
  vendorAddress: string,
  clientName: string,
  clientAddress: string
  clientEmail: string
}

export interface InvoiceItem {
  itemName: string,
  quantity: number,
  price: number,
  total: number
}

export interface Invoice {
  id: string,
  header: InvoiceHeader,
  rows: Array<InvoiceItem>
}


// Creating an invoice
// When creating a new invoice, an ID needs to be created. Each ID should be 2 random uppercased letters followed by 4 random numbers.
//   Invoices can be created either as drafts or as pending. Clicking "Save as Draft" should allow the user to leave any form field blank, but should create an ID if one doesn't exist and set the status to "draft". Clicking "Save & Send" should require all forms fields to be filled in, and should set the status to "pending".
// Changing the Payments Terms field should set the paymentDue property based on the createdAt date plus the numbers of days set for the payment terms.
//   The total should be the sum of all items on the invoice.
//   Editing an invoice
// When saving changes to an invoice, all fields are required when the "Save Changes" button is clicked. If the user clicks "Cancel", any unsaved changes should be reset.
//   If the invoice being edited is a "draft", the status needs to be updated to "pending" when the "Save Changes" button is clicked. All fields are required at this stage.
//   Users should be able to mark invoices as paid by clicking the "Mark as Paid" button. This should change the invoice's status to "paid".
// Users should receive a confirmation modal when trying to delete invoices.
//   Feel free not to add cus
