module ErrorMessages
  include ActiveSupport::Concern

  def display_validation(object)
    errors_messages = {}

    object.errors.messages.each do |key, value|
      errors_messages[key] = value.join('. ')
    end

    errors_messages
  end
end
