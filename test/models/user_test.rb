require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'should save valid user' do
    new_user = User.create(
      first_name: 'Peter',
      last_name: 'Peterson',
      company: agencies(:first),
      email: 'peter@example.com',
      password: 'newpassword123'
    )

    assert new_user.persisted?
  end

  test 'should not save user without a first_name' do
    new_user = User.create(
      last_name: 'Peterson',
      company: agencies(:first),
      email: 'peter@example.com',
      password: 'newpassword123'
    )

    assert_not new_user.persisted?
  end

  test 'should not save user without a last_name' do
    new_user = User.create(
      first_name: 'Peter',
      company: agencies(:first),
      email: 'peter@example.com',
      password: 'newpassword123'
    )

    assert_not new_user.persisted?
  end

  test 'should not save user without a company' do
    new_user = User.create(
      first_name: 'Peter',
      last_name: 'Peterson',
      email: 'peter@example.com',
      password: 'newpassword123'
    )

    assert_not new_user.persisted?
  end

  test 'should not save user without an email' do
    new_user = User.create(
      first_name: 'Peter',
      last_name: 'Peterson',
      company: agencies(:first),
      password: 'newpassword123'
    )

    assert_not new_user.persisted?
  end

  test 'should not create user without a password' do
    new_user = User.create(
      first_name: 'Peter',
      last_name: 'Peterson',
      company: agencies(:first),
      email: 'peter@example.com'
    )

    assert_not new_user.persisted?
  end

  test 'should not save user with an existing email' do
    new_user = User.create(
      first_name: 'Peter',
      last_name: 'Peterson',
      company: agencies(:first),
      email: 'first@agency.com',
      password: 'newpassword123'
    )

    assert_not new_user.persisted?
  end

  test 'creates a connection for user after user creation' do
    new_user = User.create(
      first_name: 'Peter',
      last_name: 'Peterson',
      company: agencies(:first),
      email: 'peter@example.com',
      password: 'newpassword123'
    )

    assert new_user.persisted?
    assert_equal 1, new_user.connections.count
  end
end
