json.extract! advertiser, :id, :company_name, :website, :user_id, :logo_url, :created_at, :updated_at
json.url advertiser_url(advertiser, format: :json)
