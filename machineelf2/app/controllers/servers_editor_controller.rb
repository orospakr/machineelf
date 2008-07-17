class ServersEditorController < ApplicationController
  active_scaffold :servers

  layout 'standard'

  before_filter :is_korps?
end
