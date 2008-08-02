class IslandsEditorController < ApplicationController
  active_scaffold :islands do |config|
    config.columns << :ikariam_id
    config.columns[:ikariam_id].label = "Ikariam ID"
  end

  layout 'standard'

  before_filter :is_korps?
end
