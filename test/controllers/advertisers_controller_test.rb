require 'test_helper'

class AdvertisersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @advertiser = advertisers(:one)
  end

  test "should get index" do
    get advertisers_url
    assert_response :success
  end

  test "should get new" do
    get new_advertiser_url
    assert_response :success
  end

  test "should create advertiser" do
    assert_difference('Advertiser.count') do
      post advertisers_url, params: { advertiser: { company_name: @advertiser.company_name, logo_url: @advertiser.logo_url, user_id: @advertiser.user_id, website: @advertiser.website } }
    end

    assert_redirected_to advertiser_url(Advertiser.last)
  end

  test "should show advertiser" do
    get advertiser_url(@advertiser)
    assert_response :success
  end

  test "should get edit" do
    get edit_advertiser_url(@advertiser)
    assert_response :success
  end

  test "should update advertiser" do
    patch advertiser_url(@advertiser), params: { advertiser: { company_name: @advertiser.company_name, logo_url: @advertiser.logo_url, user_id: @advertiser.user_id, website: @advertiser.website } }
    assert_redirected_to advertiser_url(@advertiser)
  end

  test "should destroy advertiser" do
    assert_difference('Advertiser.count', -1) do
      delete advertiser_url(@advertiser)
    end

    assert_redirected_to advertisers_url
  end
end
