class PlayersEditorController < ApplicationController
  active_scaffold :player do |config|
    config.columns.exclude :player_events
    config.create.columns.exclude :player_events, :towns
    config.update.columns.exclude :player_events, :towns
    config.columns << :ikariam_id
    config.columns[:ikariam_id].label = "Ikariam ID"
  end

  layout 'standard'

  before_filter :is_korps?
end
