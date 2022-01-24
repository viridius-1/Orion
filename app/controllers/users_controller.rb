class UsersController < ApplicationController
  load_and_authorize_resource only: [:edit, :update]

  def edit
  end

  def update
    if user_wants_password_change?
      # Using https://github.com/heartcombo/devise/wiki/How-To:-Allow-users-to-edit-their-password#solution-3
      # to implement password change
      if @user.update_with_password(user_update_params)
        bypass_sign_in(@user)
        redirect_to dashboard_index_path, notice: 'User has been successfully updated.'
      else
        errors_message = { alert: @user.errors.full_messages.join(', ') }
        redirect_to edit_user_path(@user), errors_message
      end
    else
      if @user.update(user_update_params)
        redirect_to dashboard_index_path, notice: 'User has been successfully updated.'
      else
        errors_message = { alert: @user.errors.full_messages.join(', ') }
        redirect_to edit_user_path(@user), errors_message
      end
    end
  end

  private

  def user_wants_password_change?
    params[:user][:current_password].present? || params[:user][:password].present? || params[:user][:password_confirmation].present?
  end

  def user_update_params
    user_wants_password_change? ?
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :current_password,
      :password,
      :password_confirmation
    ) : params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
    )
  end
end
