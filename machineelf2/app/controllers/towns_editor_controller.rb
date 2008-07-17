class TownsEditorController < ApplicationController
  active_scaffold :town

  layout 'standard'

  before_filter :is_korps?
end
