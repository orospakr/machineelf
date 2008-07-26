class PlayersEditorController < ApplicationController
  active_scaffold :player do |config|
    config.columns.exclude :player_events
    config.create.columns.exclude :player_events, :towns
    config.update.columns.exclude :player_events, :towns
  end

  layout 'standard'

  before_filter :is_korps?
end
