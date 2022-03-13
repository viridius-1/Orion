require 'carrierwave/orm/activerecord'
require 'fog/aws'

CarrierWave.configure do |config|
  if Rails.env.staging?
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      :provider => 'AWS',
      :aws_access_key_id => 'AKIASBT7CUMJNKJGDEJC',
      :aws_secret_access_key => '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',
      :region => 'ca-central-1'
    }
    config.fog_directory = 'theversion2-orion-uploads-staging'
    config.fog_public = false
    config.storage = :fog
  elsif Rails.env.production?
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      :provider => 'AWS',
      :aws_access_key_id => 'AKIASBT7CUMJLEUG6FWI',
      :aws_secret_access_key => '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',
      :region => 'ca-central-1'
    }
    config.fog_directory = 'theversion2-orion-uploads'
    config.fog_public = false
    config.storage = :fog
  else
    config.storage = :file
    config.enable_processing = Rails.env.development?
  end
end
