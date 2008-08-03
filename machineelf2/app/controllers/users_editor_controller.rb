class UsersEditorController < ApplicationController
  active_scaffold :user do |config|
    config.columns.exclude :players, :crypted_password, :remember_token, :salt, :activation_code
  end

  layout 'standard'

  before_filter :is_korps?
end
