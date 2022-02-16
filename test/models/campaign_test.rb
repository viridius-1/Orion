require 'test_helper'

class CampaignTest < ActiveSupport::TestCase
  # Step 1 - Flight

  test 'should save valid flight details' do
    campaign = Campaign.new(valid_flight_attributes)
    
    assert campaign.save(context: :flight)
    assert campaign.status == "incomplete"
  end

  test 'should not save campaign with a blank name' do
    campaign = Campaign.new(valid_flight_attributes.merge(name: '   '))

    assert_not campaign.save(context: :flight)
  end

  test 'should not save campaign without an advertiser' do
    campaign = Campaign.new(valid_flight_attributes.except(:advertiser))

    assert_not campaign.save(context: :flight)
  end

  test 'should not save campaign without a campaign_url' do
    campaign = Campaign.new(valid_flight_attributes.except(:campaign_url))

    assert_not campaign.save(context: :flight)
  end

  # Step 2 - objectives

  test 'should save campaign with nested objective_attributes' do
    campaign = Campaign.new(flight_and_objectives_attributes)

    assert campaign.save
  end

  test 'should destroy objectives with _destroy key in attributes' do
    campaign = campaigns(:first)

    campaign.assign_attributes({
      objectives_attributes: [
        {
          id: objectives(:first).id,
          _destroy: 1
        }
      ]
    })

    campaign.save(context: :objectives)

    assert_equal 0, campaigns(:first).objectives.count
  end

  def valid_flight_attributes
    {
      name: 'Campaign name',
      campaign_url: 'https://www.example.com',
      advertiser: advertisers(:first)
    }
  end

  def flight_and_objectives_attributes
    valid_flight_attributes.merge(
      objectives_attributes: [
        {
          media_channel: 'CTV/OTT',
          goal: 'Reach',
          kpi: 'Impressions',
          budget: 20000,
          impressions: 24,
          frequency: 70,
          unique_reach: 50,
          start_date: Date.today,
          end_date: Date.tomorrow
        }
      ])
  end
end
