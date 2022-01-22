require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  # INDEX

  test 'should redirect when user is not logged in' do
    get '/users'

    assert_response :redirect
  end

  test 'index should show all users belonging to current users agency' do
    sign_in users(:agency_user)

    get '/users'

    assert_response :success
    assert_equal assigns(:company), agencies(:first)
    assert_equal assigns(:users), [users(:agency_user), users(:second_user_for_agency)]
  end

  test 'index should show all users belonging to current users advertiser' do
    sign_in users(:advertiser_user)

    get '/users'

    assert_response :success
    assert_equal assigns(:company), advertisers(:first)
    assert_equal assigns(:users), [users(:advertiser_user), users(:second_user_for_advertiser)]
  end

  # NEW

  test 'new redirects if a user is not logged in' do
    get '/users/new'

    assert_response :redirect
  end

  # TODO: this is not being rendered
  test 'should get new' do
    sign_in users(:agency_user)

    get '/users/new'

    assert_response :success
  end

  # CREATE

  test 'create redirects when user is not logged in' do
    assert_no_changes('User.count') do
      post '/users'
    end

    assert_response :redirect
  end

  # TODO: create currently does nothing

  # EDIT

  test 'edit redirects when user is not logged in' do
    get "/users/#{users(:agency_user).id}/edit"

    assert_response :redirect
  end

  test 'should get edit for any user within your company' do
    sign_in users(:agency_user)
    
    get "/users/#{users(:second_user_for_agency).id}/edit"

    assert_response :success
    assert_equal assigns(:user), users(:second_user_for_agency)
  end

  # TODO: This is possible!

  # test 'should not be able to edit a user not within your company' do
  #   sign_in users(:advertiser_user)

  #   get "/users/#{users(:agency_user).id}/edit"

  #   assert_response :redirect
  # end

  # UPDATE

  test 'update redirects when user is not logged in' do
    patch "/users/#{users(:agency_user).id}", params: { user: { first_name: 'A new name' } }

    assert_response :redirect
    assert_equal users(:agency_user).first_name, 'John'
  end

  # TODO: Should we?
  test 'should update any user belonging to the same company' do
    sign_in users(:agency_user)

    patch "/users/#{users(:second_user_for_agency).id}", params: { user: { first_name: 'A new name' } }

    assert_redirected_to dashboard_index_path
    assert_equal users(:second_user_for_agency).reload.first_name, 'A new name'
  end

  # TODO: This is possible!

  # test 'user cannot update user belonging to another company' do
  #   sign_in users(:no_access_user)

  #   patch "/users/#{users(:advertiser_user).id}", params: { user: { first_name: 'A new name' } }

  #   assert_redirected_to dashboard_index_path
  #   assert_equal users(:advertiser_user).reload.first_name, 'Jane'
  # end

  test 'user can update his own password' do
    sign_in users(:agency_user)

    patch "/users/#{users(:agency_user).id}",
          params: {
            user: {
              current_password: 'password' ,
              password: 'new_password123',
              password_confirmation: 'new_password123'
            }
          }

    assert_redirected_to dashboard_index_path
    assert users(:agency_user).reload.valid_password?('new_password123')
  end

  # DESTROY

  test 'destroy redirects when user is not logged in' do
    assert_no_changes('User.count') do
      delete "/users/#{users(:agency_user).id}"
    end

    assert_response :redirect
  end

  test 'cannot destroy yourself' do
    sign_in users(:agency_user)

    assert_no_changes('User.count') do
      delete "/users/#{users(:agency_user).id}"
    end

    assert_response :redirect
    assert_equal 'You cannot delete yourself', flash[:alert]
  end

  test 'can destroy user from your own company' do
    sign_in users(:agency_user)

    assert_difference('User.count', -1) do
      delete "/users/#{users(:second_user_for_agency).id}"
    end

    assert_response :redirect
    assert_equal 'User successfully deleted', flash[:notice]
  end

  # TODO: This is possible!

  # test 'cannot destroy user from another company' do
  #   sign_in users(:no_access_user)

  #   assert_no_changes('User.count') do
  #     delete "/users/#{users(:agency_user).id}"
  #   end

  #   assert_response :redirect
  # end
end