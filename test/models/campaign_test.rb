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

  test 'should save valid objective details' do
    campaign = Campaign.new(valid_objectives_attributes)

    assert campaign.save(context: :objectives)
  end

  test 'should not save objectives without conversion rate' do
    campaign = Campaign.new(valid_objectives_attributes.except(:conversion_rate))

    assert_not campaign.save(context: :objectives)
  end

  test 'should not save objectives with conversion rate < 0' do
    campaign = Campaign.new(valid_objectives_attributes.merge(conversion_rate: -3))

    assert_not campaign.save(context: :objectives)
  end

  test 'should not save objectives with conversion rate < 100' do
    campaign = Campaign.new(valid_objectives_attributes.merge(conversion_rate: 150))

    assert_not campaign.save(context: :objectives)
  end

  test 'should not save objectives without average_order_value' do
    campaign = Campaign.new(valid_objectives_attributes.except(:average_order_value))

    assert_not campaign.save(context: :objectives)
  end

  test 'should not save objectives with average_order_value < 0' do
    campaign = Campaign.new(valid_objectives_attributes.merge(average_order_value: -20))

    assert_not campaign.save(context: :objectives)
  end

  test 'should not save objectives without target_cpa' do
    campaign = Campaign.new(valid_objectives_attributes.except(:target_cpa))

    assert_not campaign.save(context: :objectives)
  end

  test 'should not save objectives with target_cpa < 0' do
    campaign = Campaign.new(valid_objectives_attributes.merge(target_cpa: - 12))

    assert_not campaign.save(context: :objectives)
  end

  test 'should not save objectives without target_roas' do
    campaign = Campaign.new(valid_objectives_attributes.except(:target_roas))

    assert_not campaign.save(context: :objectives)
  end

  test 'should not save objectives with target_roas < 0' do
    campaign = Campaign.new(valid_objectives_attributes.merge(target_roas: -10))

    assert_not campaign.save(context: :objectives)
  end

  test 'should not save objectives with target_roas > 100' do
    campaign = Campaign.new(valid_objectives_attributes.merge(target_roas: 101))

    assert_not campaign.save(context: :objectives)
  end

  test 'should not save objectives without budget' do
    campaign = Campaign.new(valid_objectives_attributes.except(:budget))

    assert_not campaign.save(context: :objectives)
  end

  test 'should not save objectives with budget less than 0' do
    campaign = Campaign.new(valid_objectives_attributes.merge(budget: -20))

    assert_not campaign.save(context: :objectives)
  end

  test 'should not save objectives without pixel notes' do
    campaign = Campaign.new(valid_objectives_attributes.except(:pixel_notes))

    assert_not campaign.save(context: :objectives)
  end

  def valid_flight_attributes
    {
      name: 'Campaign name',
      campaign_url: 'https://www.example.com',
      advertiser: advertisers(:first)
    }
  end

  def valid_objectives_attributes
    {
      conversion_rate: 25.to_f,
      average_order_value: 23_456.56.to_f,
      target_cpa: 10_000.to_d,
      target_roas: 50.to_d,
      budget: 40_000.to_d,
      pixel_notes: 'Some notes'
    }.merge(valid_flight_attributes)
  end
end
