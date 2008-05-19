#!/bin/bash

gem build ./machineelf.gemspec && scp ./MachineElf-0.0.1.gem orospakr.ca:MachineElf-0.0.1.gem && ssh orospakr.ca "sudo gem install MachineElf-0.0.1.gem"