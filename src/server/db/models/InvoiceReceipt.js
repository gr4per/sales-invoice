"use strict";
const Sequelize = require("sequelize");

module.exports.init = function(db, config) {
  /**
   * InvoiceReceipt
   * @class InvoiceReceipt
   */
  return db.define('InvoiceReceipt',
    /** @lends InvoiceReceipt */
    {
      /**
       * Primary key.
       */
      key: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: 'InvoiceReceiptSN'
      },
      blockingReason: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'BlockingReason'
      },
      /*
       *  Planed booking date, required
       *  Is initialised with the actual date in InvoiceReceipt UI.
       */
      bookingDate: {
        type: Sequelize.DATE(),
        allowNull: false,
        field: 'BookingDate'
      },
      changedBy: {
        type: Sequelize.STRING(60),
        allowNull: false,
        field: 'ChangedBy',
        defaultValue: 'jcadmin'
      },
      changedOn: {
        type: Sequelize.DATE(),
        allowNull: false,
        field: 'ChangedOn',
        defaultValue: Sequelize.NOW
      },
      /**
       * Internal comment (also see order text which is for external usage).
       */
      commentary: {
        type: Sequelize.STRING(2000),
        allowNull: true,
        field: 'Commentary'
      },
      /**
       * Fields are set by the Invoice Validation dialog.
       * In this dialog IR can be approved are blocked.
       */
      confirmationUserName: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'ConfirmationUserName'
      },
      confirmedAt: {
        type: Sequelize.DATE(),
        allowNull: true,
        field: 'ConfirmedAt'
      },
      createdBy: {
        type: Sequelize.STRING(60),
        allowNull: false,
        field: 'CreatedBy',
        defaultValue: 'jcadmin'
      },
      createdOn: {
        type: Sequelize.DATE(),
        allowNull: false,
        field: 'CreatedOn',
        defaultValue: Sequelize.NOW
      },
      creditNote: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'CreditNote'
      },
      /**
       * Currency used for the complete SalesOrder, PurchaseOrder or InvoiceReceipt.
       * The totalNetPrice and the totalGrossPrice are related to this currency.
       */
      currencyId: {
        type: Sequelize.STRING(3),
        allowNull: false,
        field: 'CurrencyID'
      },
      /**
       * Customer Assignment for SO, PO, IR.
       * During generation of the SalesOrder in OPC the customer is
       * taken from the User (catalogUser2Customer and the corresponding RegistryAttributeValue
       * which holds the actual customer assignment for every User, see "jcatalog.user.assignedCustomer").
       * When creating the purchaseOrder we take the customer from corresponding SO,
       * in IR we take the customer from corresponding PO.
       * In the whole PROC App there is an absolute separation of the main Objects (SO, PO, GR, IR)
       * by the customer! A User (even an admin user) with assignment to customer "A" will have access to
       * the transactional objects of this customer "A".
       */
      customerId: {
        type: Sequelize.STRING(30),
        allowNull: false,
        field: 'CustomerID'
      },
      /**
       * Ext. Invoice ReceiptID
       * Initialised with the value from invoiceReceiptId.
       */
      extInvoiceReceiptId: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'ExtInvoiceReceiptID'
      },
      /**
       * We use the Footer Text inside our standard PurchaseOrder Formular (PDF).
       * The footer text can contain company and address information for example.
       */
      footerText: {
        type: Sequelize.STRING(2000),
        allowNull: true,
        field: 'FooterText'
      },
      /**
       * Currently unused field.
       */
      freightNet: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true,
        field: 'FreightNet'
      },
      /**
       * Currently unused field.
       */
      freightTax: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true,
        field: 'FreightTax'
      },
      /**
       * The real date from the original Invoice document, required
       */
      invoiceDate: {
        type: Sequelize.DATE(),
        allowNull: false,
        field: 'InvoiceDate'
      },
      /**
       * Automatically generated ID for the Invoice Receipt
       */
      invoiceReceiptId: {
        type: Sequelize.STRING(30),
        allowNull: true,
        field: 'InvoiceReceiptID'
      },
      methodOfPaymentId: {
        type: Sequelize.STRING(20),
        allowNull: false,
        field: 'MethodOfPaymentID'
      },
      /**
       * Additional information for the Supplier which can be input by the requisitioner in OPC.
       * This ordertext is displayed in the PDF Order Formular (which is sent to the supplier).
       * Very often this text is also transfered to external systems (if they are integrated).
       */
      orderText: {
        type: Sequelize.STRING(2000),
        allowNull: true,
        field: 'OrderText'
      },
      /**
       * This field holds the main status information for SalesOrders, PurchaseOrders and InvoiceReceipts.
       * The transfers from one status to another one is set automatically by the application:
       * When approval workflow is started status of SalesOrder is set to "inApproval".
       * When PurchaseOrder is generated status of SalesOrder is set to "ordered".
       * The status information is displayed in our standard Procurement Reports
       * and filtering by the status is also possible.
       */
      statusId: {
        type: Sequelize.STRING(20),
        allowNull: false,
        field: 'StatusID'
      },
      /**
       * The supplier of the incoming Invoice.
       */
      supplierId: {
        type: Sequelize.STRING(30),
        allowNull: false,
        field: 'SupplierID'
      },
      /*
       *  During IR Generation termsOfDelivery, methodOfPayment
       *  and termsOfPayment are initialised with the appropriate values from
       *  corresponding PurchaseOrder.
       */
      termsOfDeliveryId: {
        type: Sequelize.STRING(20),
        allowNull: true,
        field: 'TermsOfDeliveryID'
      },
      termsOfPaymentId: {
        type: Sequelize.STRING(20),
        allowNull: false,
        field: 'TermsOfPaymentID'
      },
      /**
       * Currently unused field.
       */
      totalFreight: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true,
        field: 'TotalFreight'
      },
      /**
       * totalGrossPrice = totalNetPrice + totalTaxAmount
       */
      totalGrossPrice: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true,
        field: 'TotalGrossPrice'
      },
      /**
       * Sum of totalNetPrices of all items (SOI, POI, IRI)
       * based on the transactionHeader currency
       * except canceled items.
       */
      totalNetPrice: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true,
        field: 'TotalNetPrice'
      },
      /**
       * Sum of all item taxAmounts.
       * taxAmount =  Math.round(taxBaseAmount*tax.percentage)/100
       * (also see PriceService)
       */
      totalTaxAmount: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true,
        field: 'TotalTaxAmount'
      },
      transferStatusId: {
        type: Sequelize.STRING(20),
        allowNull: true,
        field: 'TransferStatusID'
      },
      /**
       * Field is used to differ between Invoices and creditNotes.
       */
      type: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'Type'
      },
      /**
       * UDX fields are reserved for additional (often customer specific) information.
       */
      udxNum1: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true,
        field: 'UdxNum1'
      },
      udxNum2: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true,
        field: 'UdxNum2'
      },
      udxNum3: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true,
        field: 'UdxNum3'
      },
      udxSortKey1: {
        type: Sequelize.STRING(6),
        allowNull: true,
        field: 'UdxSortKey1'
      },
      udxSortKey2: {
        type: Sequelize.STRING(6),
        allowNull: true,
        field: 'UdxSortKey2'
      },
      udxSortKey3: {
        type: Sequelize.STRING(6),
        allowNull: true,
        field: 'UdxSortKey3'
      },
      udxText1: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'udxText1'
      },
      udxText2: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'udxText2'
      },
      udxText3: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'udxText3'
      },
      /**
       * Loginname (last loginname) of the user who generated the SO/PO PDF.
       * This field is also set in case that PurchaseOrder-PDF
       * is automatically generated and sent to the supplier by email.
       */
      printedBy: {
        type: Sequelize.STRING(60),
        allowNull: true,
        field: 'PrintedBy'
      },
      /**
       * Date (last date) when SO/PO PDF was generated.
       * Date value is also set in case that PurchaseOrder-PDF
       * is automatically generated and sent to the supplier by email.
       */
      printedOn: {
        type: Sequelize.DATE(),
        allowNull: true,
        field: 'PrintedOn'
      },
      /**
       * Invoice Address of the Customer.
       * Available InvoiceAddresses are defined in CustomerAddress table
       * of type "INVOICE".
       */
      invoiceAddressAreaCode: {
        type: Sequelize.STRING(10),
        allowNull: true,
        field: 'invoice_address_area_code'
      },
      invoiceAddressCity: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'invoice_address_city'
      },
      invoiceAddressCountry: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'invoice_address_country'
      },
      invoiceAddressEmail: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'invoice_address_email'
      },
      invoiceAddressFaxNo: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'invoice_address_fax_no'
      },
      invoiceAddressIsCompany: {
        type: Sequelize.CHAR(1),
        allowNull: true,
        field: 'invoice_address_is_company'
      },
      invoiceAddressName1: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'invoice_address_name1'
      },
      invoiceAddressName2: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'invoice_address_name2'
      },
      invoiceAddressName3: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'invoice_address_name3'
      },
      invoiceAddressPbxZipCode: {
        type: Sequelize.STRING(10),
        allowNull: true,
        field: 'invoice_address_pbx_zip_code'
      },
      invoiceAddressPhoneNo: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'invoice_address_phone_no'
      },
      invoiceAddressPobox: {
        type: Sequelize.STRING(10),
        allowNull: true,
        field: 'invoice_address_pobox'
      },
      invoiceAddressSalutation: {
        type: Sequelize.STRING(20),
        allowNull: true,
        field: 'invoice_address_salutation'
      },
      invoiceAddressStreet: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'invoice_address_street'
      },
      invoiceAddressZipCode: {
        type: Sequelize.STRING(10),
        allowNull: true,
        field: 'invoice_address_zip_code'
      },
      /**
       * A CostDistribution contains references to CostObjects (in CostDistributionPos)
       * of the same CostObject Type (CostCenter, Project, intOrder or for example).
       * Example CostDistribution:
       * 20% Presales
       * 40% Development
       * 40% Service
       * Total percentage must be 100% (For SO Costdistribution in OPC validation is included).
       * CostDistributions can be defined either for the transactionHeader
       * or for the transactionItems. In OPC the CostDistribution information
       * is copied from the header (SalesOrder) to every position (SalesOrderItem).
       * On Item level user can overwrite this distribution.
       * During PurchaseOrder Generation the costDistribution informations are
       * duplicated (from corresponding SO) so that the PO gets a reference to a new
       * created CostDistribution.
       */
      costDistributionSn: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        field: 'CostDistributionSN'
      },
      invoiceAddressState: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'invoice_address_state'
      },
      /**  Indicates that this order was created on behalf of
       * another user. The "Buying on Behalf Of" feature
       * allows one user to create orders for another one user
       * of the same customer using that user's views.
       */
      onBehalfOf: {
        type: Sequelize.STRING(60),
        allowNull: true,
        field: 'onBehalfOf'
      },
      invoiceAddressMethod: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'invoice_address_method'
      },
      /**
       * Person who received invoice.
       */
      receivingPerson: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'ReceivingPerson'
      },
      /**
       * Date on which invoice was received by customer (DE: Eingangsdatum).
       */
      receivedOn: {
        type: Sequelize.DATE(),
        allowNull: true,
        field: 'ReceivedOn'
      },
      /**
       * Date on which invoice was scanned with OCR (DE: Scandatum).
       */
      scannedOn: {
        type: Sequelize.DATE(),
        allowNull: true,
        field: 'ScannedOn'
      },
      /**
       * Due date for the payment.
       * dueDate = invoiceDate + TermsOfPayment.netDays
       */
      dueDate: {
        type: Sequelize.DATE(),
        allowNull: true,
        field: 'DueDate'
      },
      /**
       * Due date for the first discount.
       *  dueDate = invoiceDate + TermsOfPayment.discountDays1
       */
      dueDateEarlyDiscount: {
        type: Sequelize.DATE(),
        allowNull: true,
        field: 'DueDateEarlyDiscount'
      },
      /**
       * Due date for the first discount.
       *  dueDate = invoiceDate + TermsOfPayment.discountDays2
       */
      dueDateLateDiscount: {
        type: Sequelize.DATE(),
        allowNull: true,
        field: 'DueDateLateDiscount'
      },
      /**
       * For early payment discount.
       *  default: total value of invoice
       */
      discountableValue: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true,
        field: 'DiscountableValue'
      },
      /**
       * earlyDiscount = discountableValue * TermsOfPayment.discountPerc1
       */
      earlyDiscount: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true,
        field: 'EarlyDiscount'
      },
      /**
       * lateDiscount = discountableValue * TermsOfPayment.discountPerc2
       */
      lateDiscount: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true,
        field: 'LateDiscount'
      },
      /**
       * For accounting integration (DE: Buchungssatz).
       */
      accountingRecordId: {
        type: Sequelize.STRING(30),
        allowNull: true,
        field: 'AccountingRecordID'
      },
      /**
       * Customer country. Also available in customer address.
       * Used for tax validation.
       */
      customerCountryId: {
        type: Sequelize.STRING(2),
        allowNull: true,
        field: 'CustomerCountryID'
      },
      /**
       * Customer state. Also available in customer address.
       * Used for tax validation.
       */
      customerState: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'CustomerState'
      },
      /**
       * Supplier country. Also available in supplier address.
       * Used for tax validation.
       */
      supplierCountryId: {
        type: Sequelize.STRING(2),
        allowNull: true,
        field: 'SupplierCountryID'
      },
      /**
       * Supplier state. Also available in supplier address.
       * Used for tax validation.
       */
      supplierState: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'SupplierState'
      },
      /**
       * Approval workflow status
       */
      approvalStatus: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'ApprovalStatus'
      },
      /**
       * Approval workflow assignee
       */
      assignee: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'Assignee'
      },
      /**
       * Intrastat is the system for collecting information and producing statistics
       * on the trade in goods between countries of the European Union (EU). It began
       * operation on 1 January 1993, when it replaced customs declarations as the
       * source of trade statistics within the EU. The requirements of Intrastat are
       * similar in all member states of the EU, although there are important
       * exceptions.
       * Each member country establishes an annual threshold value below which a
       * business is not required to file Intrastat forms. The reporting thresholds
       * vary from country to country and, within one country, may be different for
       * dispatches (exports) and arrivals (imports).
       * [source: https://en.wikipedia.org/wiki/Intrastat].
       */
      intrastatId: {
        type: Sequelize.STRING(10),
        allowNull: false,
        field: 'IntrastatID'
      },
      swiftCode: {
        type: Sequelize.STRING(11),
        allowNull: true,
        field: 'SwiftCode'
      },
      iban: {
        type: Sequelize.STRING(43),
        allowNull: true,
        field: 'IBAN'
      },
      /**
       * Reference to tax
       * Is used for evaluation of the gross prices.
       */
      taxId: {
        type: Sequelize.STRING(60),
        allowNull: true,
        field: 'TaxID'
      },
      taxCountryId: {
        type: Sequelize.STRING(3),
        allowNull: true,
        field: 'TaxCountryID'
      },
      taxRate: {
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true,
        field: 'TaxRate'
      },
      /**
       * Field provided as free text field. Use case example: if there is no ref. Nbr,
       * we can inform - invoicing details as free text, e.g.
       * "Invoicer Olli Juntune, paid 22.10.2016, for customer ABC".
       */
      referenceInformation: {
        type: Sequelize.STRING(140),
        allowNull: true,
        field: 'ReferenceInformation'
      },
      /**
       * Used for storing any external PO number.
       * Supplier adds the number manually from external source.
       */
      orderNumber: {
        type: Sequelize.STRING(30),
        allowNull: true,
        field: 'OrderNumber'
      },
      /**
       * Defines the time interval of service delivery, optional
       */
      periodOfServiceFrom: {
        type: Sequelize.DATE(),
        allowNull: true,
        field: 'PeriodOfServiceFrom'
      },
      /**
       * Defines the time interval of service delivery, optional
       */
      periodOfServiceTo: {
        type: Sequelize.DATE(),
        allowNull: true,
        field: 'PeriodOfServiceTo'
      }
    }, {
      classMethods: {
        associate: function(models) {
          models.InvoiceReceipt.hasOne(models.CostDistribution, {
            as: 'costDistribution',
            foreignKey: 'CostDistributionSN',
            targetKey: 'CostDistributionSN'
          });
          models.InvoiceReceipt.hasMany(models.InvoiceReceiptItem, {
            as: 'invoiceReceiptItems',
            foreignKey: 'InvoiceReceiptSN',
            targetKey: 'InvoiceReceiptSN',
            onDelete: 'cascade'
          });
        }
      },
      timestamps: false,
      tableName: 'InvoiceReceipt'
    });
};
