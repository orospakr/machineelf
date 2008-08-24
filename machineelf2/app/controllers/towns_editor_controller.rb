class TownsEditorController < ApplicationController
  active_scaffold :town do |config|
    config.columns.exclude :town_events
    config.columns << :ikariam_id
    config.columns[:ikariam_id].label = "Ikariam ID"
    config.update.columns.exclude :buildings
    config.create.columns.exclude :buildings

  end

  layout 'standard'

  before_filter :is_korps?
end
