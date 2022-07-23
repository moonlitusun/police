import React from 'react';
import { QuoteClientContext, IClientContext } from '../components/context';

export const useQuoteClient = (): IClientContext => {
  const context = React.useContext(QuoteClientContext);

  if (!context) {
    throw new Error(
      'could not find quoteClient context value; please ensure the component is wrapped in a <QuoteClientProvider>'
    )
  }
  return context;
};
