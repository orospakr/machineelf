require File.dirname(__FILE__) + '/../test_helper'

class SignatoriesControllerTest < ActionController::TestCase
  def test_should_get_index
    get :index
    assert_response :success
    assert_not_nil assigns(:signatories)
  end

  def test_should_get_new
    get :new
    assert_response :success
  end

  def test_should_create_signatory
    assert_difference('Signatory.count') do
      post :create, :signatory => { }
    end

    assert_redirected_to signatory_path(assigns(:signatory))
  end

  def test_should_show_signatory
    get :show, :id => signatories(:one).id
    assert_response :success
  end

  def test_should_get_edit
    get :edit, :id => signatories(:one).id
    assert_response :success
  end

  def test_should_update_signatory
    put :update, :id => signatories(:one).id, :signatory => { }
    assert_redirected_to signatory_path(assigns(:signatory))
  end

  def test_should_destroy_signatory
    assert_difference('Signatory.count', -1) do
      delete :destroy, :id => signatories(:one).id
    end

    assert_redirected_to signatories_path
  end
end
