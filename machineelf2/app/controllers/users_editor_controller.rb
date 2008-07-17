class UsersEditorController < ApplicationController
  active_scaffold :user

  layout 'standard'

  before_filter :is_korps?
end
