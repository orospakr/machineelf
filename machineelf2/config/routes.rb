ActionController::Routing::Routes.draw do |map|
  map.resources :buildings

  map.resources :servers

#  map.resources :users

  map.home '', :controller => 'site', :action => 'welcome'
  map.connect '/toolbar_version', :controller => 'site', :action => 'toolbar_version'
  map.connect '/toolbar_updates', :controller => 'site', :action => 'toolbar_updates'

  map.connect '/am_i_logged_in', :controller => 'site', :action => 'am_i_logged_in'

  map.signup '/signup', :controller => 'users', :action => 'new'
  map.login '/login', :controller => 'sessions', :action => 'new'
  map.logout '/logout', :controller => 'sessions', :action => 'destroy'
  map.connect '/activate/:activation_code', :controller => 'users', :action => 'activate'

  map.connect 'towns/:id/stats', :controller => 'towns', :action => 'stats'
  map.connect 'towns/:id/stats.:format', :controller => 'towns', :action => 'stats'

  map.connect 'servers/:id/towns', :controller => 'servers', :action => 'towns'
  map.connect 'servers/:id/towns.:format', :controller => 'servers', :action => 'towns'

  map.resources :users, :member => { :suspend   => :put,
                                     :unsuspend => :put,
                                     :purge     => :delete }

  map.resources :players

  map.resources :islands

  map.connect '/sessions/subscriptions', :controller => 'sessions', :action => 'subscriptions'
  map.connect '/sessions/subscriptions.:format', :controller => 'sessions', :action => 'subscriptions'
  map.resource :session

  map.resources :towns


  # The priority is based upon order of creation: first created -> highest priority.

  # Sample of regular route:
  #   map.connect 'products/:id', :controller => 'catalog', :action => 'view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   map.purchase 'products/:id/purchase', :controller => 'catalog', :action => 'purchase'
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   map.resources :products

  # Sample resource route with options:
  #   map.resources :products, :member => { :short => :get, :toggle => :post }, :collection => { :sold => :get }

  # Sample resource route with sub-resources:
  #   map.resources :products, :has_many => [ :comments, :sales ], :has_one => :seller

  # Sample resource route within a namespace:
  #   map.namespace :admin do |admin|
  #     # Directs /admin/products/* to Admin::ProductsController (app/controllers/admin/products_controller.rb)
  #     admin.resources :products
  #   end

  # You can have the root of your site routed with map.root -- just remember to delete public/index.html.
  # map.root :controller => "welcome"

  # See how all your routes lay out with "rake routes"

  # Install the default routes as the lowest priority.
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
