import React, { PropTypes } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

const InvoiceItemsPricePanel = ({ priceInfo, onAddPositions, readOnly }, context) => {
  const { i18n } = context;
  return (
    <div className="form-submit text-right">
      <span className="invoiceReceiptItemsTotalPriceSum">
        {`${i18n.getMessage('Labels.totalNetPrice')}:
          ${priceInfo ? `${priceInfo.totalNetPrice} ${priceInfo.currency}` : ''} `}
      </span>
      <span className="invoiceReceiptItemsTotalPriceSum">
        {`${i18n.getMessage('Labels.totalTaxAmount')}:
          ${priceInfo ? `${priceInfo.totalTaxAmount} ${priceInfo.currency}` : ''} `}
      </span>
      <span className="invoiceReceiptItemsTotalPriceSum">
        {`${i18n.getMessage('Labels.totalGrossPrice')}:
          ${priceInfo ? `${priceInfo.totalGrossPrice} ${priceInfo.currency}` : ''} `}
      </span>
      {!readOnly ?
        <Button onClick={onAddPositions}>
          <Glyphicon glyph="plus"/>&nbsp;
          {i18n.getMessage('Commands.addPositions')}
        </Button> : null
      }
    </div>
  );
};

InvoiceItemsPricePanel.propTypes = {
  priceInfo: PropTypes.object,
  onAddPositions: PropTypes.func.isRequired,
  readOnly: PropTypes.bool
};

InvoiceItemsPricePanel.contextTypes = {
  i18n: PropTypes.object.isRequired
};

InvoiceItemsPricePanel.defaultProps = {
  readOnly: false
};

export default InvoiceItemsPricePanel;

