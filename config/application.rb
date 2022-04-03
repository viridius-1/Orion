require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Orion
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    config.exceptions_app = self.routes

    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
      address: 'smtp.sendgrid.net',
      port: '587',
      authentication: :plain,
      user_name: Rails.application.credentials.sendgrid_username,
      password: Rails.application.credentials.sendgrid_password,
      domain: 'theversion2.com',
      enable_starttls_auto: true
    }
    config.action_mailer.perform_deliveries = true
    config.action_mailer.raise_delivery_errors = true

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    config.secret_key_base = Rails.application.credentials.secret_key_base
  end
end
