# Include hook code here

require 'act_as_ikariam'
ActiveRecord::Base.send(:include, Acts::Ikariam)
