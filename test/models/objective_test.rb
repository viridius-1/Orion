require 'test_helper'

class ObjectiveTest < ActiveSupport::TestCase
  test 'should save valid objective' do
    objective = Objective.new(objective_attributes)
    
    assert objective.save
  end

  test 'should not save objective without media_channel, goal or kpi' do
    %i(media_channel goal kpi).each do |attribute|
      objective = Objective.new(objective_attributes.except(attribute))

      assert_not objective.save
      assert_includes objective.errors[attribute], "can't be blank"
    end
  end

  test 'should not allow goal that for media_channel that does not support it' do
    objective = Objective.new(objective_attributes.merge(
      goal: 'Acquisition'
    ))

    assert_not objective.save
    assert_includes objective.errors['goal'], "is not included in the list"
  end

  test 'should not allow kpi for goal that does not support it' do
    objective = Objective.new(objective_attributes.merge(
      kpi: 'Click Through Rate (CTR)'
    ))

    assert_not objective.save
    assert_includes objective.errors['kpi'], "is not included in the list"
  end

  test 'should validate presence of attributes for current kpi' do
    objective = Objective.new(objective_attributes.except(:impressions))

    assert_not objective.save
    assert_includes objective.errors['impressions'], "can't be blank"
  end

  test 'should nilify all attributes not supported by current kpi' do
    objective = Objective.new(objective_attributes.merge(
      goal: 'Awareness',
      kpi: 'Click Through Rate (CTR)',
      target_ctr: 1000
    ))

    assert objective.save
    assert_nil objective.frequency
    assert_nil objective.unique_reach
  end

  def objective_attributes
    {
      campaign_id: campaigns(:first).id,
      media_channel: 'CTV/OTT',
      goal: 'Reach',
      kpi: 'Impressions',
      objective_notes: 'This is an objective',
      budget: 20000,
      impressions: 24,
      frequency: 70,
      frequency_unit: 'Day',
      unique_reach: 50,
      start_date: Date.today,
      end_date: Date.tomorrow
    }
  end
end
