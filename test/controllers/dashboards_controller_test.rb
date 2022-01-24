require 'test_helper'

class DashboardControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'redirects to sign in when user is not logged in' do
    get '/dashboard'

    assert_redirected_to new_user_session_path
  end

  test 'redirects to agency for agency user' do
    sign_in users(:agency_user)

    get '/dashboard'

    assert_redirected_to agency_vendors_path(agency_id: agencies(:first).id)
  end

  test 'redirects to campaign for advertiser user' do
    sign_in users(:advertiser_user)

    get '/dashboard'

    assert_redirected_to vendor_campaigns_path(vendor_id: advertisers(:first).id)
  end
end
