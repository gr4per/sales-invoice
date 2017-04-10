import React from 'react';
import { Route } from 'react-router';
import Layout from '../containers/Layout.react';
import InvoiceOverview from '../containers/InvoiceOverview.react';
import EditInvoice from '../containers/EditInvoice.react';
import InvoicePositions from '../containers/InvoicePositions.react';
import CreateInvoice from '../containers/CreateInvoice.react';

export default (pathPrefix) => {
  return (
    <Route component={Layout}>
      <Route path="/" component={InvoiceOverview}/>
      <Route path="/create" component={CreateInvoice}/>
      <Route path="/edit/:id" component={EditInvoice}/>
      <Route path="/edit/:id/items" component={InvoicePositions}/>
    </Route>
  );
}