class UsersEditorController < ApplicationController
  active_scaffold :user do |config|
    config.columns.exclude :players
  end

  layout 'standard'

  before_filter :is_korps?
end
