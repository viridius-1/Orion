require "application_system_test_case"

class AdvertisersTest < ApplicationSystemTestCase
  setup do
    @advertiser = advertisers(:one)
  end

  test "visiting the index" do
    visit advertisers_url
    assert_selector "h1", text: "Advertisers"
  end

  test "creating a Advertiser" do
    visit advertisers_url
    click_on "New Advertiser"

    fill_in "Company name", with: @advertiser.name
    fill_in "Logo url", with: @advertiser.logo_url
    fill_in "User", with: @advertiser.user_id
    fill_in "Website", with: @advertiser.website
    click_on "Create Advertiser"

    assert_text "Advertiser was successfully created"
    click_on "Back"
  end

  test "updating a Advertiser" do
    visit advertisers_url
    click_on "Edit", match: :first

    fill_in "Company name", with: @advertiser.name
    fill_in "Logo url", with: @advertiser.logo_url
    fill_in "User", with: @advertiser.user_id
    fill_in "Website", with: @advertiser.website
    click_on "Update Advertiser"

    assert_text "Advertiser was successfully updated"
    click_on "Back"
  end

  test "destroying a Advertiser" do
    visit advertisers_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Advertiser was successfully destroyed"
  end
end
