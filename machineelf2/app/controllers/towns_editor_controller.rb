class TownsEditorController < ApplicationController
  active_scaffold :town do |config|
    config.columns.exclude :town_events
    config.columns.exclude :building_events
    config.columns << :ikariam_id
    config.columns[:ikariam_id].label = "Ikariam ID"
  end

  layout 'standard'

  before_filter :is_korps?
end
