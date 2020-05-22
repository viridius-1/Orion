class Api::V1::AuthenticateController < Api::BaseController

  api :POST, '/v1/tapclicks/authenticate'
  param :token, String, desc: 'Token should be the string that was passed to your server from Version2', required: true

  def create
    if permitted_params[:token]
      token = Connection.where(token: permitted_params[:token]).active
      if token.any?
        user_email = token.user.email
        render status: 200, json: {
          email: user_email
        }
      else
        render status: :unauthorized, nothing: true
      end
    else
      render status: :bad_request, json: { message: "Missing parameter: token" }
    end

  end

  private 

  def permitted_params
    params.permit(:token)
  end

end