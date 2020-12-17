class Users::InvitationsController < Devise::InvitationsController
  before_action :configure_permitted_parameters

  def create
    self.resource = invite_resource
    resource_invited = resource.errors.empty?

    yield resource if block_given?

    if resource_invited
      CompanyMember.create(company_id: params[:company_id],
                           company_type: params[:company_type],
                           user_id: resource.id)

      if is_flashing_format? && self.resource.invitation_sent_at
        set_flash_message :notice, :send_instructions, email: self.resource.email
      end
      if self.method(:after_invite_path_for).arity == 1
        respond_with resource, location: after_invite_path_for(current_inviter)
      else
        respond_with resource, location: after_invite_path_for(current_inviter, resource)
      end
    else
      respond_with_navigational(resource) { render :new }
    end
  end

  protected

  def after_invite_path_for(current_inviter, resource)
    if params[:company_type] == "Advertiser"
      advertiser_users_path(advertiser_id: params[:company_id])
    elsif params[:company_type] == "Agency"
      agency_users_path(agency_id: params[:company_id])
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:invite, keys: [:first_name,:last_name,:company_id,:company_type])
  end
end
