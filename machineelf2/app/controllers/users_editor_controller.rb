class UsersEditorController < ApplicationController
  active_scaffold :user do |config|
    config.columns.exclude :players, :crypted_password, :remember_token, :salt, :activation_code
    config.update.columns.exclude :remember_token_expires_at
  end

  layout 'standard'

  before_filter :is_korps?
end
