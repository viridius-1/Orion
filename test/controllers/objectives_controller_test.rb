require 'test_helper'

class ObjectivesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'should destroy an objective when user has access to the campaign' do
    sign_in users(:advertiser_user)

    assert_difference('Objective.count', -1) do
      delete "/objectives/#{objectives(:first).id}"
    end

    assert_response :no_content
    assert_equal assigns(:objective), objectives(:first)
  end

  test 'should redirect when user does not have access to the campaign' do
    sign_in users(:ad2_user)

    assert_no_changes('Objective.count') do
      delete "/objectives/#{objectives(:first).id}"
    end

    assert_redirected_to root_path
  end
end
