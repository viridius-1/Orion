require 'test_helper'

class PlatformsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'redirects to sign in when user is not logged in' do
    get '/platforms'

    assert_redirected_to new_user_session_path
  end

  test 'should get index for user with company' do
    sign_in users(:advertiser_user)

    get '/platforms'

    assert_response :success
  end
end
