require 'stripe'

class Api::V1::ChargesController < ApplicationController
        skip_before_action :authorized
@@project_id = 0

    def create
        Stripe.api_key = 'sk_test_51HRjLwFVMZF5LB9VsVnI2sj1QSuuf3O1MjRD3RzxiB7W7OVMm6ejPwdRUxfXXlLlhuMXvrxBysZIfPCO1ZDKjHnX00YRKVn3ws'
        #fake it till you make it -  This is to update the project ammount after purchase.
        @@project_id = params[:project_id]
        session = Stripe::Checkout::Session.create({
            payment_method_types: ['card'],
            metadata: {'project_id' => "#{params[:project_id]}"}, 
            line_items: [
              price_data: {
                  product: 'prod_I41wvs8eDikYVe',
                currency: 'usd',
                unit_amount: params[:chargeAmount],
                
              },
              quantity: 1
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/browse',
        })
        Stripe::PaymentIntent.update(
            'pi_1HRjNMFVMZF5LB9VobMwlX2g',
            metadata: {'project_id' => params[:project_id],}
          )
        render json: { id: session.id }
        
    end
    
    def update
        if params[:data][:object][:payment_status] == 'paid'
        project = Project.find(params[:data][:object][:metadata][:project_id])
            if project.sponsor_amount == nil
                project_sponsor_amount = 0
                new_amount = (project_sponsor_amount + (params[:data][:object][:amount_total] / 100))
                project.update(sponsor_amount: new_amount)
            else
                project_sponsor_amount = project.sponsor_amount
                new_amount = (project_sponsor_amount.to_i + (params[:data][:object][:amount_total] / 100))
                project.update(sponsor_amount: new_amount)
            end
        end
    end
end
