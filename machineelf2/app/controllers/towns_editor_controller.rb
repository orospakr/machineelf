class TownsEditorController < ApplicationController
  active_scaffold :town do |config|
    config.columns.exclude :town_events
    config.columns.exclude :building_events
  end

  layout 'standard'

  before_filter :is_korps?
end
