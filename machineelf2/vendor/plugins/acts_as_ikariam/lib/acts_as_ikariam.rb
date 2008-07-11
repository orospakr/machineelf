# ActAsIkariam
module Acts
  module Ikariam
    # included is called from the ActiveRecord::Base
    # when you inject this module

    def self.included(base)
      # Add acts_as_roled availability by extending the module
      # that owns the function.
      base.extend AddActsAsIkariam
    end

    # this module stores the main function and the two modules for
    # the instance and class functions
    module AddActsAsIkariam
      def acts_as_ikariam(options = {})
        class_eval <<-END
           include Acts::Ikariam::InstanceMethods
         END
        # MyMod?
      end
    end

    module InstanceMethods
      # doing this our target class
      # acquire all the methods inside ClassMethods module
      # as class methods.

      def self.included(aClass)
        aClass.extend ClassMethods
      end

      module ClassMethods
        # Class methods
        def by_ikariam_id(server, ikariam_id)
          already_exists = self.find(:first, :conditions => ["ikariam_id = ? AND server_id = ?", ikariam_id, server.id])
          if already_exists.nil?
            new_town = self.new
            new_town.ikariam_id = ikariam_id
            return new_town
          else
            return already_exists
          end
        end
      end

    end
  end
end


