require 'test_helper'

class CampaignTest < ActiveSupport::TestCase
  # Step 1 - Flight

  test 'should save valid flight details' do
    campaign = Campaign.new(valid_flight_attributes)
    
    assert campaign.save(context: :flight)
    assert campaign.status == "under_review"
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

  test 'budget should return sum of all objectives budgets' do
    campaign = campaigns(:first)

    assert_equal 35000, campaign.budget
  end

  test 'flight should return earliest objective start date - latest objective end date' do
    campaign = campaigns(:first)

    assert_equal "#{(Date.today - 10.days).to_s(:mdy)} - #{(Date.today + 10.days).to_s(:mdy)}",
                 campaigns(:first).flight
  end

  test 'goals should return all the goals separated by "," without repeating' do
    campaign = campaigns(:first)

    assert_equal 'Awareness, Reach', campaign.goals
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
          desired_dcpm: 10000,
          start_date: Date.today,
          end_date: Date.tomorrow
        }
      ])
  end
end
