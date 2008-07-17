class PlayersEditorController < ApplicationController
  active_scaffold :player

  layout 'standard'

  before_filter :is_korps?
end
