REVNO=`bzr revno`
VERSION=$(( $REVNO + 1 ))
XPI_FILENAME="../machineelf2/public/toolbars/machineelf-0.1-r$VERSION.xpi"
sed s/REVNO/$VERSION/ install.rdf.in > install.rdf
zip -r $XPI_FILENAME *
bzr add $XPI_FILENAME

echo "Version is: $VERSION.  You should do a commit now so that the revision"
echo "number of the XPI actually reflects of the contents of that commit id."
echo $VERSION > ../machineelf2/public/toolbars/CURRENT_TOOLBAR_REVNO
