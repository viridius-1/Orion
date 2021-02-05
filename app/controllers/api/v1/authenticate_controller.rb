class Api::V1::AuthenticateController < Api::BaseController
  skip_before_action :verify_authenticity_token
  api :POST, '/v1/tapclicks/authenticate'
  param :token, String, desc: 'Token should be the string that was passed to your server from Version2', required: true

  def create
    token = Connection.where(token: permitted_params[:token]).active
    if token.any?
      # Get user from submitted token
      user = token.first.user
      # Clear out old token and create new one
      user.refresh_token
      render status: 200, json: {
        email: user.email
      }
    else
      render status: :bad_request, json: { message: 'The submitted token is not active or does not exist'}
    end
  end

  private

  def permitted_params
    params.permit(:token)
  end
end
