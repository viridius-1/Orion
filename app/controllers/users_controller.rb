class UsersController < ApplicationController
  before_action :set_company
  before_action :set_user, only: [:edit, :update, :destroy]

  def index
    @users = @company.users
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
    if @user.update(user_params)
      company_type = current_user.company_type.downcase.to_sym
      correct_paths = if company_type == :agency
                        agency_users_path
                      elsif company_type == :advertiser
                        advertiser_users_path
                      end

      redirect_to correct_paths, notice: 'User has been successfully updated.'
    else
      errors = { alert: @user.errors.full_messages.join(', ') }
      redirect_to edit_advertiser_user_path(@user, user: user_params), errors
    end
  end

  def destroy
    if current_user != @user
      if @user.destroy
        flash[:notice] = 'User successfully deleted'
      else
        flash[:alert] = 'Unable to remove user'
      end
    else
      flash[:alert] = 'You cannot delete yourself'
    end
    redirect_back(fallback_location: root_path)
  end

  private

  def set_company
    @company = current_user.company
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Never trust parameters from the scary internet,
  # only allow the white list through.
  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :company,
      :email,
      :password,
      :roles
    )
  end
end
