XPI_FILENAME="../machineelf2/public/toolbars/machineelf-0.1-r`bzr revno`.xpi"
zip -r ../machineelf2/public/toolbars/machineelf-0.1-r`bzr revno`.xpi *
bzr add $XPI_FILENAME
echo "Version is: `bzr revno`"
echo `bzr revno` > ../machineelf2/public/toolbars/CURRENT_TOOLBAR_REVNO