require 'test_helper'

class CreativesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers


  # CREATE

  test 'create should redirect when user is not logged in' do
    post "/campaigns/#{campaigns(:first).id}/creatives"

    assert_response :redirect
  end

  test 'create should redirect when user does not have access to advertiser' do
    sign_in users(:no_access_user)

    post "/campaigns/#{campaigns(:first).id}/creatives"

    assert_response :redirect
  end

  test 'should create a creative when user has access to the campaign' do
    sign_in users(:advertiser_user)

    assert_difference('Creative.count') do
      post "/campaigns/#{campaigns(:first).id}/creatives",
          params: { file: fixture_file_upload('/files/example.jpg') }
    end

    assert_response :success
    assert(File.exists?(assigns(:creative).reload.file.path))
  end

  # DESTROY

  test 'delete should redirect when user is not logged in' do
    assert_no_changes('Creative.count') do      
      delete "/creatives/#{creatives(:first).id}"
    end

    assert_response :redirect
  end

  test 'delete should redirect when user does not have access to advertiser' do
    sign_in users(:no_access_user)

    assert_no_changes('Creative.count') do      
      delete "/creatives/#{creatives(:first).id}"
    end

    assert_response :redirect
  end

  test 'should delete a creative when user has access to the campaign' do
    sign_in users(:advertiser_user)

    assert_difference('Creative.count', -1) do
      delete "/creatives/#{creatives(:first).id}"
    end
  end
end
