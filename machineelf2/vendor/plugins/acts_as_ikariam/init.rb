# Include hook code here

require 'acts_as_ikariam'
ActiveRecord::Base.send(:include, Acts::Ikariam)
