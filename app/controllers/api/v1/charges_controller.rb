require 'stripe'

class Api::V1::ChargesController < ApplicationController


    def create
        Stripe.api_key = 'sk_test_51HRjLwFVMZF5LB9VsVnI2sj1QSuuf3O1MjRD3RzxiB7W7OVMm6ejPwdRUxfXXlLlhuMXvrxBysZIfPCO1ZDKjHnX00YRKVn3ws'

        #fake it till you make it -  This is to update the project ammount after purchase.
        project = Project.find(params[:projectId])
        if project.sponsor_amount == nil
            project_sponsor_amount = 0
            new_amount = (project_sponsor_amount + (params[:chargeAmount] / 100))
            project.update(sponsor_amount: new_amount)
        else
            project_sponsor_amount = project.sponsor_amount
            new_amount = (project_sponsor_amount.to_i + (params[:chargeAmount] / 100))
            project.update(sponsor_amount: new_amount)
        end
        
        

        session = Stripe::Checkout::Session.create({
            payment_method_types: ['card'],
            line_items: [
              price_data: {
                  product: 'prod_I41wvs8eDikYVe',
                currency: 'usd',
                unit_amount: params[:chargeAmount],
                
              },
              quantity: 1
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/browse',
            cancel_url: 'http://localhost:3000/cancel',
        })

        render json: { id: session.id }

    end
    
    
    # Stup 
    # def webhook 
    #     byebug
    #     webhook_secret = ENV['STRIPE_WEBHOOK_SECRET']
    #     payload = request.body.read
    #     if !webhook_secret.empty?
    #       # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
    #       sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    #       event = nil
      
    #       begin
    #         event = Stripe::Webhook.construct_event(
    #           payload, sig_header, webhook_secret
    #         )
    #       rescue JSON::ParserError => e
    #         # Invalid payload
    #         status 400
    #         return
    #       rescue Stripe::SignatureVerificationError => e
    #         # Invalid signature
    #         puts '⚠️  Webhook signature verification failed.'
    #         status 400
    #         return
    #       end
    #     else
    #       data = JSON.parse(payload, symbolize_names: true)
    #       event = Stripe::Event.construct_from(data)
    #     end
    #     # Get the type of webhook event sent - used to check the status of PaymentIntents.
    #     event_type = event['type']
    #     data = event['data']
    #     data_object = data['object']
      
    #     puts '🔔  Payment succeeded!' if event_type == 'checkout.session.completed'
      
    #     content_type 'application/json'
    #     {
    #       status: 'success'
    #     }.to_json
    # end

end
