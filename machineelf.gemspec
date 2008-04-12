require 'rubygems'
SPEC = Gem::Specification.new do |s|
  s.name          = "MachineElf"
  s.version       = "0.0.1"
  s.author        = "Andrew Clunis"
  s.email         = "andrew@orospakr.ca"
  s.homepage      = "http://knightsbridge.orospakr.ca/"
  s.platform      = Gem::Platform::RUBY
  s.summary       = "The Knightsbridge Pact's Secret Sauce"
  candidates      = Dir.glob("lib/*.rb")
  s.files         = candidates.delete_if {|i| i =~ /.svn/ }
  s.require_path  = "lib"
  s.autorequire   = "machineelf"
#  s.test_files    = Dir.glob("test/{,mock_}{client,worker}.rb")
  s.has_rdoc      = true
end