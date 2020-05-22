class Api::BaseController < ActionController::Base

  rescue_from Apipie::ParamError do |e|
    render status: :unprocessable_entity, json: { message: e.to_s }
  end

  def authorize
    unless current_user.present?
      logger.debug 'User not authenticated'
      logger.debug "Auth token: #{request.headers['Authorization']}"
      render status: :unauthorized, nothing: true
    end
  end

  def require_login!
    return true if authenticate_token
    render json: { errors: [{ detail: 'Access denied' }] }, status: 401
  end

  def current_user
    @current_user ||= authenticate_token
  end

  private

  def authenticate_token
    Api::Connection.find_by(token: request.headers['Authorization'])&.user
  end

end
