require 'test_helper'

class AdvertiserTest < ActiveSupport::TestCase
  test 'should save valid advertiser' do
    new_advertiser = Advertiser.create(name: 'A name')

    assert new_advertiser.persisted?
  end

  test 'should not save advertiser with a blank name' do
    new_advertiser = Advertiser.create(name: '    ')

    assert_not new_advertiser.persisted?
  end
end
