require 'test_helper'

class CampaignTest < ActiveSupport::TestCase
  test 'should save valid campaign' do
    new_campaign = Campaign.create(name: 'A name', advertiser: advertisers(:first))

    assert new_campaign.persisted?
    assert new_campaign.status == "incomplete"
  end

  test 'should not save campaign with a blank name' do
    new_campaign = Campaign.create(name: '    ', advertiser: advertisers(:first))

    assert_not new_campaign.persisted?
  end

  test 'should not save campaign without an advertiser' do
    new_campaign = Campaign.create(name: 'A name')

    assert_not new_campaign.persisted?
  end
end
