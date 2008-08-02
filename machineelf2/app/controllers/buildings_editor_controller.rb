class BuildingsEditorController < ApplicationController
  active_scaffold :building do |config|
    config.columns.exclude :building_events
    config.subform.columns.exclude :building_events
  end
end
