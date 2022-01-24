require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  # INDEX

  test 'index should not exist' do
    assert_raises ActionController::RoutingError do
      get '/users'
    end
  end

  # NEW

  test 'new should not exist' do
    assert_raises ActionController::RoutingError do
      get '/users/new'
    end
  end

  # CREATE

  test 'create should not exist' do
    assert_raises ActionController::RoutingError do
      post '/users'
    end
  end

  # EDIT

  test 'edit redirects to sign_in when user is not logged in' do
    get "/users/#{users(:agency_user).id}/edit"

    assert_redirected_to new_user_session_path
  end

  test 'edit redirects to root for any user but yourself' do
    sign_in users(:agency_user)

    get "/users/#{users(:second_user_for_agency).id}/edit"

    assert_redirected_to root_path
  end

  test 'should get edit for yourself' do
    sign_in users(:agency_user)
    
    get "/users/#{users(:agency_user).id}/edit"

    assert_response :success
    assert_equal assigns(:user), users(:agency_user)
  end

  # UPDATE

  test 'update redirects to sign_in when user is not logged in' do
    patch "/users/#{users(:agency_user).id}", params: { user: { first_name: 'A new name' } }

    assert_redirected_to new_user_session_path
    assert_equal users(:agency_user).first_name, 'John'
  end

  test 'update redirects for any user but yourself' do
    sign_in users(:agency_user)

    patch "/users/#{users(:second_user_for_agency).id}", params: { user: { first_name: 'A new name' } }

    assert_redirected_to root_path
    assert_equal users(:second_user_for_agency).reload.first_name, 'Bill'
  end

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

  test 'destroy should not exist' do
    sign_in users(:agency_user)

    assert_raises ActionController::RoutingError do
      delete "/users/#{users(:agency_user).id}"
    end
  end
end
