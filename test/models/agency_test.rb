require 'test_helper'

class AgencyTest < ActiveSupport::TestCase
  test 'should save valid agency' do
    new_agency = Agency.create(name: 'A name')

    assert new_agency.persisted?
  end

  test 'should not save agency without a name' do
    new_agency = Agency.create(name: '     ')

    assert_not new_agency.persisted?
  end
end
