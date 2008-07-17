class IslandsEditorController < ApplicationController
  active_scaffold :islands

  layout 'standard'

  before_filter :is_korps?
end
