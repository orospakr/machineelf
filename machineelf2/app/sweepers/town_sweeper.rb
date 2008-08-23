class TownSweeper < ActionController::Caching::Sweeper
  observe Town

  def kill_town_index_caches
    expire_page(:controller => 'town', :action => 'index')
  end

  def after_create(town)
    kill_town_index_caches
  end

  def after_update(town)
    kill_town_index_caches
  end
end
