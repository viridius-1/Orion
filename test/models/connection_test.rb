require 'test_helper'

class ConnectionTest < ActiveSupport::TestCase

  test 'expires other users connection before create' do
    Connection.create(user: users(:agency_user))

    assert_equal 2, users(:agency_user).connections.count
    assert_equal 1, users(:agency_user).connections.active.count
  end
end
