require 'test_helper'

class AdvertisersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  # INDEX

  test 'index redirects when not logged' do
    get "/vendors?agency_id=#{agencies(:first).id}"

    assert_response :redirect
  end

  test 'index redirects when agency does not belong to current user' do
    sign_in users(:advertiser_user)

    get "/vendors?agency_id=#{agencies(:first).id}"

    assert_response :redirect
  end

  test 'should get index when logged in as agency_user' do
    sign_in users(:agency_user)

    get "/vendors?agency_id=#{agencies(:first).id}"

    assert_response :success
    assert_equal assigns(:agency), agencies(:first)
  end

  # NEW

  test 'new redirects when not logged in' do
    get "/vendors?agency_id=#{agencies(:first).id}"

    assert_response :redirect
  end

  test 'new redirects to when agency does not belong to current user' do
    sign_in(:advertiser_user)

    get "/vendors?agency_id=#{agencies(:first).id}"

    assert_response :redirect
  end

  test 'should get new' do
    sign_in users(:agency_user)

    get "/vendors/new?agency_id=#{agencies(:first).id}"

    assert_response :success
    assert_equal assigns(:agency), agencies(:first)
  end

  # CREATE

  test 'create redirects when not logged in' do
    post "/vendors?agency_id=#{agencies(:first).id}"

    assert_response :redirect
  end

  test 'create redirects when agency does not belong to current user' do
    sign_in users(:advertiser_user)

    post "/vendors?agency_id=#{agencies(:first).id}"

    assert_response :redirect
  end

  test 'should create advertiser as agency user' do
    sign_in users(:agency_user)

    assert_difference('Advertiser.count') do
      post "/vendors?agency_id=#{agencies(:first).id}",
           params: {
             advertiser: {
               annual_revenue: 50_000_000,
               name: "Example Adworks",
               webiste_url: "www.example.com",
               industry: "Agribusiness",
               current_media_mix: ["Connected TV"],
               business_type: "Business to Business",
               monthly_unique_visitors: 40_000
            }
          }
    end

    assert_redirected_to agency_vendors_path(agencies(:first).id)
  end

  # EDIT

  test 'edit should redirect if user is not logged in' do
    get "/vendors/#{advertisers(:first).id}/edit"

    assert_response :redirect
  end

  test 'edit should redirect if user does not have access to advertiser' do
    sign_in users(:no_access_user)

    get "/vendors/#{advertisers(:first).id}/edit"

    assert_response :redirect
  end

  test 'should get edit as agency user' do
    sign_in users(:agency_user)

    get "/vendors/#{advertisers(:first).id}/edit"

    assert_response :success
  end

  test 'should get edit as advertiser user' do
    sign_in users(:advertiser_user)

    get "/vendors/#{advertisers(:first).id}/edit"

    assert_response :success
  end

  # UPDATE

  test 'update should redirect if user is not logged in' do
    patch "/vendors/#{advertisers(:first).id}?agency_id=#{agencies(:first).id}",
          params: { advertiser: { name: "Updated Adworks" } }

    assert_response :redirect
    assert_equal advertisers(:first).reload.name, "Adworks"
  end

  test 'update should redirect if user does not have access to advertiser' do
    sign_in users(:no_access_user)

    patch "/vendors/#{advertisers(:first).id}?agency_id=#{agencies(:first).id}",
          params: { advertiser: { name: "Updated Adworks" } }

    assert_response :redirect
    assert_equal advertisers(:first).reload.name, "Adworks"
  end

  test 'should update advertiser' do
    sign_in users(:advertiser_user)

    patch "/vendors/#{advertisers(:first).id}?agency_id=#{agencies(:first).id}",
          params: { advertiser: { name: "Updated Adworks" } }
          
    assert_redirected_to agency_vendors_path(agencies(:first).id)
    assert_equal advertisers(:first).reload.name, "Updated Adworks"
  end

  # TODO - validation error case doesn't work for update action

  # test "should redirect to edit if update fails" do
  #   sign_in users(:advertiser_user)

  #   advertiser_params = { advertiser: { name: nil } }

  #   patch "/vendors/#{advertisers(:first).id}?agency_id=#{agencies(:first).id}",
  #         params: advertiser_params

  #   assert_redirected_to agency_vendors_path(agencies(:first).id)
  # end

  # DESTROY

  test 'destroy redirects if user is not logged in' do
    assert_no_changes('Advertiser.count', -1) do
      delete "/vendors/#{advertisers(:first).id}?agency_id=#{agencies(:first).id}"
    end

    assert_response :redirect
  end

  test 'destroy redirects if user does not have access to agency' do
    sign_in users(:advertiser_user)

    assert_no_changes('Advertiser.count', -1) do
      delete "/vendors/#{advertisers(:first).id}?agency_id=#{agencies(:first).id}"
    end

    assert_response :redirect
  end

  test 'should destroy advertiser' do
    sign_in users(:agency_user)

    assert_difference('Advertiser.count', -1) do
      delete "/vendors/#{advertisers(:first).id}?agency_id=#{agencies(:first).id}"
    end

    assert_equal assigns(:agency), agencies(:first)
    assert_redirected_to agency_vendors_path(agencies(:first).id)
  end
end
