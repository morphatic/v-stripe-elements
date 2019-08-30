function Stripe(publicKey: string, options?: stripe.StripeOptions): stripe.Stripe {
  // createToken(element: stripe.elements.Element, options?: stripe.TokenOptions): Promise<stripe.TokenResponse>
  // createToken(name: 'bank_account', options: stripe.BankAccountTokenOptions): Promise<stripe.TokenResponse>
  // createToken(name: 'pii', options: stripe.PiiTokenOptions): Promise<stripe.TokenResponse>
  function createToken(element: stripe.elements.Element|string, options?: any): Promise<stripe.TokenResponse> {
    const token = {
      id: 'tok_1FDHCy2eZvKYlo2CPBL8Ss6R',
      object: 'token',
      client_ip: '127.0.0.1',
      created: 1567198836,
      livemode: false,
      type: 'card',
      used: false,
    }
    const error: stripe.Error = { type: 'invalid_request_error', charge: '12345', message: 'Not implemented' }
    const result = options ? { token } : { error }
    return Promise.resolve(result)
  }

  // createSource(element: stripe.elements.Element, options?: { owner?: stripe.OwnerInfo }): Promise<stripe.SourceResponse>
  // createSource(options: stripe.SourceOptions): Promise<stripe.SourceResponse>
  function createSource(element: stripe.elements.Element|stripe.SourceOptions, options?: { owner?: stripe.OwnerInfo }): Promise<stripe.SourceResponse> {
    const source = {
      client_secret: 'src_client_secret_Fiid9vTLYWwwNuGHggNiPKVe',
      created: 1567198783,
      currency: null,
      id: 'src_1FDHC72eZvKYlo2COq7NiXT8',
      object: 'source',
      owner: {
          address: null,
          email: null,
          name: null,
          phone: null,
          verified_address: null,
          verified_email: null,
          verified_name: null,
          verified_phone: null,
      },
      usage: 'reusable'
    }
    const error: stripe.Error = { type: 'invalid_request_error', charge: '12345', message: 'Not implemented' }
    const result = options ? { source } : { error }
    return Promise.resolve(result)
  }

  /**
   * TODO: Implement a mock here that will support our tests
   */
  function retrieveSource(options: stripe.RetrieveSourceOptions): Promise<stripe.SourceResponse> {
    throw new Error('Method not implemented.')
  }

  function redirectToCheckout(
    options: stripe.StripeClientCheckoutOptions|stripe.StripeServerCheckoutOptions
  ): Promise<{ error: stripe.Error }> {
    throw new Error('Method not implemented.')
  }

  function paymentRequest(options: stripe.paymentRequest.StripePaymentRequestOptions): stripe.paymentRequest.StripePaymentRequest {
    throw new Error('Method not implemented.')
  }

  function createPaymentMethod(type: stripe.paymentMethod.paymentMethodType, element: stripe.elements.Element, options?: stripe.CreatePaymentMethodOptions): Promise<stripe.PaymentMethodResponse> {
    throw new Error('Method not implemented.')
  }

  function retrievePaymentIntent(clientSecret: string): Promise<stripe.PaymentIntentResponse> {
    throw new Error('Method not implemented.')
  }

  // handleCardPayment(clientSecret: string, element: stripe.elements.Element, options?: stripe.HandleCardPaymentOptions): Promise<stripe.PaymentIntentResponse>
  // handleCardPayment(clientSecret: string, options?: stripe.HandleCardPaymentWithoutElementsOptions): Promise<stripe.PaymentIntentResponse>
  function handleCardPayment(clientSecret: any, element?: any, options?: any): Promise<stripe.PaymentIntentResponse> {
    throw new Error('Method not implemented.')
  }

  function handleCardAction(clientSecret: string): Promise<stripe.PaymentIntentResponse> {
    throw new Error('Method not implemented.')
  }

  // handleCardSetup(clientSecret: string, element: stripe.elements.Element, data: stripe.HandleCardSetupOptions): Promise<stripe.SetupIntentResponse>
  // handleCardSetup(clientSecret: string, data: stripe.HandleCardSetupOptionsWithoutElementsOptions): Promise<stripe.SetupIntentResponse>
  function handleCardSetup(clientSecret: any, element: any, data?: any): Promise<stripe.SetupIntentResponse> {
    throw new Error('Method not implemented.')
  }

  // confirmPaymentIntent(clientSecret: string, element: stripe.elements.Element, options?: stripe.ConfirmPaymentIntentOptions): Promise<stripe.PaymentIntentResponse>
  // confirmPaymentIntent(clientSecret: string, options?: stripe.ConfirmPaymentIntentWithoutElementsOptions): Promise<stripe.PaymentIntentResponse>
  function confirmPaymentIntent(clientSecret: any, element?: any, options?: any): Promise<stripe.PaymentIntentResponse> {
    throw new Error('Method not implemented.')
  }
  // const version = 3

  if (!publicKey) throw Error('You cannot initialize Stripe without an API key.')
  function elements (opts: stripe.elements.ElementsCreateOptions): stripe.elements.Elements {
    return {
      create: (type: string, opts: stripe.elements.ElementsOptions = {}): stripe.elements.Element => {
        // switch (type) {
        //   case 'card':
        //   case 'cardNumber':
        //   case 'cardExpiry':
        //   case 'cardCvc':
        //   case 'paymentRequestButton':
        //   case 'iban':
        //   case 'idealBank':
            return {
              mount: jest.fn(),
              on(
                event: stripe.elements.eventTypes|'click',
                handler: stripe.elements.handler|((response: { preventDefault: () => void }) => void)
              ): void {
                // associate the event with the passed-in handler
                this[event] = handler
              },
              // on(event: 'click', handler: (response: { preventDefault: () => void }) => void): void {},
              focus(): void {},
              blur(): void {},
              clear: jest.fn(),
              unmount(): void {},
              destroy(): void {},
              update(options: stripe.elements.ElementsOptions): void {},  
            }
        // }
      }
    }
  }
  return {
    createToken,
    createSource,
    retrieveSource,
    redirectToCheckout,
    paymentRequest,
    createPaymentMethod,
    retrievePaymentIntent,
    handleCardPayment,
    handleCardAction,
    handleCardSetup,
    confirmPaymentIntent,
    elements
  }
}

export default Stripe
