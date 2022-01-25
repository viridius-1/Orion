class UserMailer < ApplicationMailer
  def welcome_email(user)
    @user = user
    
    mail(to: @user.email,
      subject: "Welcome email",
      from: 'Version2 Strategy <strategy@theversion2.com>')
  end
end
