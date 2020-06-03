class Api::BaseController < ActionController::Base
  before_action :token_verified?

  rescue_from Apipie::ParamError do |e|
    render status: :unprocessable_entity, json: { message: e.to_s }
  end


  private

  def token_verified?
    return true if request.authorization == ENV['tapclicks_api_key']
    render status: :unauthorized, json: { error: 'Access denied - invalid API Key' }
  end

end
